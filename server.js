const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
const nodemailer = require('nodemailer');
const lodash = require('lodash');
const winston = require('winston');
const app = express();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public'));

let requestList = [];

async function getUserData(username) {
  const usersResponse = await axios.get(`${process.env.API_URL}/users.json`);
  logger.info(`Retrieving user data for ${username}`);
  return lodash.find(usersResponse.data, { username: username });
}

async function getProfileData(userUid) {
  const profilesResponse = await axios.get(`${process.env.API_URL}/userProfiles.json`);
  logger.info(`Retrieved profile data for ${userUid}`);
  return lodash.find(profilesResponse.data, { userUid: userUid });
}

function calculateAge(birthdate) {
  const birthDateCorrected = birthdate.split("/").reverse().join("-");
  const age = new Date().getFullYear() - new Date(birthDateCorrected).getFullYear();
  logger.info(`Calculated age as ${age}`);
  return age;
}

async function sendMail(requestList) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  let emailContent = requestList.map(request => {
    return `
      Child name: ${request.username}
      Child address: ${request.address}
      Child request: ${request.wish}
    `;
  }).join('\n\n');

  let mailOptions = {
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    subject: 'Request List',
    text: emailContent
  };

  const result = await transporter.sendMail(mailOptions);
  logger.info(`Sent mail with result ${result}`);
  return result;
}

app.post('/submit', async (req, res) => {
  try {
    const user = await getUserData(req.body.userid);
    if (!user) {
      logger.warn(`User not found: ${req.body.userid}`);
      return res.status(400).sendFile(__dirname + '/views/error/user-not-registered.html');
    }

    const profile = await getProfileData(user.uid);
    if (!profile) {
      logger.warn(`Profile not found for user: ${user.uid}`);
      return res.status(400).sendFile(__dirname + '/views/error/no-profile-found.html');
    }

    if (calculateAge(profile.birthdate) > 10) {
      logger.warn(`User is older than 10 years: ${user.uid}`);
      return res.status(400).sendFile(__dirname + '/views/error/age-greater-than-10.html');
    }

    requestList.push({
      username: user.username,
      address: profile.address,
      wish: req.body.wish
    });

    logger.info(`Request received from user: ${user.username}, wish: ${req.body.wish}`);
    return res.sendFile(__dirname + '/views/request-received.html');
  } catch (error) {
    logger.error(`Error processing request: ${error.message}`);
    return res.status(500).send(error.message);
  }
});

app.get('/', (req, res) => {
  logger.info('Main page accessed');
  res.sendFile(__dirname + '/views/index.html');
});

setInterval(async () => {
  if (requestList.length > 0) {
    try {
      await sendMail(requestList);
      logger.info('Message sent');
      requestList = [];
    } catch (error) {
      logger.error(`Error sending email: ${error}`);
    }
  }
}, 15 * 1000);

const listener = app.listen(process.env.APP_PORT || 3000, () => {
  logger.info('Your app is listening on port ' + listener.address().port);
});

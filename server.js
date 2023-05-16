const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
const nodemailer = require('nodemailer');
const lodash = require('lodash');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public'));

let requestList = [];
async function getUserData(username) {
  const usersResponse = await axios.get(`${process.env.API_URL}/users.json`);
  return lodash.find(usersResponse.data, { username: username });
}

async function getProfileData(userUid) {
  const profilesResponse = await axios.get(`${process.env.API_URL}/userProfiles.json`);
  return lodash.find(profilesResponse.data, { userUid: userUid });
}

function calculateAge(birthdate) {
  const birthDateCorrected = birthdate.split("/").reverse().join("-");
  return new Date().getFullYear() - new Date(birthDateCorrected).getFullYear();
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

  return transporter.sendMail(mailOptions);
}

app.post('/submit', async (req, res) => {
  try {
    const user = await getUserData(req.body.userid);
    if (!user) {
      return res.status(400).send("Error: User not registered");
    }

    const profile = await getProfileData(user.uid);
    if (!profile) {
      return res.status(400).send("Error: No profile found for this user");
    }

    if (calculateAge(profile.birthdate) > 10) {
      return res.status(400).send("Error: Age is greater than 10");
    }

    requestList.push({
      username: user.username,
      address: profile.address,
      wish: req.body.wish
    });

    return res.send("Request received!");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

setInterval(async () => {
  if (requestList.length > 0) {
    try {
      await sendMail(requestList);
      console.log('Message sent');
      requestList = [];
    } catch (error) {
      console.log(error);
    }
  }
}, 15 * 1000);

const listener = app.listen(process.env.APP_PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

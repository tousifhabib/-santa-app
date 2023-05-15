const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
const nodemailer = require('nodemailer');
const app = express();
const lodash = require('lodash');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public'));

let pendingRequests = [];

app.post('/submit', async (req, res) => {
  const username = req.body.userid;
  const userWish = req.body.wish;

  try {
    const usersResponse = await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json');
    const profilesResponse = await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json');

    const user = lodash.find(usersResponse.data, { username: username })

    if (!user) {
      return res.status(400).send("Error: user not registered or age is greater than 10");
    }

    const profile = lodash.find(profilesResponse.data, { userUid: user.uid })

    if (!profile || new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear() > 10) {
      console.log("REMOVE-ME 2") ;
      return res.status(400).send("Error: user not registered or age is greater than 10");
    }

    pendingRequests.push({
      username: user.username,
      address: profile.address,
      wish: userWish
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
  if (pendingRequests.length === 0) {
    return;
  }

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });


  let mailOptions = {
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    subject: 'Pending requests',
    text: JSON.stringify(pendingRequests)
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    pendingRequests = [];
  });

}, 15 * 1000);

const listener = app.listen(process.env.APP_PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

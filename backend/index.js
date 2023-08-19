const schedule = require('node-schedule');
const dotenv = require('dotenv');
dotenv.config();
const { messaging,db } = require('./utils/admin');
const weatherapi = require('./routes/weatherUpdate');
const cron = require('node-cron');
const wmocode = require('./utils/WMO.json')
const sendWeatherAlert = require('./routes/weatherAlerts');
const sendCricAlert = require('./routes/cricAlerts');
const sendFinAlert = require('./routes/finAlerts');
const sendEntAlert = require('./routes/entAlerts');
const Update = require('./updateAnalytics');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const { users } = require('./routes/users');
app.get('/getusers', users);

const { Analytics } = require('./routes/analytics');
app.get('/Analytics', Analytics);


app.get('/', (req, res, next) => {
  res.send('This is the express server');
});

//using cron sending weather update to all users at schdeuled time
// cron.schedule('* * * * *', function () {
// sendWeatherAlert.sendAlerts().then(function (result) {
//    console.log(result);
// });
// sendCricAlert.cricAlerts();
// sendFinAlert.finAlerts();
// sendEntAlert.entAlerts();
// });

app.get('/notify',(req,res)=>{
  res.send("notify page");
});

// sending notification to selected participant
app.post('/notify', (req, res) => {
  var currTime = new Date().toISOString();
  var scheduleTime = new Date(req.body.schedule).toISOString();
  // console.log(scheduleTime,'bksa',currTime);
  
  if(scheduleTime<= currTime)
  {
    scheduleTime=new Date();
    scheduleTime.setSeconds(scheduleTime.getSeconds() + 10);
    // console.log(scheduleTime)
  }
  schedule.scheduleJob(scheduleTime, () => {
    // console.log(req.body.token)
    var registrationToken = req.body.token;
    var payload = {
      notification: {
        title: req.body.title,
        body: req.body.message,
      },
      tokens: registrationToken,
      priority: 'high',
      // timeToLive: 100,
    };
    messaging
      .sendMulticast(payload) 
      .then(response => {
        // Calling Analytics Update to Update the database
          Update.AnalyticsUpdate(response,scheduleTime);
          // console.log(scheduleTime);
        if (response.failureCount > 0) {
          const failedTokens = [];
          response.responses.forEach((resp, idx) => {
            if (!resp.success) {
              failedTokens.push(registrationToken[idx]);
            }
          });
          console.log('List of tokens that caused failures: ' + failedTokens);
        }
      })
      .catch(err => {
        console.log({ error: err});
      });
  });
  res.send({ success: 'notification scheduled'});
});

// sending weather update notification to the user
app.post('/weatherupdate', async (req, res) => {
  try {
    const result = await weatherapi(req.body);
    // console.log(result.hourly.weathercode[0]);
    res.status(201).send(wmocode[result.hourly.weathercode[0]]);
  } catch (err) { 
    // console.log(err);
    res.status(500).send({ error: err });
  }
});

// sending notification as per user activity
app.post('/useractivity', async (req, res) => {
  // console.log(req.body);
  var scheduleTime = new Date().toISOString;
  var result = "";
  var payload = {
    notification: {
      title: '',
      body: '',
    },
    priority: 'high',
    tokens: [req.body.token],
  };
  if (req.body.activity == 'logout') {
    payload.notification.title = 'Session Ended';
    payload.notification.body = 'You have logged out successfully';
    result = "logout activity notification sent"
  } else if (req.body.activity == 'login') {
    payload.notification.title = 'New Session Started';
    payload.notification.body = 'You have Logged In successfully';
    result = "login activity notification sent"
  } else if (req.body.activity == 'signup') {
    payload.notification.title = 'Welcome to Tally Family';
    payload.notification.body = 'You have Signed Up successfully';
    result = "signup activity notification sent"
  }  else if (req.body.activity == 'quizstart') {
    payload.notification.title = 'Quiz has started';
    payload.notification.body = "Let's test your Ability";
    result = "quiz start activity notification sent"
  }
  else if (req.body.activity == 'quizend') {
    payload.notification.title = "Quiz has ended";
    payload.notification.body = 'Thank you for attempting the Quiz';
    result = "quiz ended activity notification sent";
  }
  else {
    result = "Oops Invalid Activity";
  }
  messaging
      .sendMulticast(payload)
      .then(response => {
        console.log(response);
        res.send(result)
        Update.AnalyticsUpdate(response,scheduleTime);
      })
      .catch(err => {
        console.log({ error: err });
        res.send("Error Occurred")
      });

});
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));


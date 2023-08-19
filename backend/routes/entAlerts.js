const axios = require('axios');
const { messaging } = require('../utils/admin');
const Update = require('../updateAnalytics');

const scheduleTime = new Date();

exports.entAlerts = async () => {
  var payload = {
    notification: {
      title: 'Joke of the Day',
      body: '',
    },
    priority: 'high',
    tokens: [],
  };
  const userOptions = {
    method: 'GET',
    url: process.env.USER_DATABASE_URL,
  };
  var user = await axios.request(userOptions);
  user = user.data;
  

  for (var key in user) {
    if(user[key].preference === "Entertainment")
    payload.tokens.push(user[key].token);
  }
  // console.log(payload);
  const options = {
    method: 'GET',
    url: 'https://dad-jokes.p.rapidapi.com/random/joke',
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.API_HOST_KEY_JOKES
    }
  };

  await axios
    .request(options)
    .then(function (response) {
      // console.log(response.data.body[0].punchline);
     
      payload.notification.body = response.data.body[0].setup + " ";
      payload.notification.body += response.data.body[0].punchline;
      // console.log(payload,'ak');
      messaging
        .sendMulticast(payload)
        .then(response => {
          console.log(response);
          Update.AnalyticsUpdate(response,scheduleTime);
          // res.send(result)
        })
        .catch(err => {
          console.log({ error: err });
          // res.send("Error Occurred")
        });
    })
    .catch(function (error) {
      console.error(error);
    });
};

// entAlerts();

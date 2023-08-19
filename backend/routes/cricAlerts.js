const axios = require('axios');
const { messaging } = require('../utils/admin');
const Update = require('../updateAnalytics');

const scheduleTime = new Date();
// console.log(scheduleTime);

exports.cricAlerts = async () => {
  var payload = {
    notification: {
      title: 'Cricket Alerts| Source: ',
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
    if(user[key].preference === "Cricket")
    payload.tokens.push(user[key].token);
  }
//   console.log(payload);
  const options = {
    method: 'GET',
    url: 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/index',
        headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.API_HOST_KEY_CRICKET,
    },
  };

  await axios
    .request(options)
    .then(function (response) {
      // console.log(response.data)
      // console.log(response.data.storyList[0].story.hline)
      payload.notification.body = response.data.storyList[0].story.hline;
      payload.notification.title += response.data.storyList[0].story.source;
      // console.log(payload,'ak');
      messaging
        .sendMulticast(payload)
        .then(response => {
          // console.log(response);
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

// cricAlerts();

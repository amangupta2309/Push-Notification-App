const axios = require('axios');
const { messaging } = require('../utils/admin');
const Update = require('../updateAnalytics');

const scheduleTime = new Date();

exports.finAlerts = async () => {
  var payload = {
    notification: {
      title: 'Finance News| Author: ',
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
    if(user[key].preference === "Finance")
    payload.tokens.push(user[key].token);
  }
  const options = {
        method: 'GET',
        url: 'https://schwab.p.rapidapi.com/news/get-market-update',
        params: {id: '981538'},
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': process.env.API_HOST_KEY_FINANCE
        }
      };

  await axios
    .request(options)
    .then(function (response) {
      
      payload.notification.body = response.data.Headline;
      payload.notification.title += "Article";
      
      if(payload.tokens.length > 0) {
      messaging
        .sendMulticast(payload)
        .then(response => {
          Update.AnalyticsUpdate(response,scheduleTime);
        })
        .catch(err => {
          console.log({ error: err });
        });}
    })
    .catch(function (error) {
      console.error(error);
    });
};

// finAlerts();


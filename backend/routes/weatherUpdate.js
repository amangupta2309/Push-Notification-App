const axios = require('axios');

module.exports = params => {
  
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${params.location.lat}&longitude=${params.location.lon}&${params.queryType}=weathercode&timezone=IST`;
  // console.log(url)
  const options = {
    method: 'GET',
    url: url,
  };
  return axios.request(options).then(res=>res.data);
};

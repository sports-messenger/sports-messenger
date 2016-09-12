'use strict';

let request = require('request');

var options = { method: 'GET',
  url: 'https://data.seattle.gov/resource/ye65-jqxk.json',
  headers:
   { 'postman-token': 'cc6ca873-3735-1eea-72eb-ee4011040703',
     'cache-control': 'no-cache',
     'x-app-token': 'CzBKSiiOxBCaEjbtwf2Jwyn9x',
     accept: 'application/json' },
  };

module.exports = exports = request(options, function (error, response, data) {
  if (error) throw new Error(error);
  let dataArray = JSON.parse(data);
  let basketballCount = 0;
  let basketballHalfCount = 0;
  let soccerCount = 0;
  dataArray.forEach(function(item) {
    if(item.feature_desc === 'Basketball (Full)'){
      basketballCount += 1;
    }
    if(item.feature_desc === 'Basketball (Half)') {
      basketballHalfCount += 1;
    }
    if(item.feature_desc === 'Soccer') {
      soccerCount += 1;
    }
  });
  console.log('Data Array 0:', dataArray[0]);
  console.log('Data Array 1:', dataArray[1]);
  console.log('Data Array 2:', dataArray[2]);
  console.log('full basketball:', basketballCount);
  console.log('half basketball:', basketballHalfCount);
  console.log('soccer:', soccerCount);
});

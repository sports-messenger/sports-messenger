'use strict';

const Park = require('../model/park');
const Promise = require('bluebird');
const assert = require('assert');

let request = require('request');

var options = { method: 'GET',
  url: 'https://data.seattle.gov/resource/ye65-jqxk.json',
  headers:
  //you definitely don't want this here, this should be stored in an evironment variable.
  //it makes it so someone can't use your mail server and you can swap it out in dev/test/production mode
   { 'postman-token': 'cc6ca873-3735-1eea-72eb-ee4011040703',
     'cache-control': 'no-cache',
     'x-app-token': 'CzBKSiiOxBCaEjbtwf2Jwyn9x',
     accept: 'application/json' },
  };

module.exports = exports = function() {
  request(options, function (error, response, data) {
    if (error) throw new Error(error);
    //you probably want to account for parsing errors in the JSON, otherwise it could crash your server
    let dataArray = JSON.parse(data);
    let filteredData = dataArray.filter(function(item) {
      //I would seperate this into it's own function
      //then place each of these conditions in an object with the value true and return sports[item.feature_desc]
      //would make this code much cleaner
      if(item.feature_desc === 'Basketball (Full)' || item.feature_desc === 'Basketball (Half)' || item.feature_desc === 'Soccer' || item.feature_desc === 'Tennis Court (Outdoor)' || item.feature_desc === 'Baseball/Softball') {
        return true;
      }
    });
    let parkObject = {};
    filteredData.forEach(function(park) {
      //this could probably be a little cleaner
      if(parkObject[park.name]) {
        parkObject[park.name].sports.push(park.feature_desc);
      }
      if (!parkObject[park.name]) {
        parkObject[park.name] = {name: park.name, hours: park.hours, location:{xpos: park.xpos, ypos:park.ypos}, sports: []};
        parkObject[park.name].sports.push(park.feature_desc);
      }
    });
    let formattedData = [];
    for (var prop in parkObject) {
      //this should be a let
      formattedData.push(parkObject[prop]);
    }

    formattedData.forEach(function(park) {
      let newPark = new Park();
      newPark.name = park.name;
      newPark.hours = park.hours;
      newPark.location.xpos = parseFloat(park.location.xpos);
      newPark.location.ypos = parseFloat(park.location.ypos);
      newPark.sports = park.sports;
      newPark.comments = [];
      //I would use a better name for this
      let promise = newPark.save();
      assert.ok(promise instanceof Promise);
      promise.then(function(savedPark) {
        assert.equal(savedPark.name, newPark.name);
      });
    });
  });
};

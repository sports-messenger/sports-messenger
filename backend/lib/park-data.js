'use strict';

const Park = require('../model/park');
const Promise = require('bluebird');
const assert = require('assert');

let request = require('request');

var options = { method: 'GET',
  url: 'https://data.seattle.gov/resource/ye65-jqxk.json',
  headers:
   { 'postman-token': 'cc6ca873-3735-1eea-72eb-ee4011040703',
     'cache-control': 'no-cache',
     'x-app-token': 'CzBKSiiOxBCaEjbtwf2Jwyn9x',
     accept: 'application/json' },
  };

module.exports = exports = function() {
  console.log('In module');
  request(options, function (error, response, data) {
    console.log('In request');
    if (error) throw new Error(error);
    let dataArray = JSON.parse(data);
    let filteredData = dataArray.filter(function(item) {
      if(item.feature_desc === 'Basketball (Full)' || item.feature_desc === 'Basketball (Half)' || item.feature_desc === 'Soccer' || item.feature_desc === 'Tennis Court (Outdoor)' || item.feature_desc === 'Baseball/Softball') {
        return true;
      }
    });
    let formattedData = [];
    filteredData.forEach(function(park) {
      let newPark = new Park();
      newPark.name = park.name;
      newPark.hours = park.hours;
      newPark.location.ypos = parseFloat(park.ypos);
      newPark.location.xpos = parseFloat(park.xpos);
      newPark.sports.push(park.feature_desc);
      formattedData.push(newPark);
      let promise = newPark.save();
      assert.ok(promise instanceof Promise);
      promise.then(function(savedPark) {
        console.log('inside promise.then');
        assert.equal(savedPark.name, newPark.name);
      });
      // console.log('newPark:', newPark);
      // newPark.save().then((savedPark) => {
      //   console.log('savedPark:', savedPark);
      // }, (err) => {
      //   console.log('error', err);
      // });
    });

    // let all = Promise.all(formattedData.map(function(park) {
    //   let result;
    //   // let keiran = new Park(park);
    //   console.log('keiran:', keiran);
    //   keiran.save()
    //       .then((newPark) => {
    //         result = newPark;
    //         console.log('newPark:', newPark);
    //         console.log('this:', this);
    //         return this.save();
    //       })
    // }));
    //   all.then((result) => {
    //     console.log('result:', result);
    //   });


    //   let nums = [1,2,3,4,5];
    //
    //   let all = Promise.all(nums.map((num) => {
    //     return new Promise((resolve, reject) => {
    //     let rand = Math.random() * (1000 * num);
    //     setTimeout(() => {
    //       resolve(rand);
    //     }, rand)
    //   });
    // }));
    //
    // all.then((result) => {
    //   console.log(result);
    // });
    return formattedData;
  });
};

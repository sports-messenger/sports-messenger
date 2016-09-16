'use strict';

module.exports = function(app) {
  app.factory('parksMapCombine', function() {
    let data = {
      addressPoint: {},
      serviceArray: []
    };
    return {
      setArray: function(array) {
        data.serviceArray = array;
        console.log('parksMapCombine.serviceArray', data.serviceArray);
      },
      setAddressPoint: function(address) {
        data.addressPoint = address;
        console.log('parksMapCombine.addressPoint', data.addressPoint);
      },
      setBothValues: function(array, address) {
        data.serviceArray = array;
        data.addressPoint = address;
      },
      getArray: function() {
        return data.serviceArray;
      },
      getAddressPoint: function() {
        return data.addressPoint;
      }
    };
  });
};

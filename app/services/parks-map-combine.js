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
      },
      setAddressPoint: function(address) {
        data.addressPoint = address;
        console.log('service.addressPoint', data.addressPoint);
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

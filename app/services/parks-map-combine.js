'use strict';

module.exports = (app) => {
  app.factory('parksMapCombine', function() {
    return {
      serviceArray: [],
      addressPoint: null,
      setArray: function(array) {
        this.serviceArray = array;
      },
      setAddressPoint: function(address) {
        this.addressPoint = address;
      },
      setBothValues: function(array, address) {
        this.serviceArray = array;
        this.addressPoint = address;
      },
      getArray: function() {
        return this.serviceArray;
      },
      getAddressPoint: function() {
        return this.addressPoint;
      }
    };
  });
};

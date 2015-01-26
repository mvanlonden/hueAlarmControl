'use strict';

angular.module('hueBox')
 .filter('belongsToGroup', function () {
  return function (items, group) {
    var filtered = [];
    for (var index in items) {
      var item = items[index];
      if (item.command && item.command.address.indexOf('groups/'+group) > -1) {
        filtered.push(item);
      }
    }
    return filtered;
  };
});
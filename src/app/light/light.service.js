'use strict';

angular.module('hueBox')
  .factory('LightService', function ($resource, Bridge, Username) {

    return $resource(Bridge + Username + '/lights');

  });

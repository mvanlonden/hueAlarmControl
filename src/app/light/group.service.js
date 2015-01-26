'use strict';

angular.module('hueBox')
  .factory('GroupService', function ($resource, Bridge, Username) {

    return $resource(Bridge + Username + '/groups/:id');

  });

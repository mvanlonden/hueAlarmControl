'use strict';

angular.module('hueBox')
  .factory('ScheduleService', function ($resource, Bridge, Username) {

    return $resource(Bridge + Username + '/schedules/:id', {id: '@id'}, {
      create: {
        method: 'POST',
        isArray: true
      },
      update: {
        method: 'PUT',
        params: {id: '@id'},
        isArray: true
      },
      delete: {
        method: 'DELETE',
        params: {id: '@id'},
        isArray: true
      }
    });

  });

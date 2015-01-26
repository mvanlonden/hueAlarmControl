'use strict';

angular.module('hueBox')
  .controller('MainCtrl', function ($scope, LightService, GroupService, ScheduleService, Username) {
    $scope.lights = LightService.get();

    $scope.groups = GroupService.get();

    $scope.newAlarm = new ScheduleService();

    $scope.schedules = ScheduleService.get();

    $scope.changeAlarmStatus = function (status, id) {
      console.log(status, id);
      ScheduleService.update({id: id}, {status: status}, function (err, data) {
        if (!err) {
          $scope.schedules = ScheduleService.get();
        }
      });
    }

    $scope.deleteAlarm = function (id) {
      ScheduleService.delete({id: id}, function () {
          $scope.schedules = ScheduleService.get();
        });
    }

    $scope.createAlarm = function (valid, group, time) {
      console.log('creating alarm for group:', group)
      if (valid) {
        var newTime = angular.copy(time);
        var newAlarm = {
          command: {
            address: "/api/" + Username + "/groups/" + group + "/action",
            method: "PUT",
            body: {
              on: true
            }
          }
        };

        if (newTime.ampm === "PM") {
          console.log(newTime);
          newTime.hour = newTime.hour + 12;
          console.log(newTime);
        }
          console.log(newTime);
        newAlarm.localtime = "W127/T" + newTime.hour + ":" + newTime.minute + ":00"
        console.log(newAlarm.localtime);

        ScheduleService.create(newAlarm, function (data) {
          console.log(data) ;
        });
      }
    }

    $scope.CIEToRGB =  function (x, y, ct) {
      console.log(x, y, ct);
      var r = 3.240479*((x*ct)/y) + -1.537150*ct + -0.498535*(((1-x-y)*ct)/y)
      var g = -0.969256*((x*ct)/y) + 1.875992*ct + 0.041556*(((1-x-y)*ct)/y)
      var b = 0.055648*((x*ct)/y) + -0.204043*ct + 1.057311*(((1-x-y)*ct)/y)
      var rgb = {r: r, g: g, b: b};
      console.log(rgb);
      return {r: r, g: g, b: b};
    }; 

  });

angular.module('myApp',[]).controller('calenderCtrl', function ($scope) {

    $scope.events = [];

    $scope.minDate = new Date();

    var Calendar = tui.Calendar;


    $scope.addNewEvent = function () {

        if ($scope.eventName ==="" || $scope.eventStart==="" || $scope.eventEnd==="" ){
            return;
        }

        let timeDifferance = $scope.eventStart.getTime() - $scope.minDate.getTime();
        let dayDifferance = timeDifferance / (1000*3600*24);
        dayDifferance = Math.round(dayDifferance);

        $scope.events.push({
            name: $scope.eventName,
            start: $scope.eventStart,
            end: $scope.eventEnd,
            edit: false,
            remainDays: dayDifferance
        });

        $scope.eventName = '';
        $scope.eventStart = '';
        $scope.eventEnd = '';
    }

    $scope.deleteEvent = function (index) {

        $scope.events.splice(index,1);
    }

    $scope.editEvent = function (index) {

        let event = $scope.events[index];

        $scope.eventName = event.name;
        $scope.eventStart = new Date(event.start.toLocaleString());
        $scope.eventEnd = new Date(event.end.toLocaleString());
        $scope.edit = true;
        $scope.remainDays = event.remainDays;

        $scope.events.splice(index,1);
    }


    var calendar = new Calendar('#calendar', {
        defaultView: 'month',
        taskView: true,
        template: {
          monthDayname: function(dayname) {
            return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
          }
        }
      });
});

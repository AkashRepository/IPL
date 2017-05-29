
var myApp = angular.module('myApp', ['ngMaterial']);




// app.service('feedbackService', function ($http) {
//   this.getFeedbackPaged = function (nodeId, pageNumber, take) {
//       return $http.get('myUrl');
//   };
// });

myApp.controller('autoCompleteController', function($scope,$window,$http,$mdDialog,$timeout, $q, $log){
 $scope.matches = [];
    $http({
      url: '/api/matches',
      method: 'GET',
      transformResponse: [function (data) {
         $scope.matches =  JSON.parse(data);
      }]
    });

  $scope.getMatchDetails = function(id,ev){
      $scope.status = '  ';
      $scope.customFullscreen = false;
      $scope.details = [];
      $mdDialog.id=id;
  
      $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1tmpl.html',
      parent: angular.element(document.getElementById('ctrlId')),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    
  }

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    // console.log($mdDialog.id);
    $http({
      url: '/api/details',
      method: 'POST',
      data : {id : $mdDialog.id } ,
      transformResponse: [function (data) {
        var Inningdetails = JSON.parse(data);
        var obj1 = Inningdetails[0][0];
        var obj2 = Inningdetails[1][0];
        $scope.batting1 = obj1._id.batting_team;
        $scope.bowling1 = obj1._id.bowling_team;
        $scope.batting2 = obj2._id.batting_team;
        $scope.bowling2 = obj2._id.bowling_team;
        $scope.details1 = Inningdetails[0];
        $scope.details2 = Inningdetails[1];
      }]
    });
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

});





// // Autocomplete code
// myApp.controller('autoCompleteController', function  ($timeout, $q, $log) {
//       var self = this;

//       self.simulateQuery = false;
//       self.isDisabled    = false;

//       // list of `state` value/display objects
//       self.states        = JSON.parse(localStorage.matches);
//       self.querySearch   = querySearch;
//       self.selectedItemChange = selectedItemChange;
//       self.searchTextChange   = searchTextChange;

//       self.newState = newState;

//       function newState(state) {
//         alert("Sorry! No projects found...!!!");
//       }

//       // ******************************
//       // Internal methods
//       // ******************************

//       /**
//        * Search for states... use $timeout to simulate
//        * remote dataservice call.
//        */
//       function querySearch (query) {
//         var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
//             deferred;
//         if (self.simulateQuery) {
//           deferred = $q.defer();
//           $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
//           return deferred.promise;
//         } else {
//           return results;
//         }
//       }

//       function searchTextChange(text) {
//         $log.info('Text changed to ' + text);
//       }

//       function selectedItemChange(item) {
//         $log.info('Item changed to ' + JSON.stringify(item));
//       }

//       // *
//       //  * Build `states` list of key/value pairs

     

       
//       /**
//        * Create filter function for a query string
//        */
//       function createFilterFor(query) {
//         var lowercaseQuery = angular.lowercase(query);

//         return function filterFn(state) {
//           return (state.value.indexOf(lowercaseQuery) === 0);
//         };

//       }
//     }
// );
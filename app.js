var app = angular.module('routeApp', ['ui.router']);

app.config(['$locationProvider', '$urlMatcherFactoryProvider', function($locationProvider, $urlMatcherFactoryProvider){
  $locationProvider.html5Mode(true);
  $urlMatcherFactoryProvider.strictMode(false);
}]);
app.config(function($stateProvider, $urlRouterProvider){
  // For any unmatched url, redirect to /home aparantly can't be done using stateprovider
  $urlRouterProvider.otherwise("/");

   // Now set up the states
   $stateProvider
       .state('home',{
           url: '/',
           views: {
               'header': {
                   templateUrl: '/templates/partials/header.html'
               },
               'content': {
                   templateUrl: '/templates/partials/content.html'
               },
               'footer': {
                   templateUrl: '/templates/partials/footer.html'
               }
           }
       })
       .state('myhome', {
           url: '/myhome/{name}',
           views: {
              'header': {
               templateUrl: '/templates/partials/header.html'
              },
              'content': {
                 templateUrl: '/templates/partials/content.html'
              },
              'tabContent': {
                 templateUrl: '/templates/myhome.html',
                 controller: function($scope, $stateParams){
                   $scope.name = $stateParams.name;
                 }
               },
               'footer': {
                 templateUrl: '/templates/partials/footer.html'
              }
           }

       })
       .state('about', {
           url: '/about',
           //views in case of multiple named views
           views: {
              'header': {
              templateUrl: '/templates/partials/header.html'
              },
              'content': {
                 templateUrl: '/templates/partials/content.html'
               },
               'tabContent': {
                  templateUrl: '/templates/about.html'
                },
              'footer': {
                 templateUrl: '/templates/partials/footer.html'
              }
           }
       })
       .state('about.contact', {
         url: "/contact/{name}/{username}/{email}", // html for state's tempalte
         templateUrl: "/templates/contact.html",
         controller: 'ContactController' //controller
       })
       .state('employee', {
         url: "/employee/{empId}",
         views: {
            'header': {
              templateUrl: '/templates/partials/header.html'
            },
            'content': {
               templateUrl: '/templates/partials/content.html'
             },
             'tabContent': {
               templateUrl: '/templates/employee.html',
               resolve: {
                 employeeInfo: function($stateParams, EmployeeService){
                   return EmployeeService.find($stateParams.empId);
                 }
               },
               controller: function($scope, $stateParams, employeeInfo){
                 $scope.empname=employeeInfo.empname;
                 $scope.level=employeeInfo.level;
                 $scope.empId= $stateParams.empId;
               }
              },
            'footer': {
               templateUrl: '/templates/partials/footer.html'
            }
         }
       })
       .state('support', {
         abstract: true,
         data: {
              hiddentoken: 5,
          },
         views: {
           'header': {
           templateUrl: '/templates/partials/header.html'
           },
           'content': {
              templateUrl: '/templates/partials/content.html'
            },
            'tabContent': {
               templateUrl: '/templates/support.html'
             },
           'footer': {
              templateUrl: '/templates/partials/footer.html'
           }
         }
       })
       .state('support.create', {
          url:'/support', //Note
          templateUrl: '/templates/supportcreate.html',
          controller: 'CreateCaseController',
          controllerAs: 'vm'
       })
       .state('support.cases', {
          url:'/support/cases',
          templateUrl: '/templates/listCases.html',
          controller: 'ListCaseController'
       })
});

app.controller('ListCaseController', function($scope, $state){
  $scope.value = "my name";
  console.log($state.current.data.hiddentoken);
});

app.controller('ContactController', function($scope, $stateParams){
  var user = {
    name: $stateParams.name,
    username: $stateParams.username,
    email: $stateParams.email
  }
  $scope.user = user;
});

app.controller('CreateCaseController', function($state, $http){
  var _this = this;
  this.caseTitle ='';
  this.caseMsg ='';
  this.$http = $http;
  this.$state = $state;
  this.submitCase = function(){
    //add this to db
    var _case = {
      caseTitle: _this.caseTitle,
      caseMessage: _this.caseMsg
    }
    _this.$http.post('http://localhost:3000/cases', {case: _case}).then(function(result){
        console.log('added case');
    }, function(failure){
        console.log('case not added');
    })
    _this.$state.go('support.cases');
  }
});

// app.controller('ListCasesController', function(caseList) {
//   this.caseList = caseList;
// });
app.service('EmployeeService',['$http', function($http){
  return {
    find: function(empId){
      return $http.get('./employeeInfo.json').then(function(response){
        return response.data;
      }, function(error){

      });
    }
  }
}]);

app.service('CaseListService', function($http) {
  return {
    getCases: function(){
       return $http.get('http://localhost:3000/cases').then(function(response){
        return response.data;
      },function(failure){
        $log.log('failed to fetch cases');
      })
    }
  }
});


//added for debugging in console
window.app = app;

var app = angular.module('routeApp', ['ui.router']);

app.config(['$locationProvider', function($locationProvider){
  $locationProvider.html5Mode(true);
}]);
app.config(function($stateProvider, $urlRouterProvider){
  // For any unmatched url, redirect to /home
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
           url: '/myhome',
           views: {
              'header': {
               templateUrl: '/templates/partials/header.html'
              },
              'content': {
                 templateUrl: '/templates/partials/content.html'
              },
              'tabContent': {
                 templateUrl: '/templates/myhome.html'
               },
               'footer': {
                 templateUrl: '/templates/partials/footer.html'
              }
           }
       })
       .state('about', {
           url: '/about',
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
         url: "/contact/{name}/{username}/{email}",
         templateUrl: "/templates/contact.html",
         controller: 'ContactController'
       });
});

app.controller('ContactController', function($scope, $stateParams){
  var user = {
    name: $stateParams.name,
    username: $stateParams.username,
    email: $stateParams.email
  }
  $scope.user = user;
});

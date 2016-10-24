var app = angular.module('snapp',['ngRoute', 'ngCookies']);
var URL = "http://betsol.org:9000/";

app.config(function($routeProvider){
  $routeProvider
  .when('/',{
    redirectTo :'/login'
  })
  .when('/login',{
    templateUrl: 'views/login.html',
    controller: 'loginCtrl'
  })
  .when('/signup', {
    templateUrl: 'views/signup.html',
    controller: 'signupCtrl'
  })
  .when('/dashboard',{
    templateUrl: 'views/dashboard.html',
    controller: 'dashboardCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});

app.controller('dashboardCtrl', ['$scope', '$location','$http',function($scope,$location,$http){
  $scope.dashboard= function(){
    var request = $http({
      method: "POST",
      url: URL+"dashboard",
      data: {firstName:$scope.firstName,lastName:$scope.lastName,company:$scope.company}
    });
    request.success(function(data){
      var response = angular.fromJson(data);
      if(response["error"])
      {
        $scope.validationMessage = response["message"][0];//custom message or backend response
      }
      else{
        sessionStorage.userId = response["id"];
        sessionStorage.firstName = response["firstName"];
        sessionStorage.lastName = response["lastName"];
        sessionStorage.company = response["company"];

        $location.url('/dashboard');
      }
    });
    request.error(function(){
      var response = console.log(data);
    });
  }
}]);

app.controller('loginCtrl', ['$scope', '$location','$http',function($scope,$location,$http){
  $scope.login = function(){
    var request = $http({
      method: "POST",
      url: URL+"login",
      data: {email:$scope.email,password:$scope.password}
    });
    request.success(function(data){
      var response = angular.fromJson(data);
      if(response["error"])
      {
        $scope.validationMessage = response["message"][0];//custom message or backend response
      }
      else{
        sessionStorage.email = response["email"];
        sessionStorage.password = response["password"];
        sessionStorage.userId = response["id"];

        $location.url('/dashboard');
      }
    });
    request.error(function(){
      var response = console.log(data);
    });
  }
}]);

app.controller('signupCtrl', ['$scope', '$location','$http',function($scope,$location,$http){
  $scope.signup = function(){
    var request = $http({
      method: "POST",
      url: URL+"signup",
      data: {email:$scope.email,password:$scope.password,firstName:$scope.firstName,lastName:$scope.lastName}
    });
    request.success(function(data){
      var response = angular.fromJson(data);
      if(response["error"])
      {
        $scope.validationMessage = response["message"][0];//custom message or backend response
      }
      else{
        sessionStorage.userId = response["id"];
        sessionStorage.lastName = response["lastName"];
        sessionStorage.email = response["email"];
        sessionStorage.password = response["password"];
        sessionStorage.firstName = ["firstName"];
        $location.url('/dashboard');
      }
    });
    request.error(function(){
      var response = console.log(data);
    });
  }
}]);

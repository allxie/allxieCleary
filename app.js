angular.module('myApp', [])

.controller('MainCtrl', ['$scope', function($scope) {

  $scope.partials =
  	[ { name: 'projects.html', url: 'projects.html'},
      { name: 'contact.html', url: 'contact.html'} ];
  $scope.partial = $scope.partials[0];

  $scope.contact = function(){
  	$scope.title = "Contact";
  	$scope.url = "contact.html";
  }
  $scope.projects = function(){
  	$scope.title = "Projects";
  	$scope.url = "projects.html";
  }
  $scope.resume = function(){
  	$scope.title = "Resume";
  	$scope.url = "resume.html";
  }

}]);
//loading the 'login' angularJS module
var signUp = angular.module('signUp', []);
//defining the login controller
signUp.controller('signUp', function($scope, $http) {
	$scope.invalid_login = true;
	$scope.unexpected_error = true;
	$scope.submit = function() {
		window.location.assign("/signUp");
		
		$(function(){
		  $('#loginform').submit(function(e){
		    return false;
		  });
		  
		  $('#modaltrigger').leanModal({ top: 110, overlay: 0.45, closeButton: ".hidemodal" });
		});

	};
})

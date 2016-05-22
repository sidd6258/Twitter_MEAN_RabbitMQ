'use strict';
var mytwitter=angular.module("mytwitter",['ngRoute','ui.bootstrap'])
.config(function ($routeProvider,$locationProvider){
	console.log("in");
	$routeProvider.when('/',{
		templateUrl : 'template/home.ejs',
		controller : 'HomeController'
	})
	.when('/signUp',{
		templateUrl : 'template/signUp.ejs',
		controller : 'SignUpController'
	})
	.when('/userLoginPage',{
		templateUrl : 'template/userLoginPage.ejs',
		controller : 'UserLoginPageController'
	})
	.when('/profileEdit',{
		templateUrl : 'template/profileEdit.ejs',
		controller : 'ProfileEditController'
	}).when('/userprofile',{
		templateUrl : 'template/userprofile.ejs',
		controller : 'UserProfileController'
	}).when('/extprofile',{
		templateUrl : 'template/extprofile.ejs',
		controller : 'ExternalController'
	}).when('/search',{
		templateUrl : 'template/searchpage.ejs',
		controller : 'SearchController'
	}).when('/followinglistpage',{
		templateUrl : 'template/followinglistpage.ejs',
		controller : 'FollowerslistController'
	}).when('/followerslistpage',{
		templateUrl : 'template/followerslistpage.ejs',
		controller : 'FollowinglistController'
	}).otherwise({
		redirectTo : '/'
	});
	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	});
});
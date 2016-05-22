'use strict';
      mytwitter.controller("ProfileEditController", function($scope,$http,$location){
    	  $scope.oldName=function(){
        	  console.log("Fetch old Name");
        	  	         $http({
	         url: '/fetchOldName', 
	         method: 'GET'
        	  	       }).success(function(data) {
        	  				//checking the response data for statusCode
        	  				if (data.status == 401) {
        	  					console.log("Error Occured Profile Page");
        	  				}
        	  				else
        	  					//Making a get call to the '/redirectToHomepage' API
        	  				console.log(data);	
        	  			var fname=document.getElementById("fname");
        	  			var lname=document.getElementById("lname");
        	  			var location=document.getElementById("location");
        	  			var dob=document.getElementById("dob");
        	  			var handle=document.getElementById("handle");
        	  			fname.placeholder=data.first_name;
        	  			lname.placeholder=data.last_name;
        	  			location.placeholder=data.location;
        	  			dob.placeholder=data.dob;
        	  			handle.placeholder=data.handle;
        	  			}).error(function(error) {
        	  				$scope.unexpected_error = false;
        	  				$scope.invalid_login = true;
        	  			});
        	  		}; 
          $scope.updateName=function(){
        	  console.log("Edit profile page");
        	  	         $http({
	         url: '/editProfile', 
	         method: 'POST', 
	         data: { "newname": $scope.newname,
	        	     "lname": $scope.lname,
	        	     "location": $scope.location,
	        	     "handle": $scope.handle,
	        	     "dob": $scope.dob}
        	  	       }).success(function(data) {
        	  				//checking the response data for statusCode
        	  				if (data.statusCode == 401) {
        	  					console.log("Error Occured Profile Page");
        	  				}
        	  				else
        	  					//Making a get call to the '/redirectToHomepage' API
        	  				console.log("New Name: " + $scope.newname);	
        	  					$location.path("/userLoginPage"); 
        	  			}).error(function(error) {
        	  				$scope.unexpected_error = false;
        	  				$scope.invalid_login = true;
        	  			});
        	  		};
         });
'use strict';


mytwitter.controller("SignUpController", function($scope,$http,$location){
	 			
			
			$(function(){
			  $('#loginform').submit(function(e){
			    return false;
			  });
			  
			  $('#modaltrigger').leanModal({ top: 110, overlay: 0.45, closeButton: ".hidemodal" });
			});
			
			$scope.signup=function(){
				console.log("ins");
				//console.log($scope.SignupForm.fname);
				if($scope.SignUpForm.fname.$invalid
						||$scope.SignUpForm.lname.$invalid
						||$scope.SignUpForm.dob.$invalid
						||$scope.SignUpForm.handle.$invalid
						||$scope.SignUpForm.location.$invalid
						||$scope.SignUpForm.phoneNumber.$invalid
						||$scope.SignUpForm.username.$invalid
						||$scope.SignUpForm.password.$invalid)
					{
					alert("Invalid details");
					}
				else{
	  	         $http({
	  		         url: '/afterSignUp', 
	  		         method: 'POST', 
	  		         data: { "username": $scope.username, 
	  		        	 	 "password": $scope.password,
	  		        	 	 "fname": $scope.fname,
	  		        	 	 "lname": $scope.lname,
	  		        	     "dob": $scope.dob,
	  		        	     "handle": $scope.handle,
	  		        	     "location": $scope.location,
	  		        	     "phoneNumber": $scope.phoneNumber,
	  		        	 	 }
	  		         }).success(function (data, status, headers, config) {
	  		        	 console.log(data);
	  		        	if(data=="Invalid Login"){
		    				console.log(data);
		    				alert("Soryy Something went wrong");
		    				
		    			}
		         		else
		         			{
	  		        	$location.path("/");
		         			} 
	  		         });
				}	 
	  		         
			};
	  		        	 
	  		         
			
			
});

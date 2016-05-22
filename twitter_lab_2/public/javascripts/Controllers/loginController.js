
      mytwitter.controller("LoginController", function($scope,$http,$location,$window){
        	 
          $scope.SignIn1=function(){
        	  console.log("in12");
        	  console.log("pass"+$scope.password);
        	  	         $http({
	         url: '/afterSignIn', 
	         method: 'POST', 
	         data: { "username": $scope.username, "password": $scope.password }
	         }).success(function (data) {
	         		console.log("Hi I'm here "+data.status);
	         		if(data.status == 200){
	    				
	         			console.log("In Login Controller "+data.userid);
	         			$window.sessionStorage.userid=data.userid;
	         			$window.sessionStorage.username=data.user_name;
	         			$window.sessionStorage.firstname=data.first_name;
	         			$window.sessionStorage.lastname=data.last_name;
	         			$window.sessionStorage.handle=data.handle;
	         			$location.path("/userLoginPage");
	    				
	    			}
	         		else
	         			{

	         			alert("Soryy Invalid Username/password");
	         			}
	         }).error(function (data) {
	          		
	         });
     };
         });
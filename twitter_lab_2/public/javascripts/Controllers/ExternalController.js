 mytwitter.controller("ExternalController", function($scope,$http,$location,$window){
	 
	 $scope.loadProfile=function(){
		 console.log($window.sessionStorage.eid);
		 $http({
	         url: '/loadeuserfollowing', 
	         method: 'POST',
	         data :{"id":$window.sessionStorage.eid}
	         }).success(function (data, status, headers, config) {
	        	 console.log(data);
	        	 console.log(data[0]["count"]);
	        	 var id=document.getElementById("following");
	        	 id.innerHTML=data[0]["count"];
	         }).error(function (data, status, headers, config) {
      		console.log("err");
	         });
       $http({
	         url: '/loadeuserfollowers', 
	         method: 'POST',
	         data :{"id":$window.sessionStorage.eid}
	         }).success(function (data, status, headers, config) {
	        	 console.log(data);
	        	 console.log(data[0]["count"]);
	        	 var id=document.getElementById("followers");
	        	 id.innerHTML=data[0]["count"];
	         }).error(function (data, status, headers, config) {
      		console.log("err");
	         });
       
       $http({
	         url: '/loadeusertweetcount', 
	         method: 'POST',
	         data :{"id":$window.sessionStorage.eid}
	         }).success(function (data, status, headers, config) {
	        	 console.log(data);
	        	 var tc=document.getElementById("tweetcount");
	        	 tc.innerHTML=data[0].count;
	        }).error(function (data, status, headers, config) {
          		console.log("err");
	         });
       /*$http({
	         url: '/isfollowing', 
	         method: 'POST',
	         data :{"id":$window.sessionStorage.eid}
	         }).success(function (data, status, headers, config) {
	        	 console.log(data);
	        	 var tc=document.getElementById("tweetcount");
	        	 tc.innerHTML=data[0].count;
	        }).error(function (data, status, headers, config) {
        		console.log("err");
	         });*/
	 };
 });
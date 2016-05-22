
      mytwitter.controller("UserLoginPageController", function($scope,$http,$location,$window,$compile,$route){
        	var handles=[];
        	handles[0]=$window.sessionStorage.handle;
        	console.log(handles);
    	  $(function(){
			  $('#loginform').submit(function(e){
			    return false;
			  });
			  
			  $('#modaltrigger').leanModal({ top: 110, overlay: 0.45, closeButton: ".hidemodal" });
			});
    	  
         $scope.load=function(){
        	 var username=document.getElementById("user");
        	 console.log($window.sessionStorage.firstname+$window.sessionStorage.lastname);
        	 username.innerHTML=$window.sessionStorage.firstname +" "+$window.sessionStorage.lastname;
        	 console.log($window.sessionStorage.handle);
        	 document.getElementById("handle").innerHTML=$window.sessionStorage.handle;
        	 console.log($window.sessionStorage.userid);
	  	         $http({
	  		         url: '/loadfollowing', 
	  		         method: 'GET',
	  		         }).success(function (data, status, headers, config) {
	  		        	 console.log(data);
	  		        	// console.log(data.following.length);
	  		        	 if(data.following)
	  		        		 {
	  		        	 var id=document.getElementById("following");
	  		        	 id.innerHTML=data.following.length;
	  		        	 for(i=0;i<data.following.length;i++)
	  		        		 {
	  		        		 handles[i+1]=data.following[i].handle;
	  		        		 }
	  		        		 }
	  		         }).error(function (data, status, headers, config) {
	 	          		console.log("err");
	  		         });
	  	       $http({
	  		         url: '/loadfollowers', 
	  		         method: 'GET',
	  		         }).success(function (data, status, headers, config) {
	  		        	console.log(data);
	  		        	 //console.log(data.followers.length);
	  		        	 if(data.followers)
	  		        		 {
	  		        	 var id=document.getElementById("followers");
	  		        	 id.innerHTML=data.followers.length;
	  		        		 }
	  		        	}).error(function (data, status, headers, config) {
	 	          		console.log("err");
	  		         });
	  	       $http({
	  		         url: '/loadftweets', 
	  		         method: 'GET',
	  		       data: { "handles": handles }
	  		         }).success(function (data, status, headers, config) {
	  		        	 console.log(data.users);
	  		        	 var list=document.getElementById("stream-items-id");
	  		        	//console.log("Tweet count: " +data.tweets.length);
	  		        	 for(i=0;i<data.users.length;i++)
	  		        		 {
	  		        		 for(j=0;j<data.users[i].tweets.length;j++)
	  		        		 {
	  		        		 var li=document.createElement("li");
	  		        		 li.className="js-stream-item stream-item stream-item expanding-stream-item";
	  		        		 var divv=document.createElement("div");
	  		        		 divv.className="tweet original-tweet js-original-tweet js-stream-tweet js-actionable-tweet js-profile-popup-actionable";
	  		        		 var div=document.createElement("div");
	  		        		 div.className="content";
	  		        		 var div1=document.createElement("div");
	  		        		 div1.className="stream-item-header";
	  		        		 var a=document.createElement("a");
	  		        		 a.className="account-group js-account-group js-action-profile js-user-profile-link js-nav";
	  		        		 a.setAttribute("ng-click","loadeprofile("+data.users[i].handle+");");
	  		        		 var str=document.createElement("strong");
	  		        		 str.className="fullname js-action-profile-name show-popup-with-id";
	  		        		 str.innerHTML=data.users[i].name;
	  		        		 var span=document.createElement("span");
	  		        		 span.innerHTML="&rlm;";
	  		        		 var span1=document.createElement("span");
	  		        		 span1.className="username js-action-profile-name";
	  		        		 var s=document.createElement("s");
	  		        		 s.innerHTML="@";
	  		        		 var b=document.createElement("b");
	  		        		 b.innerHTML=data.users[i].handle;
	  		        		 var img=document.createElement("img");
	  		        		 img.className="avatar js-action-profile-avatar";
	  		        		 img.src="https://abs.twimg.com/sticky/default_profile_images/default_profile_4_bigger.png";
	  		        		 span1.appendChild(s);
	  		        		 span1.appendChild(b);
	  		        		 a.appendChild(str);
	  		        		 a.appendChild(span);
	  		        		 a.appendChild(span1);
	  		        		 a.appendChild(img);
	  		        		 div1.appendChild(a);
	  		        		 div.appendChild(div1);
	  		        		 divv.appendChild(div);
	  		        		 li.appendChild(divv);
	  		        		 list.appendChild(li);
	  		        		 var divc=document.createElement("div");
	  		        		 divc.className="js-tweet-text-container";
	  		        		 var p=document.createElement("p");
	  		        		 p.className="TweetTextSize TweetTextSize--26px js-tweet-text tweet-text";
	  		        		 p.lang="en";
	  		        		 p.innerHTML=data.users[i].tweets[j];
	  		        		 divc.appendChild(p);
	  		        		 div.appendChild(divc);
	  		        		 var divf=document.createElement("div");
	  		        		 divf.className="stream-item-footer";
	  		        		 var divf1=document.createElement("div");
	  		        		 var divr=document.createElement("div");
	  		        		 divr.className="ProfileTweet-action ProfileTweet-action--retweet js-toggleState js-toggleRt";
	  		        		 divf1.className="ProfileTweet-actionList js-actions";
	  		        		 var divf2=document.createElement("div");
	  		        		 divf2.className="ProfileTweet-action ProfileTweet-action--retweet js-toggleState js-toggleRt";
	  		        		 var btn=document.createElement("button");
	  		        		 btn.className="ProfileTweet-actionButtonUndo js-actionButton js-actionRetweet";
	  		        		 btn.setAttribute("style","display:block;");
	  		        		 var divb=document.createElement("div");
	  		        		 divb.className="IconContainer js-tooltip";
	  		        		 var spanb=document.createElement("span");
	  		        		 spanb.className="Icon Icon--retweet";
	  		        		 divb.appendChild(spanb);
	  		        		 btn.appendChild(divb);
	  		        		 divf2.appendChild(btn);
	  		        		 divf1.appendChild(divf2);
	  		        		 divf.appendChild(divf1);
	  		        		 div.appendChild(divf);
	  		        		
	  		        		 }
	  		         }
	  		        	 $compile(list)($scope);
	  		         }).error(function (data, status, headers, config) {
	 	          		console.log("err");
	  		         });
	  	     $http({
  		         url: '/loadftweetcount', 
  		         method: 'GET',
  		         }).success(function (data, status, headers, config) {
  		        	 console.log(data);
  		        	 if(data.tweets)
  		        		 {
  		        	 var tc=document.getElementById("tweetcount");
  		        	 tc.innerHTML=data.tweets.length;
  		        		 }
  		        }).error(function (data, status, headers, config) {
 	          		console.log("err");
  		         });
	  	         
         };
		$scope.edit = function() {
			$location.path("/profileEdit");				
		};
		
		$scope.loadprofile=function(){
			$location.path("/userprofile");
		};
		$scope.loadeprofile= function(id)
		{
			console.log("inid"+id);
			$window.sessionStorage.eid=id;
			$location.path("/extprofile");
		};
		$scope.searchf=function(){
			console.log("in");
			var sq=$scope.search;
			$window.sessionStorage.sq=sq;
			 $location.path("/search");
		};
		$scope.newtweet=function(){
	      	  console.log($scope.newtweet1);
	      	  	         $http({
		         url: '/newtweet', 
		         method: 'POST', 
		         data: { "newtweet": $scope.newtweet1 }
	      	  	       }).success(function(data) {
	      	  	    	   //console.log(results);
	      	  				//checking the response data for statusCode
	      	  				if (data.statusCode == 401) {
	      	  					console.log("Error Occured Profile Page");
	      	  				}
	      	  				else
	      	  					//Making a get call to the '/redirectToHomepage' API
	      	  				console.log("New Name: " + $scope.newname);	
	      	  					//$location.path("/userLoginPage");
	      	  				$route.reload();
	      	  			}).error(function(error) {
	      	  				$scope.unexpected_error = false;
	      	  				$scope.invalid_login = true;
	      	  			});
	      	  	     //$scope.$apply(); 
	      	  		};
	      	  		
	      	  	$scope.followerslist = function() {
					$location.path("/followerslistpage");				
				};
				$scope.followinglist = function() {
					$location.path("/followinglistpage");				
				};
         });
      
      
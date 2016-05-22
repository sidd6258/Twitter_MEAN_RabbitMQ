mytwitter.controller("FollowinglistController", function($scope,$http,$location,$window){
	
$scope.loadfollowing=function(){
	
	 console.log($window.sessionStorage.userid);
	       $http({
		         url: '/loadfollowingcontent', 
		         method: 'GET'
		         }).success(function (data, status, headers, config) {
		        	 console.log(data);
		        	 var list=document.getElementById("stream-items-id");
		        	 var tc=document.getElementById("tweetcount");
		        	 tc.innerHTML=data.following.length;
		        	 for(i=0;i<data.following.length;i++)
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
		        		 var str=document.createElement("strong");
		        		 str.className="fullname js-action-profile-name show-popup-with-id";
		        		 str.innerHTML=data.following[i].first_name;
		        		 var span=document.createElement("span");
		        		 span.innerHTML="&rlm;";
		        		 var span1=document.createElement("span");
		        		 span1.className="username js-action-profile-name";
		        		 var s=document.createElement("s");
		        		 s.innerHTML="@";
		        		 var b=document.createElement("b");
		        		 b.innerHTML=data.following[i].handle;
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
		        		 div.appendChild(divc);
		        		 var divf=document.createElement("div");
		        		 divf.className="stream-item-footer";
		        		 var divf1=document.createElement("div");
		        		 var divr=document.createElement("div");
		        		 divr.className="ProfileTweet-action ProfileTweet-action--retweet js-toggleState js-toggleRt";
		        		 divf1.className="ProfileTweet-actionList js-actions";
		        		 divf.appendChild(divf1);
		        		 div.appendChild(divf);
		        		 }
		        	 
		         }).error(function (data, status, headers, config) {
          		console.log("err");
		         });
};
	
	$scope.back = function() {
		$location.path("/userLoginPage");				
	};
});
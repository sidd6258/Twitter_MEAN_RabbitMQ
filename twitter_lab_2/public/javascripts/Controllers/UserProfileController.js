mytwitter.controller("UserProfileController", function($scope,$http,$location,$window){
	
	$scope.loadProfile=function(){
		console.log($window.sessionStorage.firstname+" "+$window.sessionStorage.lastname);
		console.log($window.sessionStorage.handle);
		document.getElementById("names").innerHTML=$window.sessionStorage.firstname+" "+$window.sessionStorage.lastname;
		document.getElementById("handles").innerHTML=$window.sessionStorage.handle;
		$http({
		         url: '/loaduserfollowing', 
		         method: 'GET',
		         }).success(function (data, status, headers, config) {
		        	 console.log(data);
  		        	 console.log(data.following.length);
		        	 var id=document.getElementById("following");
		        	 id.innerHTML=data.following.length;
		         }).error(function (data, status, headers, config) {
          		console.log("err");
		         });
	       $http({
		         url: '/loaduserfollowers', 
		         method: 'GET',
		         }).success(function (data, status, headers, config) {
		        	 console.log(data);
  		        	 console.log(data.followers.length);
		        	 var id=document.getElementById("followers");
		        	 id.innerHTML=data.followers.length;
		         }).error(function (data, status, headers, config) {
          		console.log("err");
		         });
	       
	       $http({
		         url: '/loadusertweetcount', 
		         method: 'GET',
		         }).success(function (data, status, headers, config) {
		        	 console.log(data);
  		        	 var tc=document.getElementById("tweetcount");
  		        	 tc.innerHTML=data.tweets.length;
		        }).error(function (data, status, headers, config) {
	          		console.log("err");
		         });
	       $http({
		         url: '/loadutweets', 
		         method: 'GET',
		         }).success(function (data, status, headers, config) {
		        	 console.log(data.tweets.length);
		        	 var list=document.getElementById("stream-items-id");
		        	 for(i=0;i<data.tweets.length;i++)
		        		 {
		        		 alert("in"+i);
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
		        		 str.innerHTML=$window.sessionStorage.firstname+" "+$window.sessionStorage.lastname;
		        		 var span=document.createElement("span");
		        		 span.innerHTML="&rlm;";
		        		 var span1=document.createElement("span");
		        		 span1.className="username js-action-profile-name";
		        		 var s=document.createElement("s");
		        		 s.innerHTML="@";
		        		 var b=document.createElement("b");
		        		 b.innerHTML=data.handle;
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
		        		 p.innerHTML=data.tweets[i];
		        		 divc.appendChild(p);
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
		        			for(i=0;i<data.retweets.length;i++)
		        			 {
		        			 var li=document.createElement("li");
			        		 li.className="js-stream-item stream-item stream-item expanding-stream-item";
			        		 var divv=document.createElement("div");
			        		 divv.className="tweet original-tweet js-original-tweet js-stream-tweet js-actionable-tweet js-profile-popup-actionable";
			        		 var divco=document.createElement("div");
			        		 divco.className="context";
			        		 var divco1=document.createElement("div");
			        		 divco1.className="tweet-context with-icn";
			        		 var spanco=document.createElement("span");
			        		 spanco.className="Icon Icon--small Icon--retweeted";
			        		 var spanco1=document.createElement("span");
			        		 spanco1.className="js-retweet-text";
			        		 var spana=document.createElement("a");
			        		 spana.className="pretty-link js-user-profile-link";
			        		 spanb=document.createElement("b");
			        		 spanb.innerHTML="You Retweeted";
			        		 spana.appendChild(spanb);
			        		 spanco1.appendChild(spana);
			        		 divco1.appendChild(spanco);
			        		 divco1.appendChild(spanco1);
			        		 divco.appendChild(divco1);
			        		 divv.appendChild(divco);
			        		 var div=document.createElement("div");
			        		 div.className="content";
			        		 var div1=document.createElement("div");
			        		 div1.className="stream-item-header";
			        		 var a=document.createElement("a");
			        		 a.className="account-group js-account-group js-action-profile js-user-profile-link js-nav";
			        		 var str=document.createElement("strong");
			        		 str.className="fullname js-action-profile-name show-popup-with-id";
			        		 str.innerHTML=data.retweets[i].parent_name;
			        		 var span=document.createElement("span");
			        		 span.innerHTML="&rlm;";
			        		 var span1=document.createElement("span");
			        		 span1.className="username js-action-profile-name";
			        		 var s=document.createElement("s");
			        		 s.innerHTML="@";
			        		 var b=document.createElement("b");
			        		 b.innerHTML=data.retweets[i].parent_handle;
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
			        		 p.innerHTML=data.retweets[i].parent_tweet_content;
			        		 divc.appendChild(p);
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
	
	$scope.edit = function() {
		$location.path("/profileEdit");				
	};
});
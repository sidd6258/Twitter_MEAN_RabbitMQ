mytwitter.controller("SearchController", function($scope,$http,$location,$window,$compile){
        	
	$scope.load=function(){
		console.log($window.sessionStorage.sq);
		var sq=$window.sessionStorage.sq;
		document.getElementById("hash").innerHTML=sq;
		$http({
	         url: '/search', 
	         method: 'POST',
	         data :{"sq":sq}
	         }).success(function (data, status, headers, config) {
	        	 console.log(data);
	        	 var list=document.getElementById("stream-items-id");
		        	 for(i=0;i<data.user.length;i++)
		        		 {
		        		 console.log("in");
		        		 for(j=0;j<data.user[i].tweets.length;j++)
		        			 {
		        			 console.log("in1");
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
		        		 a.setAttribute("ng-click","loadeprofile("+data.user[i].handle1+");");
		        		 var str=document.createElement("strong");
		        		 str.className="fullname js-action-profile-name show-popup-with-id";
		        		 str.innerHTML=data.user[i].name;
		        		 var span=document.createElement("span");
		        		 span.innerHTML="&rlm;";
		        		 var span1=document.createElement("span");
		        		 span1.className="username js-action-profile-name";
		        		 var s=document.createElement("s");
		        		 s.innerHTML="@";
		        		 var b=document.createElement("b");
		        		 b.innerHTML=data.user[i].handle;
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
		        		 p.innerHTML=data.user[i].tweets[j];
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
		        		 $compile(list)($scope);
		        		 }
		        	 //$compile(list)($scope);
	         }).error(function (data, status, headers, config) {
     		console.log("err");
	         });
	};
	
	$scope.loadeprofile= function(id)
	{
		console.log("inid"+id);
		$window.sessionStorage.eid=id;
		$location.path("/extprofile");
	};
});
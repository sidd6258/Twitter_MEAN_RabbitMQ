var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/twitter";
var coll;
var db;
mongo.connect(mongoURL, function(){

});

function handle_request(req, callback){
	var operation = req.operation;
	var message = req.message;
	var res = {};
	console.log("In handle request:"+ req.operation);
	console.log("a"+req.message);
	
	switch(operation){
	
	case "signup" :
			signup(message,callback);
			break;
	
	case "signin" : 
		signin(message,callback);
		break;
		
	case "loadfollowing" :
		loadfollowing(message,callback);
		break;
		
	case "loadfollowers" :
		loadfollowers(message,callback);
		break;
		
	case "loadfTweets" :
		loadfTweets(message,callback);
		break;	
		
	case "loadftweetcount" :
		loadftweetcount(message,callback);
		break;	
		
	case "loaduTweets" :
		loaduTweets(message,callback);
		break;
		
	case "loadfollowerscontent" :
		loadfollowerscontent(message,callback);
		break;	
		
	case "loadfollowingcontent" :	
		loadfollowingcontent(message,callback);
		break;
			
	default : 
		callback({status : 400,message : "Bad Request"});
}

	
}

function signin(msg,callback) {
	var username = msg.username;
	var password = msg.password;
	console.log(username);
	
	var res = {};

	
		var coll = mongo.collection('user_details');

		coll.findOne({user_name: username, user_password:password}, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.
				console.log(user.user_name);
				res.userid=user._id;
				res.username=user.user_name;
				res.status=200;
				res.password=user.password;
				res.first_name=user.first_name;
				res.last_name=user.last_name;
				res.handle=user.handle;
				callback(null,res);

			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				callback(null,json_responses);
			}
		});
	
}

function signup(msg,callback)
{
	var username = msg.username;
	var password = msg.password;
	firstname=msg.firstname;
	lastname=msg.lastname;
	dob=msg.dob;
	handle=msg.handle;
	number=msg.number;
	location=msg.location;
	console.log(username);
	
	var res = {};

	
		console.log('Connected to mongo at signup: ' + mongoURL);
		var coll = mongo.collection('user_details');
		
		coll.insertOne({user_name:username,user_password:password,first_name:firstname,last_name:lastname,handle:handle,location:location,dob:dob,contact:number},function(err, user){
			if(err==null)
				{
					console.log("inserted");
					res.status=200;
					callback(null,res);
				}
			else
				{
				console.log("error");
				res.status=401;
				callback(null,res);
				}
		});
	
}

function loadfollowing(msg,callback) {
	var userid = "ObjectId("+msg.userid+")";
	var handle = msg.handle;
	console.log("In Loadfollowing function: "+userid);
	
	var res = {};

	
		console.log('Connected to mongo at loadfollowing: ' + mongoURL);
		var coll = mongo.collection('user_details');

		coll.findOne({handle: handle}, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.
				console.log(user.following);
				res.following=user.following;
				res.status=200;
				console.log("Response of Loadfollowing function: "+ res);
				callback(null,res);

			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				callback(null,json_responses);
			}
		});
	
}
function loadfollowers(msg,callback) {
	var userid = "ObjectId("+msg.userid+")";
	var handle = msg.handle;
	console.log("In Loadfollowing function: "+userid);
	
	var res = {};

	
		console.log('Connected to mongo at loadfollowers: ' + mongoURL);
		var coll = mongo.collection('user_details');

		coll.findOne({handle: handle}, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.
				console.log(user.following);
				res.followers=user.followers;
				res.status=200;
				console.log("Response of Loadfollowing function: "+ res);
				callback(null,res);

			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				callback(null,json_responses);
			}
		});
	
}
function loadfTweets(msg,callback) {
	var userid = "ObjectId("+msg.userid+")";
	var handle = msg.handle;
	console.log("In loadfTweets function: "+userid);
	
	var res = {};
	var f=[];
	f[0]=handle;

	
		console.log('UConnected to mongo at loadfTweets: ' + mongoURL);
		var coll = mongo.collection('tweet');
		var coll1=mongo.collection('user_details');
		var arr=[]
		coll1.findOne({handle: handle}, function(err, users){
			if(users.following)
			{	
				for(i=0;i<users.following.length;i++)
					{
					 f[i+1]=users.following[i].handle;
					}
				tweets(f,msg,callback);
		}
			else
				{
				tweets(f,msg,callback);
				}
			
		});
	
	
}

function tweets(f,msg,callback){
	console.log("aj)");
	var res={};
	
		console.log('Connected to mongo at loadfTweets: ' + mongoURL);
		var coll = mongo.collection('tweet');
		coll.find({handle:{$in: f}}).toArray(function(err,user){
			if(user)
			{
			console.log("user"+user[0]);
			res.status=200;
			res.users=user;
			callback(null,res);
			}
		})
			
			
		
	
}
function loadftweetcount(msg,callback) {
	var userid = "ObjectId("+msg.userid+")";
	var handle = msg.handle;
	console.log("In loadftweetcount function: "+userid);
	
	var res = {};

	
		console.log('Connected to mongo at loadftweetcount: ' + mongoURL);
		var coll = mongo.collection('tweet');

		coll.findOne({handle: handle}, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.
				console.log(user.tweets);
				res.tweets=user.tweets;
				res.status=200;
				console.log("Response of loadftweetcount function: "+ res);
				callback(null,res);

			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				callback(null,json_responses);
			}
		});
	
}

function loadfollowerscontent(msg,callback){
	var userid = "ObjectId("+msg.userid+")";
	var handle = msg.handle;
	console.log("In loadfollowerscontent function: "+userid);
	console.log()
	
	var res = {};

	
		console.log('Connected to mongo at loadftweetcount: ' + mongoURL);
		var coll = mongo.collection('user_details');

		coll.findOne({handle: handle}, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.
				console.log("af"+user);
				console.log("af"+user.followers);
				res.followers=user.followers;
				res.status=200;
				console.log("Response of loadftweetcount function: "+ res);
				callback(null,res);

			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				callback(null,json_responses);
			}
		});
	
	
}

function loadfollowingcontent(msg,callback){
	var userid = "ObjectId("+msg.userid+")";
	var handle = msg.handle;
	console.log("In loadfollowingcontent function: "+userid);
	console.log()
	
	var res = {};

	
		console.log('Connected to mongo at loadftweetcount: ' + mongoURL);
		var coll = mongo.collection('user_details');

		coll.findOne({handle: handle}, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.
				console.log("af"+user);
				console.log("af"+user.following);
				res.following=user.following;
				res.status=200;
				console.log("Response of loadftweetcount function: "+ res);
				callback(null,res);

			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				callback(null,json_responses);
			}
		});
	
}

function loaduTweets(msg,callback) {
	var userid = "ObjectId("+msg.userid+")";
	var handle = msg.handle;
	console.log("In loadfTweets function: "+userid);
	
	var res = {};

	
		console.log('Connected to mongo at loadfTweets: ' + mongoURL);
		var coll = mongo.collection('tweet');

		coll.findOne({handle: handle}, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.
				console.log(user.tweets);
				res.tweets=user.tweets;
				res.retweets=user.retweets;
				res.status=200;
				console.log("Response of loadfTweets function: "+ res);
				callback(null,res);

			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				callback(null,json_responses);
			}
		});
	
}



exports.handle_request = handle_request;
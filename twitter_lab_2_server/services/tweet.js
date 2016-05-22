var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/twitter";

function handle_request(req, callback){
	var operation = req.operation;
	var message = req.message;
	var res = {};
	console.log("In handle request:"+ req.operation);
	console.log("a"+req.message);
	
	switch(operation){
	
	case "newtweet" :
		newtweet(message,callback);
			break;
			
	case "search" :
		search(message,callback);
			break;
			
	default : 
		callback({status : 400,message : "Bad Request"});
}

	
}

function newtweet(msg,callback) {
	var newtweet = msg.newtweet;
	var handle = msg.handle;
	console.log(newtweet);
	
	var res = {};

	
		console.log('Connected to mongo at newtweet: ' + mongoURL);
		var coll = mongo.collection('tweet');
		
		coll.findOne({handle:handle},function(err,user){
			console.log(user);
			if(user)
				{
				addtweet(msg,callback);
				}
			else
				{
				addtweet1(msg,callback);
				}
		})
		
		
}
function addtweet(msg,callback)
{
	var res = {};
	var newtweet = msg.newtweet;
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at newtweet: ' + mongoURL);
		var coll = mongo.collection('tweet');
	var handle=msg.handle;
	coll.update({handle: handle},
			{ $addToSet: {tweets: newtweet}}, function(err, user){
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
	});
}
function addtweet1(msg,callback)
{
	var res = {};
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at newtweet: ' + mongoURL);
		var coll = mongo.collection('tweet');
	var handle=msg.handle;
	coll.insert({handle: handle},
			{ $addToSet: {tweets: newtweet}}, function(err, user){
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
	});
}

function search(msg,callback){
	var res = {};
	var reg=msg.sq;
	console.log("reg"+reg);
	mongo.connect(mongoURL, function(){
		var coll = mongo.collection('tweet');
		coll.find({tweets:{$elemMatch:{$regex:reg}}},{_id:1,name:1,handle:1,"tweets":{$elemMatch:{$regex:reg}}}).toArray(function(err,user){
			if(err==null)
				{
				console.log(JSON.stringify(user));
				console.log("aj"+user[0].handle);
				res.user=user;
				res.status=200;
				callback(null,res);
				}
		});
	});
}

exports.handle_request = handle_request;
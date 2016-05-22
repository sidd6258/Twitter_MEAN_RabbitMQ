var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/twitter";

function handle_request(req, callback){
	var operation = req.operation;
	var message = req.message;
	var res = {};
	console.log("In handle request:"+ req.operation);
	console.log("a"+req.message);
	
	switch(operation){
	
	case "fetchOldName" :
		fetchOldName(message,callback);
			break;
			
	case "editProfile" :
		editProfile(message,callback);
			break;
			
	default : 
		callback({status : 400,message : "Bad Request"});
}

	
}

function fetchOldName(msg,callback) {
	var handle = msg.handle;

	console.log("fetcholdname");
	var res = {};

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at signin: ' + mongoURL);
		var coll = mongo.collection('user_details');

		coll.findOne({handle: handle}, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.
				console.log(user.user_name);
		
				user.status=200;
				callback(null,user);

			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				callback(null,json_responses);
			}
		});
	});
}

function editProfile(msg,callback) {
var	new_first_name = msg.first_name;
var	new_last_name =msg.last_name;
var	new_location = msg.location;
var	new_dob = msg.dob;
var	new_handle = msg.new_handle;
var	handle = msg.handle;
	
	var res = {};

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at signin: ' + mongoURL);
		var coll = mongo.collection('user_details');

		coll.update({handle: handle},{
			$set: {
				first_name:new_first_name,
				last_name:new_last_name,
				location:new_location,
				dob:new_dob,
				handle:new_handle
				}
		}, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.
				console.log(user.user_name);
		
				user.status=200;
				callback(null,user);

			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				callback(null,json_responses);
			}
		});
	});
}

exports.handle_request = handle_request;
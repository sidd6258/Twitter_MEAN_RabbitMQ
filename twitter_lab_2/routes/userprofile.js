var ejs = require("ejs");
//var session = require('client-sessions');
var mq_client = require('../rpc/client');

exports.loaduserfollowing=function loaduserfollowing(req,res){
	console.log("id"+req.session.userid);
	var id=req.session.userid;
	var handle=req.session.handle;
	var msg_payload = {
			operation : "loadfollowing",
			message : {
				userid : id,
				handle : handle
			}
	};
	
mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.status == 200){
				console.log("following loaded at backend");
				
				res.send(results);
			}
			else {    
				
				console.log("Invalid Login");
				res.send("Invalid Login");
			}
		}  
	});
	
};

exports.loaduserfollowers=function loaduserfollowers(req,res){
	console.log("id"+req.session.userid);
	var id=req.session.userid;
	var handle=req.session.handle;
	var msg_payload = {
			operation : "loadfollowers",
			message : {
				userid : id,
				handle : handle
			}
	};
	
mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.status == 200){
				console.log("followers loaded at backend");
				
				res.send(results);
			}
			else {    
				
				console.log("Invalid Login");
				res.send("Invalid Login");
			}
		}  
	});
};

exports.loadusertweetcount=function loadftweetcount(req,res){
	var id=req.session.userid;
	var handle=req.session.handle;
	var msg_payload = {
			operation : "loadftweetcount",
			message : {
				userid : id,
				handle : handle
			}
	};
	
mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.status == 200){
				console.log("tweet count loaded at backend");
				
				res.send(results);
			}
			else {    
				
				console.log("Invalid Login");
				res.send("Invalid Login");
			}
		}  
	});
};

exports.loadutweets=function loadutweets(req,res)
{
	console.log("id"+req.session.userid);
	var id=req.session.userid;
	var handle=req.session.handle;
	var name=req.session.name
	var msg_payload = {
			operation : "loaduTweets",
			message : {
				userid : id,
				handle : handle
			}
	};
	
mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.status == 200){
				console.log("follower tweets loaded at backend");
				results.name=name;
				results.handle=handle;
				res.send(results);
			}
			else {    
				
				console.log("Invalid Login");
				res.send("Invalid Login");
			}
		}  
	});

}

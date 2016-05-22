var ejs = require("ejs");
//var session = require('client-sessions');
var mq_client = require('../rpc/client');

exports.loadFollowing= function loadfollowing(req,res) {
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

exports.loadfTweets=function loadfTweets(req,res)
{
	console.log("id"+req.session.userid);
	console.log("rp"+req.param("handles"));
	var id=req.session.userid;
	var handle=req.session.handle;
	var name=req.session.name
	var msg_payload = {
			operation : "loadfTweets",
			message : {
				userid : id,
				handle : handle
			}
	};
	
mq_client.make_request('login_queue',msg_payload, function(err,results){
		
	console.log("a"+JSON.stringify(results.users));
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

};

exports.loadFollowers= function loadfollowers(req,res) {

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

exports.loadftweetcount=function loadftweetcount(req,res){

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

exports.newtweet=function newtweet(req,res){
	
	var handle=req.session.handle;
	var newtweet=req.param("newtweet");
	
	var msg_payload = {
			operation : "newtweet",
			message : {
				handle : handle,
				newtweet : req.param("newtweet")
				
			}
	};
mq_client.make_request('tweet_queue',msg_payload, function(err,results){
		
		console.log("a"+results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.status == 200){
				console.log("Inserted new tweet");
				
				res.send(results);
			}
			else {    
				
				console.log("Invalid Login");
				res.send("Invalid Login");
			}
		}  
	});

};

exports.loadfollowerscontent= function loadfollowerscontent(req,res) {

	console.log("id"+req.session.userid);
	var id=req.session.userid;
	var handle=req.session.handle;
	msg_payload={
			operation : "loadfollowerscontent",
			message : {
				handle : handle,
				userid : id
				
			}
			
	}
mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.status == 200){
				console.log(results);
				
				res.send(results);
			}
			else {    
				
				console.log("Invalid Login");
				res.send("Invalid Login");
			}
		}  
	});
	/*
	var getuserdet="select FIRST_NAME,LAST_NAME,HANDLE from twitter_new.USER_DETAILS where USER_ID in(SELECT USER_ID_CHILD FROM twitter_new.FOLLOWERS where USER_ID_PARENT="+id+")";
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log(results);
			res.send(results);
		}
	},getuserdet);
*/};
exports.loadfollowingcontent= function loadfollowingcontent(req,res) {

	/*console.log("id"+req.session.userid);
	var id=req.session.userid;
	var getuserdet="select FIRST_NAME,LAST_NAME,HANDLE from twitter_new.USER_DETAILS where USER_ID in(SELECT USER_ID_PARENT FROM twitter_new.FOLLOWERS where USER_ID_CHILD="+id+")";
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log(results);
			res.send(results);
		}
	},getuserdet);*/
	console.log("id"+req.session.userid);
	var id=req.session.userid;
	var handle=req.session.handle;
	msg_payload={
			operation : "loadfollowingcontent",
			message : {
				handle : handle,
				userid : id
				
			}
			
	}
mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.status == 200){
				console.log(results);
				
				res.send(results);
			}
			else {    
				
				console.log("Invalid Login");
				res.send("Invalid Login");
			}
		}  
	});
};

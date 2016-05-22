/**
 * http://usejsdoc.org/
 */
var ejs = require("ejs");
//var session = require('client-sessions');
var encryption= require('./encryption');
var mq_client = require('../rpc/client');

exports.logout = function(req, res) {
	
	 console.log("reset not done");
	  req.session.destroy();
	  console.log("reset done");
	  ejs.renderFile('./views/index.ejs',function(err, result) {
		   // render on success
		   if (!err) {
		            res.end(result);
		   }
		   // render or error
		   else {
		            res.end('An error occurred');
		            console.log(err);
		   }
	   });
	}

exports.signin= function signin(req,res) {

	ejs.renderFile('./views/signin.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}
exports.signup= function signup(req,res) {

	ejs.renderFile('./views/tsignup.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}
exports.afterSignIn= function afterSignIn(req,res){
	
	var username = req.param("username");
	var password = req.param("password");
	password=encryption.encrypt(password);
	console.log("p"+password);
	console.log(username);
	var msg_payload = {
			operation : "signin",
			message : {
				username : username,
				password : password
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
				console.log("valid Login server home.js");
				console.log("Id storing " +results.userid);
     			req.session.userid=results.userid;
     			req.session.username=results.username;
     			req.session.handle=results.handle;
     			req.session.name=results.first_name+" "+ results.last_name;
     			console.log("Id stored " +req.session.userid);
				res.send(results);
			}
			else {    
				
				console.log("Invalid Login");
				res.send("Invalid Login");
			}
		}  
	});
	
	
};
exports.afterSignUp= function afterSignUp(req,res){
	var ep= req.param("password");
	console.log(ep);
	var ep_pro= encryption.encrypt(ep);
	console.log(ep_pro);
	var username = req.param("username");
	var password = req.param("password");
	password=encryption.encrypt(password);
	var msg_payload = {
			operation : "signup",
			message : {
				username : username,
				password : password,
				firstname: req.param("fname"),
				lastname : req.param("lname"),
				dob		 : req.param("dob"),
				handle	 : req.param("handle"),
				number 	 : req.param("phoneNumber"),
				location : req.param("location")
				
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
				console.log("valid Login");
				
				res.send(results);
			}
			else {    
				
				console.log("Invalid Login");
				res.send("Invalid Login");
			}
		}  
	});

};

exports.editProfile= function editProfile(req,res){
	var ep= req.param("password");
	console.log(ep);
	var ep_pro= encryption.encrypt(ep);
	console.log(ep_pro);
	var query= "INSERT INTO `twitter_new`.`USER_DETAILS` (`USER_NAME`, `USER_PASSWORD`, `name`) VALUES ('"+req.param("username")+"', '"+ep_pro+"', '"+req.param("fname")+"')";
    console.log(query);
    mysql.insertData(function(err,result){
    	var results = []
    	results.push({"username": req.param("username")});
    	results.push({"password": req.param("password")});
    	
    	results.push({"Name": req.param("fname")});
    	if(err)
    	{
    		throw err;
    	}
    	else
    		{
    		res.send("Inserted");
    				}
    },query);	
};

exports.sucesslogin=function signin(req,res) {
	var results=[];
	console.log(req.session.username);
	results[0]={"username":req.session.username};
	results[0].password=req.session.password;
	console.log(results);
	ejs.renderFile('./views/successLogin.ejs',{data:results},function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
};

exports.fetchOldName= function fetchOldName(req,res){
	// check user already exists
	var handle = req.session.handle
	
	var msg_payload = {
			operation : "fetchOldName",
			message : {
				handle : handle
			}
	};
	
mq_client.make_request('edit_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.status == 200){
				console.log("inside fetchOldName");
				res.send(results);
			}
			else {    
				
				console.log("Invalid Login");
				res.send("Invalid Login");
			}
		}  
	});	

	
};
	
exports.editProfile= function editProfile(req,res){
	var fname=req.param("newname");
	var lname=req.param("lname");
	var location=req.param("location");
	var new_handle=req.param("handle");
	var handle=req.session.handle;
	var dob=req.param("dob");
	var msg_payload = {
			operation : "editProfile",
			message : {
				first_name : fname,
				last_name : lname,
				location : location,
				handle : handle,
				new_handle : new_handle,
				dob : dob
			}
	};
	
mq_client.make_request('edit_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.status == 200){
				console.log("inside editProfile");
				res.send(results);
			}
			else {    
				
				console.log("Invalid Login");
				res.send("Invalid Login");
			}
		}  
	});	

};
var ejs = require("ejs");
//var session = require('client-sessions');
var mq_client = require('../rpc/client');

exports.search=function search(req,res)
{
var sq=req.param("sq");
var msg_payload = {
		operation : "search",
		message : {
			sq : sq,
			}
};
/*var query="SELECT * FROM tweet JOIN user_details where tweet.user_id=user_details.user_id AND tweet_message LIKE '%"+sq+"%'";
mysql.fetchData(function(err,results){
	if(err){
		throw err;
	}
	else 
	{
		console.log(results);
		res.send(results);
	}
	},query);

	//console.log("tweets"+results);
*/
mq_client.make_request('tweet_queue',msg_payload, function(err,results){
	
	console.log(results);
	if(err){
		throw err;
	}
	else 
	{
		if(results.status == 200){
			//console.log("valid Login server home.js");
			console.log("Id storing " +results);
 			
			res.send(results);
		}
		else {    
			
			console.log("Invalid Login");
			res.send("Invalid Login");
		}
	}  
});
}
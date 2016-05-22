var ejs= require('ejs');
var mysql = require('mysql');
var config= require('./config');
var poolConfig= config.dbpool;
var pool =[];
var db=config.db;
//Put your mysql configuration settings - user, password, database and port
function getConnection(){
	//var connection = 
	return mysql.createConnection({
	    host     : db.host,
	    user     : db.user,
	    password : db.password,
	    database : db.database,
	    port	 : db.port
	});
	
}

exports.createConnectionPool= function createConnectionPool(){
	for(var i=0; i<poolConfig.maxsize;i++){
		pool.push(getConnection());
	}
	
}
function getConnectionFromPool(){
	if(pool.length<=0){
		console.log("empty connection pool, sorry dude!");
		return null;
	}
	else{
		return pool.pop();
		
	}
	
}
exports.fetchData=function fetchData(callback,sqlQuery)
{
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnectionFromPool();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
			pool.push(connection);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			pool.push(connection);
			callback(err, rows);
			
		}
	});
	
	
}	
exports.insertData=function insertData(callback,query)
{
	
	console.log("\nSQL Query::"+query);
	
	var connection=getConnectionFromPool();
	
	connection.query(query, function(err, rows) {
		if(err){
			console.log("ERROR: " + err.message);
			pool.push(connection);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			pool.push(connection);
			callback(err, rows);
			
		}
	});
	console.log("\nConnection closed..");

};

exports.updateData=function updateData(callback,query)
{
	
	console.log("\nSQL Query::"+query);
	
	var connection=getConnectionFromPool();
	
	connection.query(query, function(err, rows) {
		if(err){
			console.log("ERROR: " + err.message);
			pool.push(connection);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			pool.push(connection);
			callback(err, rows);
			
		}
	});
	console.log("\nConnection closed..");

};

exports.fetchData1=function fetchData(callback,sqlQuery,results)
{
	
	
	var tweets=[];
	var erro;
	var i=0;
	var j=0;
	var connection=getConnectionFromPool();
	for(i=0;i<results.length;i++){
		var tweetq="select * from tweet join user_details where tweet.user_id=user_details.user_id AND tweet.USER_ID="+results[i]["USER_ID_PARENT"]+"";
		console.log("\nSQL Query::"+tweetq);
		connection.query(tweetq, function(err, rows, fields) {
			if(err){
				console.log("ERROR: " + err.message);
				pool.push(connection);
				erro=err;
			}
			else 
			{	// return err or result
				console.log("DB Results:"+rows);
				//pool.push(connection);
				tweets.push=rows;
				j++;
			}
		});
	}
	console.log("t"+tweets);
	callback(erro, tweets);
	
	
}	

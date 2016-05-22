exports.loadeuserfollowing=function loadeuserfollowing(req,res){
	console.log("id"+req.session.userid);
	var id=req.param("id");
	console.log("userid"+id);
	var getuserdet="select count(*) as count from followers where USER_ID_CHILD="+id+"";
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
	
};

exports.loadeuserfollowers=function loadeuserfollowers(req,res){
	console.log("id"+req.session.userid);
	var id=req.param("id");
	var getuserdet="select count(*)as count from followers where USER_ID_PARENT="+id+"";
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
};

exports.loadeusertweetcount=function loadftweetcount(req,res){
	var id=req.param("id");
	var getuserdet="select count(*) as count from tweet where USER_ID="+id+"";
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
};
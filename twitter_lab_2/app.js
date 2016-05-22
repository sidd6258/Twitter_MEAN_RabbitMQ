
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , login = require('./routes/login')
  , signUp = require('./routes/signUp')
  , path = require('path')
  //Importing the 'client-sessions' module
home = require('./routes/home'),
  mysql= require('./routes/mysql');
var session = require('express-session');
var app = express();
var ejs=require("ejs");
var userhome=require('./routes/userhome');
var userprofile=require("./routes/userprofile");
var userextprofile=require("./routes/extprofile");
var search=require("./routes/search");

mysql.createConnectionPool();

// all environments
//configure the sessions with our application
app.use(session({
	secret : '98765',
	resave : false,
	saveUninitialized : false,
	cookie:{maxAge : 600000,rolling : true}
})); // setting time for the session to be active when the window is open // 5 minutes set currently
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

//GET
app.get('/', routes.index);
app.get('/loadfollowerscontent',userhome.loadfollowerscontent);
app.get('/loadfollowingcontent',userhome.loadfollowingcontent);
app.post('/editProfile', home.editProfile);
app.post('/afterSignIn', home.afterSignIn);
app.post('/aftersignup', home.afterSignUp);
//app.get('/template/home.ejs',routes.index);
//app.get('/template/signUp.ejs',function(req,res){
//	res.render('template/signUp.ejs');
//});

//POST
//app.get('/signUp',routes.index);
//app.get('/login',login.login);
//app.post('/checklogin',login.checklogin);
app.post('/logout',login.logout);
app.get('/loadfollowing',userhome.loadFollowing);
app.get('/loadftweets',userhome.loadfTweets);
app.get('/loadfollowers',userhome.loadFollowers);
app.get('/loadftweetcount',userhome.loadftweetcount);
app.get('/loaduserfollowing',userprofile.loaduserfollowing);
app.get('/loaduserfollowers',userprofile.loaduserfollowers);
app.get('/loadusertweetcount',userprofile.loadusertweetcount);
app.get('/fetchOldName',home.fetchOldName);
app.post('/editProfile', home.editProfile);
app.get(('/loadutweets'),userprofile.loadutweets);
app.get('/loadftweetcount',userhome.loadftweetcount);
app.post('/loadeuserfollowing',userextprofile.loadeuserfollowing);
app.post('/loadeuserfollowers',userextprofile.loadeuserfollowers);
app.post('/loadeusertweetcount',userextprofile.loadeusertweetcount);
app.post('/search',search.search);
app.post('/newtweet', userhome.newtweet);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/**
 * http://usejsdoc.org/
 */

var ejs = require("ejs");
global.firstName;
global.lastName;
global.emailId;
global.password;
function signUp(req,res) {
console.log("sid");
	ejs.renderFile('./views/signUp.ejs',function(err, result) {
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

function signIn(req,res)
{
firstName = req.param("firstName");
lastName = req.param("lastName");
emailId = req.param("emailId");
password = req.param("inputPassword");


ejs.renderFile('./views/signIn.ejs', function(err, result) {
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
function afterSignIn(req,res)
{

var emailIdFromSignIn = req.param("inputUsername");
var passwordFromSignIn = req.param("inputPassword");
console.log(emailId);
console.log(emailIdFromSignIn);

if( emailId == emailIdFromSignIn && password == passwordFromSignIn)
	{
	console.log("valid Login");
	ejs.renderFile('./views/successLogin.ejs', { data1: firstName,data2:lastName,data3:emailId,data4:password } , function(err, result) {
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
else {    
	
	console.log("Invalid Login");
	ejs.renderFile('./views/failLogin.ejs',function(err, result) {
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
}
exports.signUp=signUp;
exports.signIn=signIn;
exports.afterSignIn=afterSignIn;
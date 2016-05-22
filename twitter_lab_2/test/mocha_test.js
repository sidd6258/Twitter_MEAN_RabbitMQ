/**
 * New node file
 */
var request = require('request')
, express = require('express')
,assert = require("assert")
,http = require("http");

describe('http tests', function(){

	it('should return the login if the url is correct', function(done){
		http.get('http://localhost:3000/', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});

	it('should login', function(done) {
		request.post(
			    'http://localhost:3000/afterSignIn',
			    { form: { username: 'siddharth6258@gmail.com',password:'55dc87c4' } },
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });
	it('should sign up', function(done) {
		request.post(
			    'http://localhost:3000/aftersignup',
			    { form: { username: 'siddharth6258@gmail.com',
			    		  password:'55dc87c4',
			    		  firstname:'Siddharth',
			    		  lastname:'Gupta',
			    		  dob:'8th-Dec-1988',
			    		  handle:'i_m_sidd',
			    		  number:'6692389997',
			    		  location:'San Jose'} },
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });
	   it('should fetch counts of followers', function(done) {
	        request.get(
	            'http://localhost:3000/loadfollowers',
	            function (error, response, body) {
	                assert.equal(200, response.statusCode);
	                done();
	            }
	        );
	    });
	   it('should fetch counts of tweets', function(done) {
	        request.get(
	            'http://localhost:3000/loadfollowing',
	            function (error, response, body) {
	                assert.equal(200, response.statusCode);
	                done();
	            }
	        );
	    });
});
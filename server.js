/**
 * @license
 * Everything in this repo is MIT License unless otherwise specified.
 *
 * Copyright (c) Addy Osmani, Sindre Sorhus, Pascal Hartig, Stephen  Sawchuk, Google, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

	// set up ========================
	var express  = require('express');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 					// mongoose for mongodb
	var morgan = require('morgan'); 			            // log requests to the console (express4)
	var bodyParser = require('body-parser'); 	            // pull information from HTML POST (express4)
	var methodOverride = require('method-override');        // simulate DELETE and PUT (express4)
	var argv = require('optimist').argv;

	// configuration =================
	//mongoose.connect('mongodb://104.199.153.122:80/sunsignage_cms');
   	app.use(express.static(__dirname + '/dist'));
	app.use(morgan('dev')); 										// log every request to the console
	app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
	app.use(bodyParser.json()); 									// parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(methodOverride());


	//var MongoClient = require('mongodb').MongoClient;
	//var dbUrl = 'mongodb://104.199.153.122:80/sunsignage_cms';
	
	// MOONGO DB
	mongoose.connect('mongodb://104.197.86.218:80/scms');
	var UserScreen = require('./app/models/user-screen');
	
    //TO DO : mongoose 적용전 임시 사용
    //var MongoClient = require('mongodb').MongoClient;
    //var dbUrl = 'mongodb://104.197.86.218:80/scms';

	// ROUTES FOR OUR API
	// =============================================================================
	var router = express.Router();              // get an instance of the express Router
	
	// middleware to use for all requests
	router.use(function(req, res, next) {
	    // do logging
	    console.log('Something is happening.');
	    next(); // make sure we go to the next routes and don't stop here
	});
	
		
	router.route('/')
		.get(function(req, res) {
			console.log('route index.html ---------');
	        res.sendfile('index.html'); 
		});


    // more routes for our API will happen here
	router.route('/user/screens')
	    .post(function(req, res) {
	        var userScreen = new UserScreen();
	        userScreen.screen_id = req.query.screen_id;
	        userScreen.email = req.query.email;
	        userScreen.company_id = req.query.company_id;
	
	        // save the userScreen and check for errors
	        userScreen.save(function(err) {
	            if (err) res.send(err);
	            res.json({ message: 'userScreen created!' });
	        });
			
			console.log('/user/screens post----->');
	        console.log('req.query----->', req.query);
	        console.log('req.body.params----->', req.body.params);

			/*
	        MongoClient.connect(dbUrl, function(err, db) {
			  	var col = db.collection('TN_CMS_USER_SCREEN');
				col.insertOne({
					screen_id: req.body.params.screen_id,
					email: req.body.params.email,
					company_id: req.body.params.company_id
				}, function(err, result) {
				  if(err) { res.send(err); }
				  
				  console.log('err------->', err);
				  console.log('r.insertedCount------->', result);
		   		  res.json(result.insertedCount);
				  db.close();
				});
		      });
		    */
	    })
	    .get(function(req, res) {
	        UserScreen.find({
	        	email: req.query.email 
	        }, function(err, userScreens) {
	            if (err) res.send(err);
	            res.json(userScreens);
	        });

			/*
	        MongoClient.connect(dbUrl, function(err, db) {
				var col = db.collection('TN_CMS_USER_SCREEN');
				col.find({
				  	email: req.query.email
				}).toArray(function(err, items) {
				  	if(err) { res.send(err); }
		   		  	res.json(items);
				  	db.close();
			    });
		    });
		    */
	    })
	    .delete(function(req, res) {
	        UserScreen.remove({
	            screen_id: req.params.screen_id
	        }, function(err, userScreen) {
	            if (err) res.send(err);
	            res.json({ message: 'Successfully deleted' });
	        });
	    });

	    /*
	    .put(function(req, res) {
	        UserScreen.findById(req.params.bear_id, function(err, userScreen) {
	
	            if (err)
	                res.send(err);
	
	            userScreen.name = req.body.name;  // update the bears info
	
	            // save the bear
	            userScreen.save(function(err) {
	                if (err)
	                    res.send(err);
	
	                res.json({ message: 'Bear updated!' });
	            });
	
	        });
	    });	
	    */
	    
	/*
	router.route('/bears/:bear_id')
	
	    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
	    .get(function(req, res) {
	        Bear.findById(req.params.bear_id, function(err, bear) {
	            if (err)
	                res.send(err);
	            res.json(bear);
	        });
	    });	    
	*/

	// REGISTER OUR ROUTES -------------------------------
	// all of our routes will be prefixed with /api
	app.use('/', router);
	
	// listen (start app with node server.js) ======================================
	app.listen(8080);
	console.log("App listening on port 8080");
	


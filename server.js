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
	var morgan = require('morgan'); 			// log requests to the console (express4)
	var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
	var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
	var argv = require('optimist').argv;

	// configuration =================

	mongoose.connect('mongodb://104.199.153.122:80/sunsignage_cms');

   	app.use(express.static(__dirname + '/dist'));
	app.use(morgan('dev')); 										// log every request to the console
	app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
	app.use(bodyParser.json()); 									// parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(methodOverride());

	// define model =================
	// FIX TO express.router 으로 파일 분리
	var UserScreenModel = mongoose.model('TN_CMS_USER_SCREEN', {
	    screen_id: String,
	    user_Id: String,
	    email: String,
	    company_Id: String
	});
	/*
	{
	    screen_id: "2f2f6664-cb63-47e3-b4f0-fea29c6eb534",
	    user_Id: "111174935314172819265",
	    email: "sunsignagetest01@gmail.com",
	    company_Id: "ab2032d8-c6c5-42f5-8697-f43da23ed871"    
	}	
	*/
	
	var UserScheduleModel = mongoose.model('TN_CMS_USER_SCHEDULE', {
	    schedule_id: String,
	    user_Id: String,
	    email: String,
	    company_Id: String
	});	
	
	var UserDisplayModel = mongoose.model('TN_CMS_USER_DISPLAY', {
	    display_id: String,
	    user_Id: String,
	    email: String,
	    company_Id: String
	});	

	// routes ======================================================================

	// screen api ---------------------------------------------------------------------
	app.get('/user/screens', function(req, res) {
		console.log("req------>", req.params);
		/*
		TypeError: req.params is not a function
	    at /home/ubuntu/workspace/server.js:82:36
	    at Layer.handle [as handle_request] (/home/ubuntu/workspace/node_modules/express/lib/router/layer.js:76:5)
	    at next (/home/ubuntu/workspace/node_modules/express/lib/router/route.js:100:13)
	    at Route.dispatch (/home/ubuntu/workspace/node_modules/express/lib/router/route.js:81:3)
	    at Layer.handle [as handle_request] (/home/ubuntu/workspace/node_modules/express/lib/router/layer.js:76:5)
	    at /home/ubuntu/workspace/node_modules/express/lib/router/index.js:227:24
	    at Function.proto.process_params (/home/ubuntu/workspace/node_modules/express/lib/router/index.js:305:12)
	    at /home/ubuntu/workspace/node_modules/express/lib/router/index.js:221:12
	    at Function.match_layer (/home/ubuntu/workspace/node_modules/express/lib/router/index.js:288:3)
	    at next (/home/ubuntu/workspace/node_modules/express/lib/router/index.js:182:10)
	    at methodOverride (/home/ubuntu/workspace/node_modules/method-override/index.js:63:14)
	    at Layer.handle [as handle_request] (/home/ubuntu/workspace/node_modules/express/lib/router/layer.js:76:5)
	    at trim_prefix (/home/ubuntu/workspace/node_modules/express/lib/router/index.js:263:13)
	    at /home/ubuntu/workspace/node_modules/express/lib/router/index.js:230:9
	    at Function.proto.process_params (/home/ubuntu/workspace/node_modules/express/lib/router/index.js:305:12)
	    at /home/ubuntu/workspace/node_modules/express/lib/router/index.js:221:12
		*/
		
		UserScreenModel.find({email: req.params('email')}, function(err, screen) {
			if(err) {
				res.send(err);
			}

			res.json(screen);
		});
	});

	/* create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			title : req.body.title,
			completed : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});

	app.put('/api/todos/:todo_id', function(req, res){
	  return Todo.findById(req.params.todo_id, function(err, todo) {
	    todo.title = req.body.title;
	    todo.completed = req.body.completed;
	    return todo.save(function(err) {
	      if (err) {
	        res.send(err);
	      }
	      return res.send(todo);
	    });
	  });
	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});
	*/
	
	// application -------------------------------------------------------------
	app.get('/', function(req, res) {
		res.sendfile('index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

	// listen (start app with node server.js) ======================================
	app.listen(8080);
	console.log("App listening on port 8080");

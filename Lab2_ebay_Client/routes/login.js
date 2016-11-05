var ejs = require("ejs");
var mysql = require("./mysql");
var log = require('./log'); 

function Login(req,res)
{
	var username = req.param('username');
	var password = req.param('password');
	var response;
	console.log(password);

	var query = "select id,first_name,email,handle,last_login,password from user where (handle='"+username+"' or email='"+username+"')";
	mysql.fetchData(function(err,results){
		if(err)
		{
			console.log('in error');
			response = {"statusCode":401,"data":null};
			res.send(JSON.stringify(response));
		}
		else
		{
			if(results.length > 0)
			{
				console.log(results[0].password);
				if(password == results[0].password)
				{
					console.log('in if');
					var rows = results;
					console.log(results);
					req.session.login = results[0];
					var query1 = "update user set last_login = now() where id="+req.session.login.id+"";
					mysql.fetchData(function(err,resultsq){
						if(err)
						{
							response = {"statusCode":403,"data":null};
							res.send(JSON.stringify(response));
						}
						else
						{
							response = {"statusCode":200,"data":results[0]};
							res.send(JSON.stringify(response));
	
						}
					},query1);
				}
				else
				{
					console.log('in else');
					response = {"statusCode":401,"data":null};
					res.send(JSON.stringify(response));
				}
			}
			else
			{
				console.log('in else');
				response = {"statusCode":401,"data":null};
				res.send(JSON.stringify(response));
			}
		}
	},query);
}

function getHomePage(req,res)
{
	ejs.renderFile('./views/Home.ejs',function(err, result) {
//		render on success
		if (!err) {
			res.end(result);
		}
//		render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
}

function Register(req,res)
{
	var email = req.param('email');
	var password = req.param('password');
	var first_name = req.param('first_name');
	var last_name = req.param('last_name');
	var handle = req.param('handle');
	var response;

	var query = "insert into user(first_name,last_name,email,password,handle,last_login) values('"+first_name+"','"+last_name+"','"+email+"','"+password+"','"+handle+"',now())";
	mysql.fetchData(function(err,results){
		if(err)
		{
			console.log('in error');
			response = {"statusCode":401,"data":null};
			res.send(JSON.stringify(response));
		}
		else
		{
			var rows = results;
			console.log(results);
			response = {"statusCode":200,"data":results};
			req.session.login = {"first_name":first_name,"email":email,"handle":handle,"last_login":new Date()};
			res.send(JSON.stringify(response));
		}
	},query);
}

exports.Login = Login;
exports.getHomePage = getHomePage;
exports.register = Register;
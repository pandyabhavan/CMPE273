var ejs = require("ejs");
var mysql = require("./mysql");
var log = require('./log');

function getLoginPage(req,res)
{
	ejs.renderFile('./views/Login.ejs',function(err, result) {
		if (!err) {
			res.end(result);
		}
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
}

function getLastLogin(req,res)
{
	var response;
	if(req.session.login)
	{
		var query = "select last_login from user where id="+req.session.login.id+"";
		mysql.fetchData(function(err,results){
			if(err)
			{
				response = {"statusCode":403,"data":null};
				res.send(JSON.stringify(response));
			}
			else
			{
				response = {"statusCode":200,"data":results};
				res.send(JSON.stringify(response));
			}
		},query);
	}
	else
	{
		response = {"statusCode":401,"data":null};
		res.send(JSON.stringify(response));
	}
}

function getTwoItems(req,res)
{
	var response;
	var query = "select i.id,i.name,quantity,u.first_name from item i,user u where i.user_id = u.id order by id desc limit 2";
	mysql.fetchData(function(err,results){
		if(err)
		{
			response = {"statusCode":403,"data":null};
			res.send(JSON.stringify(response));
		}
		else
		{
			response = {"statusCode":200,"data":results};
			res.send(JSON.stringify(response));
		}
	},query);
}

function logData(req,res)
{
	if(req.session.login)
	{
		log.info('User with id '+req.session.login.handle+' clicked at '+req.param('place')+' in file '+req.param('file'));
		res.send(JSON.stringify({"statusCode":200}));
	}
	else
	{
		log.info('Guest user clicked at '+req.param('place')+' in file '+req.param('file'));
		res.send(JSON.stringify({"statusCode":200}));
	}
}

exports.getLoginPage = getLoginPage;
exports.getLastLogin = getLastLogin;
exports.getTwoItems = getTwoItems;
exports.logData = logData;
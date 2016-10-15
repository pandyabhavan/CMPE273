var mysql = require("./mysql");
var ejs = require("ejs");

function getLoginSessionValues(req,res)
{
	var json_response;
	if(req.session.login)
		json_response = {"statusCode":200,"data":req.session.login};
	else
		json_response = {"statusCode":401,"data":null};

	res.send(JSON.stringify(json_response));
}

function logout(req,res)
{
	var response;
	req.session.destroy();
	response = {"statusCode":200,"data":null};
	res.send(JSON.stringify(response));
}

function search(req,res)
{
	var search_txt = req.param('search_txt');
	var search_category = req.param('search_category');
	var response,query;

	if(search_category != "All Categories")
		query = "select id,name,description,price from item where name like '%"+search_txt+"%' and category_id = (select id from category where name = '"+search_category+"') and quantity_remaining >0 order by id desc";
	else
		query = "select id,name,description,price from item where name like '%"+search_txt+"%' and quantity_remaining >0 order by id desc";

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
				console.log(results);
				response = {"statusCode":200,"data":results};
				req.session.search = results;
				console.log(response);
				res.send(JSON.stringify(response));
			}
			else
			{
				response = {"statusCode":403,"data":null};
				res.send(JSON.stringify(response));
			}
		}
	},query);
}

function getSearchPage(req,res)
{
	ejs.renderFile('./views/search.ejs',function(err, result) {
		if (!err) {
			res.end(result);
		}
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
}

function getSearchSession(req,res)
{
	var json_response;
	if(req.session.search)
		json_response = {"statusCode":200,"data":req.session.search};
	else
		json_response = {"statusCode":401,"data":null};

	res.send(JSON.stringify(json_response));
}

function getCartNumber(req,res)
{
	var response;
	if(req.session.login)
	{
		query = "select count(user_id) as count from cart where user_id= "+req.session.login.id+"";

		mysql.fetchData(function(err,results){
			if(err)
			{
				console.log('in error');
				response = {"statusCode":401,"data":0};
				res.send(JSON.stringify(response));
			}
			else
			{
				if(results.length > 0)
				{
					response = {"statusCode":200,"data":results[0].count};
					console.log(response);
					res.send(JSON.stringify(response));
				}
				else
				{
					response = {"statusCode":403,"data":0};
					res.send(JSON.stringify(response));
				}
			}
		},query);
	}
	else
	{
		response = {"statusCode":401,data:0};
		res.send(JSON.stringify(response));
	}
}

exports.getLoginSessionValues = getLoginSessionValues;
exports.logout = logout;
exports.search = search;
exports.getSearchPage = getSearchPage;
exports.getSearchSession = getSearchSession;
exports.getCartNumber = getCartNumber;
var mongo = require('./mongo');
var mongoURL = "mongodb://localhost:27017/ebay";

function getProductDetails(msg,callback)
{
	var res = {};
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
	
	var col = mongo.collection('item');
	col.find({"item_id":msg.item_id},function(error,result)
	{
		if(result)
		{
			res.code = "200",
			res.value = result;
		}	
		else
		{
			console.log("returned false");
			res.code = "401";
		}	
		callback(null, res);
	});
	});
}

function add_to_cart(msg,callback)
{
	var res = {};
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
	
	var col = mongo.collection('user');
	col.update({"handle":msg.user},{$push:{cart:{"item_id":msg.item_id,"quantity":msg.quantity}}},function(error,result)
	{
		if(result)
		{
			res.code = "200",
			res.value = result;
		}	
		else
		{
			console.log("returned false");
			res.code = "401";
		}	
		callback(null, res);
	});
	});
}

/*function placebid(req,res)
{
	var response;
	var item_id = req.param('item_id');
	if(req.session.login)
	{	
		var query = "select last_date,user_id from bidding where item_id="+item_id+"";
		mysql.fetchData(function(err,results){
			if(err)
			{
				console.log('in error');
				response = {"statusCode":403,"data":null};
				res.send(JSON.stringify(response));
			}
			else
			{
				if(new Date(results[0].last_date) < new Date())
				{
					var query2 = "update item set view = 0 where id ="+item_id+";";
					mysql.fetchData(function(err,results2){
						if(err)
						{
							console.log('in error');
							response = {"statusCode":403,"data":null};
							res.send(JSON.stringify(response));
						}
						else
						{
							var query1 = "insert into cart values("+results[0].user_id+","+item_id+",1)";
							mysql.fetchData(function(err,results1){
								if(err)
								{
									console.log('in error');
									response = {"statusCode":403,"data":null};
									res.send(JSON.stringify(response));
								}
								else
								{
									bidding_log.info("Item id "+item_id +" sold to "+results[0].user_id);
									response = {"statusCode":405,"data":null};
									res.send(JSON.stringify(response));
								}
							},query1);
						}
					},query2);
				}	
				else
				{
					var query1 = "update bidding set highest_bid = "+req.param('bid')+",user_id = "+req.session.login.id+" where item_id="+item_id+"";
					mysql.fetchData(function(err,results1){
						if(err)
						{
							console.log('in error');
							response = {"statusCode":403,"data":null};
							res.send(JSON.stringify(response));
						}
						else
						{
							bidding_log.info("Bid placed for item id "+item_id+" for "+req.param('bid')+" by user "+req.session.login.id+"");
							response = {"statusCode":200,"data":null};
							res.send(JSON.stringify(response));
						}
					},query1);
				}	
			}
		},query);
	}
	else
	{
		response = {"statusCode":401,"data":null};
		res.send(JSON.stringify(response));
	}	
}*/

exports.getProductDetails = getProductDetails;
exports.add_to_cart = add_to_cart;
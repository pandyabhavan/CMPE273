var mongo = require('./mongo');
var mongoURL = "mongodb://localhost:27017/ebay";

function deleteCart(item_id,user_id)
{
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);

		var col = mongo.collection('user');
		col.update({"user":user_id},{$pull:{"cart":{"item_id":item_id}}},function(error,result)
				{
			if(result)
			{
				return true;
			}	
			else
			{
				return false;
			}	
				});
	});
}

function updateItem(item_id,quantity)
{
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);

		var col = mongo.collection('item');
		col.update({"item_id":item_id},{$inc:{"q_remaining":-quantity}},function(error,result)
				{
			if(result)
			{
				return true;
			}	
			else
			{
				return false;
			}	
				});
	});
}

function insertBuySell(item_id,quantity,user_id)
{
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);

		var col = mongo.collection('item');
		col.update({"item_id":item_id},{$push:{buyer:{"handle_buyer":user_id,"quantity":quantity,"purchase_date":new Date()}}},function(error,result)
				{
			if(result)
			{
				return true;
			}	
			else
			{
				return false;
			}	
				});
	});
}

function productSold(msg,callback)
{
	var a = true;
	var item_quantity = msg.item_quantity;
	var user_id = msg.user;
	var res = {};

	for(var i =0;i<item_quantity.length;i++)
	{ 
		var item_id = item_quantity[i].item_id;
		var quantity = item_quantity[i].quantity;
		console.log("Item Id "+item_id +" Quantity "+quantity);

		deleteCart(item_id,user_id);
		updateItem(item_id, quantity);
		insertBuySell(item_id, quantity,user_id);
	}
	res.code = "200",
	res.value = user;
	callback(null, res);
}

exports.productSold = productSold;
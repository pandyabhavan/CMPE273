var mongo = require('./mongo');

function getTwoItems(msg,callback)
{
	var res = {};
	console.log('inside getTwoItems');
	res.code = "200";
	res.value=[{"id":1,"name":"Laptop","quantity":30,"first_name":"Bhavan"},{"id":2,"name":"Laptop","quantity":30,"first_name":"Bhavan"}]
	callback(null,res);
}


exports.getTwoItems = getTwoItems;
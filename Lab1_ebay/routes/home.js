var ejs = require("ejs");
var mysql = require("./mysql");

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

exports.getLoginPage = getLoginPage;
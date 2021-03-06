var ejs= require('ejs');
var mysql = require('mysql');
var log = require('./log');

function getConnection(){ 
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'Bhavan@123',
		database : 'ebay',
		port  : 3306 
		});
	return connection;
	
}

 function fetchData(callback,sqlQuery){
	 console.log("\nSQL Query::"+sqlQuery);
	 var connection=getConnection();
	 console.log('Connection established');
	 connection.query(sqlQuery, function(err, rows, fields) {
		 if(err){ 
			 console.log("ERROR: " + err.message);
			 log.warn('Error in query '+err.message);
				
			 callback(err, err.message);
			 }
		 else   {
			 console.log("DB Results:"+rows);
			 callback(err, rows);
			 }
		 }); 
	 	console.log("\nConnection closed.."); 
	 	connection.end();
 	} 
 exports.fetchData=fetchData;
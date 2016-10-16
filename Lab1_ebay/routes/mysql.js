var ejs= require('ejs');
var mysql = require('mysql');
var log = require('./log');

var pool = [],available = [], req = [];
var current_connection;
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

function Pool()
{
    pool = [];
    for(var i=0; i < 50; ++i)
	{
        pool.push(getConnection());
        available.push(i);
	}
}

Pool.prototype.get = function(request_name)
{
	if(available.length > 0)
    {
		var connection = pool[available.length-1];
	    available.pop();
	    current_connection = connection;
	    return available.length;
    }
	else
	{
		req.push(request_name);
		return null;
	}
}

Pool.prototype.release = function(number)
{
	available.push(number);
	if(req.length > 0)
	{
		Pool.get(req[0]);
		req.slice(0,1);
	}
}

var p = new Pool();
function fetchData(callback,sqlQuery){
	 console.log("\nSQL Query::"+sqlQuery);
	 var number = p.get(sqlQuery);
	 var connection = current_connection;
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
	 	p.release(number);
	}


function fetchData_DefaultConnectionPool(callback,sqlQuery) 
{
	mysql.createPool({
		host     : 'localhost',
		user     : 'root',
		password : 'Bhavan@123',
		database : 'ebay',
		port  : 3306 
		});
    mysql.getConnection(function(err,connection){
        if (err) {
		  console.log('Database connection could not be established');
          callback(err,'Database connection could not be established');
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query(sqlQuery, function(err, rows, fields) {
        	console.log(sqlQuery);
    		connection.release();
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
  });
}

 function fetchData_WithoutPool(callback,sqlQuery){
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
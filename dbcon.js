// Database connection.  Will need altered for each user's deployment of the app

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_berneran',
  password        : 'frogger91[OSU]',
  database        : 'cs340_berneran'
});
module.exports.pool = pool;

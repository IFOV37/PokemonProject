// Database connection.  Will need altered for each user's deployment of the app

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_USERNAME',
  password        : '####',
  database        : 'cs340_USERNAME'
});
module.exports.pool = pool;
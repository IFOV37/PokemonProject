// Database connection.  Will need altered for each user's deployment of the app

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_username',
  password        : '####',
  database        : 'cs340_username'
});
module.exports.pool = pool;

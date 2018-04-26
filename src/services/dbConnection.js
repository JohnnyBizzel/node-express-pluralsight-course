var mysql = require('mysql');
var dbConnection = mysql.createConnection({
  host     : 'citytravelling.me.uk',
  port: 3306,
  user     : process.env.MYSQL_USR,
  password : process.env.MYSQL_PASS,
  database : process.env.MYSQL_DB
});
// var dbConnection = mysql.createConnection({
//   host     : 'localhost',
//   user     : process.env.LOCAL_USR,
//   password : process.env.LOCAL_PWD,
//   database : 'c9'
// });
    
dbConnection.connect(function(err) {
    console.log('db connection');
    if (err) throw err;
});

module.exports = dbConnection;
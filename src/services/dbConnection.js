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
// Note the db connection needs to be allowed by my hosting
// Replace the @'localhost' with the glitch aws server link on Remote access

dbConnection.connect(function(err) {
    console.log('db connection');
    if (err) throw err;
});

module.exports = dbConnection;
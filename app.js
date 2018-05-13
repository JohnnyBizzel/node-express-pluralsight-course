var express = require('express');
//var handlebar = require('express-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
require('dotenv').config();
// Set up DB
// console.log('local p: ',process.env.LOCAL_PWD);
// var mysql      = require('mysql');
// // var connection = mysql.createConnection({
// //   host     : 'localhost',
// //   user     : process.env.LOCAL_USR,
// //   password : process.env.LOCAL_PWD,
// //   database : 'c9'
// // });
// var connection = mysql.createConnection({
//   host     : 'citytravelling.me.uk',
//   port: 3306,
//   user     : process.env.MYSQL_USR,
//   password : process.env.MYSQL_PASS,
//   database : process.env.MYSQL_DB
// });



// connection.connect();
 
// connection.query('SELECT * FROM books AS book;', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });
 
// connection.end();
 

var port = 5000;
var nav = [ { Link:'/Books', Text:'Books'}, 
            { Link:'/Authors', Text:'Authors'}];

// pass nav in as a function
var bookRouter = require('./src/routes/bookroutes')(nav);
var adminRouter = require('./src/routes/adminroutes')(nav);
var authRouter = require('./src/routes/authRoutes');
var apiRouter = require('./src/routes/api');

// Set up middleware (app use any static files in this folder)
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'biblioteca', resave: true,  saveUninitialized: true }));

// // error handling middleware
// function errorHandler (err, req, res, next) {
//   if (res.headersSent) {
//     return next(err)
//   }
//   res.status(500)
//   res.render('error', { error: err })
// }


require('./src/config/passport')(app);

app.set('views','./src/views');
app.set('view engine', 'ejs');


app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);
require('./src/routes/api')(app);


app.get('/', function(req, res){
   res.render('index', { title: "hullo EJS", error: null , navig: nav 
   }); 
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  // render the error page
  res.render('index', { error: err , navig: nav});
});

app.listen(process.env.PORT || port, process.env.IP || "0.0.0.0", function(err) {
    if (err) {
        console.log('Error:', err);
        return;
    }
    console.log('running server on port: ', port); 
});
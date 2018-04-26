var mysql = require('mysql');
var dbConnection = require('../services/dbConnection');
// replace some of the code in the Routes to clean that up
var bookController = function(bookService, navig) {
     var middleware = function (req, res, next) {
        //if (!req.user) {
        //res.redirect('/');
        //}
        next();
    };
    
    var getIndex = function(req, res){
        // var connection = mysql.createConnection({
        //   host     : 'localhost',
        //   user     : 'bizzel',
        //   password : '',
        //   database : 'c9'
        // });
        //var connection = dbConnection;
        
        dbConnection.query('SELECT * FROM books AS books;', function (error, results, fields) {
          if (error) throw error;
          res.render('bookListView', { title: "Some Books",  
            navig: navig,
            books: results 
           }); 
        });
        // dbConnection.end();
    };
    
    var getById = function(req, res){
            var id = req.params.id;
            //var connection = dbConnection;
            //connection.connect();
            console.log(' getting book id ',id);
            dbConnection.query('SELECT * FROM `books` AS `book` WHERE id =' + id + ';', 
                function (error, results, fields) {
                    //console.log(results);
                    if (!results) {
                        res.status(404).send('No book found');
                    } else {
                        console.log('found in DB: ', results);
                        bookService.getBookById(results[0].good_reads_id, function(err, book) {
                            if (err) console.log('Error getting book', err);
                            results.book = book;
                            res.render('bookView', { 
                                title: "A Book",  
                                navig: navig,
                                book: results
                            });    
                        });
                        
                        
                    }
                });
            // res.render('bookView', { title: "A Book",  
            //     navig: navig,
            //     book: results
            //   });
            // });
            //dbConnection.end();
        };
    
    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = bookController;
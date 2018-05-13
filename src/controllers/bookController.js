var mysql = require('mysql');
var dbConnection = require('../services/dbConnection');
// replace some of the code in the Routes to clean that up
var bookController = function(bookService, navig) {
     var middleware = function (req, res, next) {
       // TODO : Add authorization
        //if (!req.user) {
        //res.redirect('/');
        //}
        next();
    };
    
    var getIndex = function(req, res){
        
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
          console.log(' getting book id ',id);
          dbConnection.query('SELECT * FROM `books` AS `book` WHERE id =' + id + ';', 
              function (error, results, fields) {
                  //console.log(results);
                  if (!results) {
                      res.status(404).send('No book found');
                  } else {
                      //console.log('found in DB: ', results);
                      bookService.getBookById(results[0].good_reads_id, function(err, book) {
                        if (err) console.log('Error getting book', err);
                        console.log('AUTHORS: ', book.authors);
                        results.book = book;
                        var main_author = '';
                        if (Array.isArray(results.book.authors.author)) {
                          results.book.authors.author.forEach((person) => {
                            main_author += person.name + ', ';
                          });
                          main_author = main_author.slice(0, main_author.length-2);
                        } else {
                          main_author = results.book.authors.author.name;
                        }; 
                        
                        res.render('bookView', { 
                          title: "A Book",  
                          navig: navig,
                          book: results,
                          main_author: main_author
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
  
  // get a list of books owned by the user
    var getBooksForUserId = function(req, res) {
      var sql = 'SELECT `bk`.`good_reads_id`, `bk`.`title`, `usr`.`username` ';
      sql += 'FROM `users` `usr` ';
	    sql += ' JOIN `link_users_books` `lnk` ';
      sql += ' ON `usr`.`uid` = `lnk`.`user_id` ';
	    sql += ' LEFT JOIN `books` `bk` ';
	    sql += ' ON `bk`.`id` = `lnk`.`book_id`' ;
      sql += ' WHERE `lnk`.`user_id` = 1;';
      dbConnection.query(sql, 
              function (error, results, fields) {
                  //console.log(results);
                  if (!results) {
                      res.status(404).send('No books found for user 1');
                  } else {
                      console.log('user books found in DB: ', results);
                    // todo - handle multiple books and create separate view
                     var main_author = '';
                        if (Array.isArray(results.book.authors.author)) {
                          results.book.authors.author.forEach((person) => {
                            main_author += person.name + ', ';
                          });
                          main_author = main_author.slice(0, main_author.length-2);
                        } else {
                          main_author = results.book.authors.author.name;
                        }; 
                    
                      bookService.getBookById(results[0].good_reads_id, function(err, book) {
                          if (err) console.log('Error getting book', err);
                          results.book = book;
                          res.render('bookView', { 
                              title: "A Book",  
                              navig: navig,
                              book: results,
                            main_author: main_author
                          });    
                      });


                  }
              });
    }
    
    return {
      getIndex: getIndex,
      getById: getById,
      getBooksForUserId: getBooksForUserId,
      middleware: middleware
    };
  
};

module.exports = bookController;
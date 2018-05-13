var express = require('express');
var bookRouter = express.Router();

    
var router = function(navig) {
    var bookService =
        require('../services/goodReadsService')();
    
    var bookController = require('../controllers/bookController')(bookService, navig);
    
    bookRouter.use(bookController.middleware);
    
    // Set up DB

    /* Authorization for all routes (moved to controller) */
    // bookRouter.use(function (req, res, next) {
    //     if (!req.user) {
    //         res.redirect('/');
    //     } else {
    //         next();    
    //     }
    // });

    
    bookRouter.route('/')
      .get(bookController.getIndex);

    bookRouter.route('/user1')
      .get(bookController.getBooksForUserId);
  
    bookRouter.route('/:id')
      .get(bookController.getById);
  
    // bookRouter.route('/mybooks')     
    //     .get(function (req, res){
    //         res.render('myBooks');
    //     });
  

        
    return bookRouter;
};


module.exports = router;
var express = require('express');
var bookRouter = express.Router();

    
var router = function(navig) {
    var bookService =
        require('../services/goodReadsService')();
    
    var bookController = require('../controllers/bookController')(bookService, navig);
    
    bookRouter.use(bookController.middleware);
    
    // // dummy books list for testing
    // var libraryBooks = [
    // {
    //     title: "War and Peace",
    //     author: "Lev Tolstoy",
    //     read: false
    // },
    // {
    //     title: "Martin Chuzzlewit",
    //     author: "Charles Dickens",
    //     read: false
    // },
    // {
    //     title: "Charlie and the Chocolate Factory",
    //     author: "Roald Dahl",
    //     read: true
    // }];
    
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
    
    bookRouter.route('/:id')
        .get(bookController.getById);
        
    return bookRouter;
};


module.exports = router;
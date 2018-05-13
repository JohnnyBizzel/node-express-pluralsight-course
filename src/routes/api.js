var express = require('express');
// var apiRouter = express.Router();

    
module.exports = (app) => {
//     var bookService =
//         require('../services/goodReadsService')();
    
//     var bookController = require('../controllers/bookController')(bookService, navig);
    
  
  // ++++++ for authorization (not needed here) +++++
//     apiRouter.use(bookController.middleware);
   
  app.get('/api', function (req, res) {
     console.log('mybooks route test ++++++++');
    res.send(200, 'My Books');
  });
  
  app.get('/api/mybooks', function (req, res){
      console.log('mybooks route ++++++++');
            res.render('myBooks', { books : [ { one: 'one'}, {one : 'etc' }]  } );
        });
  
};

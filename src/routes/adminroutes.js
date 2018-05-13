var express = require('express');
var adminRouter = express.Router();
// var mongoDb = require('mongodb').MongoClient;

var router = function(nav) {
    adminRouter.route('/addBooks')
        .get(function (req, res){
            
            /* IF using Mongo DB... */
            // var url = 'mongodb://localhost:27017/library';
            // mongoDb.connect(url, function(err, db) {
            //   if (err) console.log(err);
            //   var collection = db.collection('books');
            //   collection.insertMany(myBooks, function(err, results) {
            //       if (err) console.log(err);
            //         res.send(results);
            //         db.close();
            //   });

            // });
            // TODO
            res.send('insert book into Db');
        });
    return adminRouter;
};

module.exports = router;
var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function() {
    authRouter.route('/signup')
        .post(function (req, res){
            // passport login function
            // using MongoDb
            var url = 'mongodb://jonathan:P4ssw0rd1@ds151014.mlab.com:51014/node-express-plural';
            mongodb.connect(url, function(err, db) {
                if (err) { console.log(err); return; }
                var collection = db.collection('users');
                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };
                // TODO: select if user exists then insert
                collection.insert(user, function(err, results) {
                    if (err) { console.log(err); return; }
                    req.login(results.ops[0], function() {
                        res.redirect('/auth/profile');
                    });        
                });
            });
            
            
        });
    authRouter.route('/signin')
        .post(passport.authenticate('local', { // tell passport what strategy to use
            failureRedirect: '/'
        }), function(req, res){
            res.redirect('/auth/profile');
        });
    authRouter.route('/profile')
        .all(function (req, res, next) {
            // Authorization - if no user, don't show. Redirect back.
            // .all is used for this one route
            // see bookRouter for alternative
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function (req, res){
            res.json(req.user);
        });
    return authRouter;
};
module.exports = router();
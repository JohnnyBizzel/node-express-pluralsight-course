var passport  = require('passport'),
    LocalStrategy = require("passport-local").Strategy,
    mongodb = require("mongodb").MongoClient;
    

module.exports = function() {
    console.log('looking Local strategy');
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    function(username, password, done){
        /* check Db here */
        var url = 'mongodb://jonathan:P4ssw0rd1@ds151014.mlab.com:51014/node-express-plural';
        
        mongodb.connect(url, function(err, db) {
                if (err) { console.log(err); return; }
                var collection = db.collection('users');
                collection.findOne({ username: username},
                    function(err, results) {
                        if (err) { console.log(err); return; }
                        if (password && results.password === password) {
                            var user = results;
                            done(null , user);                        
                        } else {
                            done(null, false); // no error but pass no user.
                            // this causes a redirect back to the homepage.
                        }
                            
                });        
        });
    }));
};
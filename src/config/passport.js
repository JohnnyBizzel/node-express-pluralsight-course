var passport  = require('passport');


module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser(function(user, done){
       done(null, user);
       // done(null, user.id); /* Normally get database key id */
    });

    /* in Real life... */
    // passport.deserializeUser(function(userId, done){
    //     /* DB command find by ID... */
    //   done(null, user); // return found user
    // });
    
    passport.deserializeUser(function(user, done){
        done(null, user); // return found user
    });
    
    require('./strategies/local.strategy')();
};
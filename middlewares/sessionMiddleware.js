const session = require('express-session');

const sessionMiddleware = session({ 
    secret: '12345', 
    resave: true, 
    saveUninitialized: true 
});

module.exports = sessionMiddleware;
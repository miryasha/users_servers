const expressJwt = require('express-jwt');
require('dotenv').config();



function jwt() {
    const secret = process.env.TOKEN_SECRET;
    
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/login/authenticate',
            '/createuserstbl',
            '/register/create',
            '/register/update',
            '/register/updatepass',
            '/register/getall',
            '/register/getuserbyemail',
            '/register/update',
            '/register/deleteuser',          
            
        ]
    });
}

module.exports = jwt;

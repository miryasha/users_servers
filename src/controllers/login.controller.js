const express = require('express');
const router = express.Router();
const auth = require('../_helper/auth');



router.post('/authenticate',  authenticate)
 

function authenticate(req, res, next) {
    auth.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next)
}
  

// const result = await model.login.findUser(username, password);
// const user = (await result).user;
      
// if( user !== undefined ){
//      const token = jwt.sign({ sub : user }, secret , { expiresIn: '1d' });
//      return  { user : user, token: token , result: true}
// } else {
   
//    return {result: false ,  message : "Data is not match"}
// }     

module.exports = router;
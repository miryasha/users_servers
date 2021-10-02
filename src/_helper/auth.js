const model = require("../models");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('dotenv').config();

const secret = process.env.TOKEN_SECRET;
const expires = process.env.JWT_EXPIRES

async function authenticate({ username, password }) {
    
       const result = await model.login.findUser(username, password);
       const user = (await result).user;
       const position = (await result).position;
      
       if( user !== undefined ){
            const token = jwt.sign({ sub : user }, secret , { expiresIn: expires });
            return  { user : user, token: token , result: true , position: position}
      } else {
          
          return {result: false ,  message : "Data does not match"}
      }     
     
}

module.exports = { authenticate };
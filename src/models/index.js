const connection = require('../config/dataBase.config');


const Createuserstbl = require("./createUsersTbl.model")
const Login = require('./login.model');
const Register = require("./register.model");


module.exports = {
  
  login: new Login(connection),
  register: new Register(connection),
  createuserstbl : new Createuserstbl(connection),
  
  
  }
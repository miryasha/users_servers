const model = require("../models");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
require('dotenv').config();



router.post('/create' , create)
router.get('/getall' , getAll)
router.post('/getuserbyemail' , getUserByEmail)
router.put('/update' , update)
router.put('/updatepass' , updatepass)
router.delete('/deleteuser' , deleteUser)


function create (req, res) { 
    

    const { username, email, password } =  req.body;
    
    // Encrypt pass
    const encryptPass = CryptoJS.AES.encrypt( password , process.env.PASS_HASH_USER ).toString();
     
   model.register.insert({ username, email, password: encryptPass})
    .then(() => {
        res.send( {message: "You Are Successfully Registered" } )
        res.status(201)
        .end()
    })
    .catch(err => {
        console.log(err)
        res.send( { message: "Somthing went wrong on registeration!!" })
        res.status(500)
        .end()
         
    })
       
 }

 function getAll (req, res) { 
       
   model.register.getAll()
    .then((users) => {
        res.send(users)
        res.status(201)
        .end()
    })
    .catch(err => {
        console.log(err)
        res.send( { message: "Somthing went wrong !!" })
        res.status(500)
        .end()
         
    })
       
 }



 function getUserByEmail (req, res) { 
    

    const {email} =  req.body;
     
   model.register.geUserByEmail(email)
    .then((user) => {
        res.send(user)
        res.status(201)
        .end()
    })
    .catch(err => {
        console.log(err)
        res.send( { message: "Somthing went wrong on registeration!!" })
        res.status(500)
        .end()
         
    })
       
 }


 function update (req, res) { 
    

    const { user_id, username, email, password, position} =  req.body;
    
    // Encrypt pass
    const encryptPass = CryptoJS.AES.encrypt( password , process.env.PASS_HASH_USER ).toString();
     
   model.register.updateById({user_id, username, email, password: encryptPass, position})
    .then(() => {
        res.send( {message: "You information updated" } )
        res.status(201)
        .end()
    })
    .catch(err => {
        console.log(err)
        res.send( { message: "Somthing went wrong on updateing!!" })
        res.status(500)
        .end()
         
    })
       
 }

 function updatepass (req, res) { 
    

    const { email, password } =  req.body;
    
    // Encrypt pass
    const encryptPass = CryptoJS.AES.encrypt( password , process.env.PASS_HASH_USER ).toString();
     
   model.register.updateByEmail( { email, password: encryptPass })
    .then(() => {
        res.send( {message: "Your pass has updated" } )
        res.status(201)
        .end()
    })
    .catch(err => {
        console.log(err)
        res.send( { message: "Somthing went wrong on updateing!!" })
        res.status(500)
        .end()
         
    })
       
 }


 function deleteUser (req, res) { 
    

    const { user_id } =  req.body;
         
   model.register.delelteById(user_id)
    .then(() => {
        res.send( {message: "User deleted" } )
        res.status(201)
        .end()
    })
    .catch(err => {
        console.log(err)
        res.send( { message: "Somthing went wrong on registeration!!" })
        res.status(500)
        .end()
         
    })
       
 }

module.exports = router
const model = require("../models");
const express = require('express');
const router = express.Router();




router.get('/',  create)
 

function create (req, res) { 

      
   model.createuserstbl.create()
    .then(() => {
        res.send( {message: "You Successfully created a user table" } )
        res.status(201)
        .end()
    })
    .catch(err => {
        console.log(err)
        res.send( { message: "Somthing went wrong on createing table!!" })
        res.status(500)
        .end()
         
    })
       
 }

module.exports = router;
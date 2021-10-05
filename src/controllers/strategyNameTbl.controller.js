const model = require("../models");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
require('dotenv').config();

//time_frame_tbl
//======
router.post('/create' , createing)
router.get('/strategy', getAll)
router.put('/strategy/:strategy' , updating)
router.delete('/strategy/:strategy' , deleting)


function createing (req, res) { 


    const { strategy_name, description, setup, database_name , 
        host, port, user, password  } =  req.body;

        // Encrypt database_name
    //const encryptDatabase_name = CryptoJS.AES.encrypt( database_name , process.env.PASS_HASH_DATABASE ).toString();
    // Encrypt host
    //const encryptHost = CryptoJS.AES.encrypt( host , process.env.PASS_HASH_DATABASE ).toString();
    // Encrypt password
    //const encryptPassword = CryptoJS.AES.encrypt( password , process.env.PASS_HASH_DATABASE ).toString(); 
    

    model.resultApi.create()
    .then(()=>{
        model.strategyNameTbl.insert({strategy_name, description, setup, database_name: database_name  , 
            host: host, port, user, password:password})
    })
    .then(() => {
        res.send( {message: "Your time Strategy successfully added" } )
        res.status(201)
        .end()
    })
    .catch(err => {
        console.log(err)
        res.send( { err : err })
        res.status(500)
        .end()
         
    })
       
 }

 function getAll (req, res) {   
    
    
    model.resultApi.getAllStrategies()
    .then((strategy) => {
        res.json(strategy)
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



 function updating (req, res) { 

    const { strategy_name, description, setup, database_name, host, port, user, password, strategy_name_id } =  req.body;   
   
    model.resultApi.updateStategyById( strategy_name, description, setup, database_name, host, port, user, password, strategy_name_id)
    .then(() => {
        res.send( {message: "Your data updated successfully" } )
        res.status(201)
        .end()
    })
    .catch(err => {
        console.log(err)
        res.send( { message: "Somthing went wrong!!" })
        res.status(500)
        .end()
         
    })
       
 }


 function deleting (req, res) { 


    const {strategy_name_id } =  req.body;
    
     
    model.resultApi.deleteById(strategy_name_id)
    .then(() => {
        res.send( {message: "Your data deleted " } )
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


module.exports = router
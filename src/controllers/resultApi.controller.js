const model = require("../models");
const router = require("express").Router();




router.get('/strategy/:strategy/:status/:by' , get)


function get(req, res) {   
    const { strategy, status, by } =  req.params; 
     
    model.resultApi.get(strategy ,{status:status, by:by})
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


 function getBySymbol (req, res) {   
    const { strategy, symbol } =  req.params; 
    
    model.resultApi.getBySymbol( strategy, symbol)
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


module.exports = router
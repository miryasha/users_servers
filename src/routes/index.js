const controllers = require("../controllers");
const router = require("express").Router();
const limiter = require("../config/apiLimiter.confic");
const jwt = require('../_helper/jwt');




router.use(jwt())





router.use("/createuserstbl", controllers.createUsersTbl);

//Login routes
/////================
router.use("/register",limiter.apiLimiterApi, controllers.register);
router.use("/login", controllers.login);




 module.exports = router;
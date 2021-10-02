'use strict'

const express = require("express");
const errorHandler = require("./src/_helper/erroe-handler");
const cors = require('cors');

const corsOptions = require('./src/config/cors.config');
const routes = require("./src/routes")

const app = express();
const PORT = process.env.PORT || 3022;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(cors(corsOptions))



// Routes
app.use(routes)


// global error handler
//============================
app.use(errorHandler);

// Starts the server to begin listening
// =============================================================

app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
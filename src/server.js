const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv')
const connectDB = require('./config/db');
const commonMiddlewares = require('./middlewares/commonMiddlewares');
//Dotenv configuration
dotenv.config();

// Connect to Database
connectDB();

// REST API Object
const app = express();

// Apply middlewares
commonMiddlewares(app);

//Routes
app.use("/api/v1/auth", require("./routes/userRoutes"));
/* 
add more routes as needed for each schema. e.g.
app.use("/api/v1/places", require("./routes/placeRoutes"));
*/


// Home route (sample)
app.get("/",(req,res)=>{
    res.status(200).send({
        "success":true,
        "message":"Node Server is Running".bgGreen.white
    })
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`.bgGreen.white);
})
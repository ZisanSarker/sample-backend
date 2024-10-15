const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.mongoURL);
        console.log(`Connected to Database: ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log(`Error in connecting to Database: ${error}`.bgRed.white)
    }
};

module.exports  = connectDB;
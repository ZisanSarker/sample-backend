const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    if (!process.env.mongoURL) {
        console.error('MongoDB connection string is missing!'.bgRed.white);
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to Database: ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log(`Error in connecting to Database: ${error.message}`.bgRed.white);
        process.exit(1); // Exit application with error code 1 in case of failure to connect to database.
    }

    mongoose.connection.on('connected', () => {
        console.log('Database connected'.bgGreen.white);
    });

    mongoose.connection.on('error', (err) => {
        console.error(`Database connection error: ${err.message}`.bgRed.white);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Database connection disconnected'.bgYellow.white);
    });

    mongoose.connection.on('reconnected', () => {
        console.log('Database reconnected'.bgGreen.white);
    });

    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('Database connection closed due to application termination'.bgYellow.white);
        process.exit(0);
    });
};

module.exports = connectDB;

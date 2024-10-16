const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const commonMiddlewares = (app) => {
    // CORS Middleware
    app.use(cors());

    // Logger Middleware
    app.use(morgan('dev'));

    // Body Parser Middleware
    app.use(express.json());

}

module.exports = commonMiddlewares;
const express = require('express');

const routes = require('../../routes');

const createServer = () => {
    // General setup
    const app = express();
    
    // Setup Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/', routes);

    return app;
};


module.exports = createServer;
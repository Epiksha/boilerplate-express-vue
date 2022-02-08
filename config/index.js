require('dotenv').config();

const database = require('./database');
const server = require('./server');
const swagger = require('./swagger');

module.exports = {
    ...database,
    ...server,
    ...swagger,
};
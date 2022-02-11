const path = require('path');
require('dotenv').config({ path: path.join(__dirname, `./env/.${process.env.NODE_ENV}.env`) });

const database = require('./database');
const server = require('./server');
const swagger = require('./swagger');

module.exports = {
    ...database,
    ...server,
    ...swagger,
};
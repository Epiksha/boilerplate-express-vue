const express = require('express');
const compression = require('compression');
const cors = require('cors');

const { PORT, CORS_HEADERS } = require('./config');
const routes = require('./routes');

require('./services/Database.service');

// General setup
const app = express();

// Setup Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(CORS_HEADERS));
app.use(compression());
app.use(express.static('public'));
app.use('/', routes);

app.listen(PORT, console.log('Server has started'));
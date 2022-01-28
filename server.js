const express = require('express');
const compression = require('compression');
const cors = require('cors');
const handlebars = require('hbs');

const { PORT, CORS_HEADERS } = require('./config');
const routes = require('./routes');

require('./services/Database.service');

// General App Setup
const app = express();

app.set('view engine', 'hbs');
app.set('views', './handlebars');

// Setup Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(CORS_HEADERS));
app.use(compression());
app.use(express.static('public'));
app.use('/', routes);

app.listen(PORT, console.log(`Express app running on port ${PORT}`));
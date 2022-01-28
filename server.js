const express = require('express');
const compression = require('compression');
const cors = require('cors');

const { PORT, CORS_HEADERS } = require('./config');
const routes = require('./routes');

require('./services/Database.service');

const app = express();

// Setup Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(CORS_HEADERS));
app.use(compression());
app.use('/', routes);

app.listen(PORT, console.log(`Express app running on port ${PORT}`));
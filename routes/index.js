const { Router } = require('express');
const swaggerDocs = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const { SWAGGER_OPTIONS } = require('../config');

// General router setup
const router = Router();
const apiDocs = swaggerDocs(SWAGGER_OPTIONS);

// API Routes
router.use('/api/users', userRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/docs', swaggerUI.serve, swaggerUI.setup(apiDocs));

module.exports = router;
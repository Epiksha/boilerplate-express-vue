const { Router } = require('express');
const userRoutes = require('./user.route');

const router = Router();

// API Routes
router.use('/api/users', userRoutes);

module.exports = router;
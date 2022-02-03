const { Router } = require('express');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');

const router = Router();

// Frontend Routing
/* router.get('/', (request, response) => {
    response.render('base');
}); */

// API Routes
router.use('/api/users', userRoutes);
router.use('/api/auth', authRoutes);

module.exports = router;
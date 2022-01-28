const { Router } = require('express');
const userRoutes = require('./user.route');

const router = Router();

// Frontend Routing
router.get('/', (request, response) => {
    response.render('base');
});

// API Routes
router.use('/api/users', userRoutes);

module.exports = router;
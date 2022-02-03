const { Router } = require('express');

const AuthController = require('../controllers/Auth.controller');
const { AuthValidator } = require('../middleware/validators');

const router = Router();

router.post('/token', AuthValidator.validateLogin, AuthController.createToken);
router.post('/validate', AuthValidator.validateToken, AuthController.validate);

module.exports = router;
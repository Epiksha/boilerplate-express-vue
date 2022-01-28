const { Router } = require('express');

const UserController = require('../controllers/User.controller');
const { UserValidator } = require('../libs/validators');

const router = Router();

router.post('/', UserValidator.validateCreate, UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserValidator.validateGet, UserController.getUser);
router.patch('/:id', UserValidator.validateUpdate, UserController.updateUser);
router.delete('/:id', UserValidator.validateDelete, UserController.deleteUser);

module.exports = router;
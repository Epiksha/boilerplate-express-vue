const { Router } = require('express');

const UserController = require('../controllers/User.controller');
const { UserValidator } = require('../middleware/validators');

const router = Router();

/**
 * @swagger
 * /api/users:
 *    post:
 *      tags:
 *        - Users
 *      description: Creates a user and return details along with token
 *      parameters:
 *        - name: email
 *          in: body
 *          description: User's email address
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *            example: myemail@test.com
 *        - name: first_name
 *          in: body
 *          description: User's first name
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *            example: John
 *        - name: last_name
 *          in: body
 *          description: User's last name / surname
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *            example: Smith
 *        - name: password
 *          in: body
 *          description: User's password
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *            example: helloworld123
 *      responses:
 *        '200':
 *          description: Successfully created user
 *        '500':
 *          description: Failed to create user
 *    get:
 *      tags:
 *        - Users
 *      description: Returns all users
 *      responses:
 *        '200':
 *          description: Successfully accessed Users collection
 *        '500':
 *          description: Failed to access Users collection
*/
router.post('/', UserValidator.validateCreate, UserController.createUser);
router.get('/', UserController.getAllUsers);

/**
 * @swagger
 * /api/users/:id:
 *    get:
 *      tags:
 *        - Users
 *      description: Returns details of specific user
 *      parameters:
 *        - name: id
 *          in: path
 *          description: User's id
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *            example: 23
 *      responses:
 *        '200':
 *          description: Successfully accessed user document
 *        '500':
 *          description: Failed to retrieve user information
 *    patch:
 *      tags:
 *        - Users
 *      description: Updates details of a specific user, at least one property must be passed in.
 *      parameters:
 *        - name: email
 *          in: body
 *          description: User's email address
 *          schema:
 *            type: string
 *            format: string
 *            example: myemail@test.com
 *        - name: first_name
 *          in: body
 *          description: User's first name
 *          schema:
 *            type: string
 *            format: string
 *            example: John
 *        - name: last_name
 *          in: body
 *          description: User's last name / surname
 *          schema:
 *            type: string
 *            format: string
 *            example: Smith
 *        - name: password
 *          in: body
 *          description: User's password
 *          schema:
 *            type: string
 *            format: string
 *            example: helloworld123
 *      responses:
 *        '200':
 *          description: Successfully updated user
 *        '500':
 *          description: Failed to update user information
 *    delete:
 *      tags:
 *        - Users
 *      description: Deletes a specific user from the Users collection
 *      parameters:
 *        - name: id
 *          in: path
 *          description: User's id
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *            example: 23
 *      responses:
 *        '200':
 *          description: Successfully deleted user
 *        '500':
 *          description: Failed to delete user
*/
router.get('/:id', UserValidator.validateGet, UserController.getUser);
router.patch('/:id', UserValidator.validateUpdate, UserController.updateUser);
router.delete('/:id', UserValidator.validateDelete, UserController.deleteUser);

module.exports = router;
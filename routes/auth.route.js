const { Router } = require('express');

const AuthController = require('../controllers/Auth.controller');
const { AuthValidator } = require('../middleware/validators');

const router = Router();

/**
 * @swagger
 * /api/auth/token:
 *    post:
 *      tags:
 *        - Auth
 *      description: Create and return a new JWT token
 *      parameters:
 *        - name: email
 *          in: body
 *          description: User's email address
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *            example: myemail@test.com
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
 *          description: Successfully validated details and created token, returns token
 *        '500':
 *          description: Failed to validate details and create token
*/
router.post('/token', AuthValidator.validateLogin, AuthController.createToken);

/**
 * @swagger
 * /api/auth/validate:
 *    post:
 *      tags:
 *        - Auth
 *      description: Check if JWT token is valid
 *      parameters:
 *        - name: token
 *          in: header
 *          description: User's current JWT token
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *            example: "Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *      responses:
 *        '200':
 *          description: Token successfully validated
 *        '500':
 *          description: Failed to validate token
*/
router.post('/validate', AuthValidator.validateToken, AuthController.validate);

module.exports = router;
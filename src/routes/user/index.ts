import express from 'express';
import User from '../../controllers/user';

const router = express.Router();

/**
 * @swagger
 *  /user/{userId}:
 *    get:
 *      summary: Retrieve a unique user by id
 *      description: Show user data
 *      tags:
 *      - User
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    enum: ["success", "error"]
 *                  data:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                      role:
 *                        type: string
 *                      token:
 *                        type: string
 */
router.get('/api/v1/user/:userId', User.show);

/**
 * @swagger
 * /user:
 *    post:
 *      summary: Create a new user
 *      consumes:
 *        - application/json
 *      requestBody:
 *        content:
*           application/json:
*             schema:
*               type: object
*               required:
*                 - email
*                 - password
*                 - passwordConfirm
*               properties:
*                 email:
*                   type: string
*                 password:
*                   type: string
*                 passwordConfirm:
*                   type: string
 *      tags:
 *      - User
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    enum: ["success", "error"]
 *                  message:
 *                    type: string
 *                  data:
 *                    type: object
 *                    properties:
 *                      token:
 *                        type: string
 */
router.post('/api/v1/user', User.create);

export default router;

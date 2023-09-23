import express from 'express';
import Auth from '../../controllers/auth';
import auth from '../../middleware/auth';

const router = express.Router();

/**
 * @swagger
 *  /auth/login:
 *    post:
 *      summary: Authenticate for an auth token
 *      consumes:
 *        - application/json
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Credentials'
 *      tags:
 *      - Auth
 *      responses:
 *        200:
 *         description: Returns jwt
 */
router.post('/api/v1/auth/login', Auth.login);

router.post('/api/v1/auth/me/logout', auth, Auth.logout);

// router.post("/api/v1/users/me/logoutall", auth, Auth.logoutAll);

export default router;

import { Router } from "express";
import { login, logout } from "../controllers/authController";

const authRouter = Router();
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login to the system.
 *     description: Login to the system.
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The name of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Internal server error
 */
authRouter.post("/login",login)
/**
 * @swagger
 * /api/auth/logout:
 *   delete:
 *     summary: Logout from system.
 *     description: Logout from system.
 *     tags:
 *       - Auth
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Internal server error
 */
authRouter.delete("/logout",logout)

export default authRouter;

import { NextFunction, Router } from 'express';
import {
  createUser,
  getAllClases,
  getStudentOne,
  getStudents
} from '../controllers/userController';
import verifyUser from '../middleware/verifidUser';

const userRouter = Router();
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Register to the system.
 *     description: Register to the system.
 *     tags:
 *       - Users
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
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *               roll:
 *                 type: string
 *     examples:
 *       example1:
 *         summary: Example user data.
 *         value:
 *           username: "john_doe"
 *           password: "password123"
 *           email: "joon@abstract.com"
 *           roll: "teacher"
 *           className: "english"
 *     responses:
 *       '201':
 *         description: User registered successfully.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 */
userRouter.post('/', createUser);
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get
 *     description: Retrieve a single user from the system using their ID.
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: A single student object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID.
 *                 username:
 *                   type: string
 *                   description: The user's username.
 *                 email:
 *                   type: string
 *                   description: The user's email address.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
userRouter.get('/', verifyUser as any, getStudents as unknown as NextFunction);
/**
 * @swagger
 * /user/clases:
 *   get:
 *     summary: Get all available classes
 *     description: Retrieve a list of all classes.
 *     tags:
 *       - Classes
 *     responses:
 *       '200':
 *         description: A list of available classes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the class.
 *                   name:
 *                     type: string
 *                     description: The name of the class.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.get("/clases",getAllClases)
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get
 *     description: Retrieve a single user from the system using their ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single student object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID.
 *                 username:
 *                   type: string
 *                   description: The user's username.
 *                 email:
 *                   type: string
 *                   description: The user's email address.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
userRouter.get("/:id",verifyUser as any,getStudentOne as unknown as NextFunction)


export default userRouter;

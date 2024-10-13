import { Router } from "express";

import { addGradeToStudent,  getAvarage, getStudentGrade, getStudentGradeByTeacher, updateGrade } from "../controllers/gradsController";

const GradsRouter = Router();
/**
 * @swagger
 * /grads:
 *   post:
 *     summary: add a new grade to the student
 *     description: Add a new comment to a specific post by its ID.
 *     tags:
 *       - Grads
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to which the comment will be added.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the comment.
 *               author:
 *                 type: string
 *                 description: The ID of the author (user) of the comment.
 *     responses:
 *       '201':
 *         description: Comment added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment added successfully"
 *                 comment:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     author:
 *                       type: string
 *       '400':
 *         description: Bad request.
 *       '404':
 *         description: Post not found.
 *       '500':
 *         description: Internal server error.
 */
GradsRouter.post("/",addGradeToStudent );
/**
 * @swagger
 * /grads:
 *   put:
 *     summary: Update a grade
 *     description: Update an existing post by its ID.
 *     tags:
 *       - Grads
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the post.
 *               content:
 *                 type: string
 *                 description: The updated content of the post.
 *     responses:
 *       '200':
 *         description: Post updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post updated successfully"
 *       '400':
 *         description: Bad request.
 *       '404':
 *         description: Post not found.
 *       '500':
 *         description: Internal server error.
 */
GradsRouter.put("/", updateGrade);
/**
 * @swagger
 * /grads/student:
 *   get:
 *     summary: Get 
 *     description: Retrieve a single user from the system using their ID.
 *     tags:
 *       - Grads
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single user object.
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
 *                 profile:
 *                   type: object
 *                   properties:
 *                     bio:
 *                       type: string
 *                       description: The bio of the user.
 *                     socialLinks:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: The social links of the user.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time the user was created.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
GradsRouter.get("/student", getStudentGrade);
/**
 * @swagger
 * /grads/teacher:
 *   get:
 *     summary: Get 
 *     description: Retrieve a single user from the system using their ID.
 *     tags:
 *       - Grads
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single user object.
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
 *                 profile:
 *                   type: object
 *                   properties:
 *                     bio:
 *                       type: string
 *                       description: The bio of the user.
 *                     socialLinks:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: The social links of the user.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time the user was created.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
GradsRouter.get("/teacher", getStudentGradeByTeacher);
/**
 * @swagger
 * /grads/ava:
 *   get:
 *     summary: Get 
 *     description: Retrieve a single user from the system using their ID.
 *     tags:
 *       - Grads
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single user object.
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
 *                 profile:
 *                   type: object
 *                   properties:
 *                     bio:
 *                       type: string
 *                       description: The bio of the user.
 *                     socialLinks:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: The social links of the user.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time the user was created.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
GradsRouter.get("/ava", getAvarage);

export default GradsRouter;

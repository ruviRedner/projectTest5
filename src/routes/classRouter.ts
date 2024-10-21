import { NextFunction, Router } from "express";
import verifyUser from "../middleware/verifidUser";
import { addGradeToStudent, getAva, getStudentGrade, getStudentScoreByTeacher, updateGrade } from "../controllers/classController";

const classRouter = Router()

/**
 * @swagger
 * /class/{sid}/{subject}:
 *   post:
 *     summary: Add grade to student
 *     description: Add a new grade for a specific subject of the authenticated student.
 *     tags:
 *       - Grades
 *     parameters:
 *       - in: path
 *         name: sid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student to whom the grade is being added.
 *       - in: path
 *         name: subject
 *         required: true
 *         schema:
 *           type: string
 *         description: The subject for which the grade is being added.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *                 description: The score to be added to the student.
 *                 example: 95
 *     responses:
 *       '201':
 *         description: Successfully added the score to the student.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: add score done
 *       '400':
 *         description: Bad request, invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input data
 *       '401':
 *         description: Unauthorized, the student is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
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

classRouter.post("/:sid/:subject",verifyUser as any,addGradeToStudent as unknown as NextFunction)

/**
 * @swagger
 * /class/{sid}/{subject}:
 *   put:
 *     summary: Update student's grade
 *     description: Update the grade for a specific subject of the authenticated student.
 *     tags:
 *       - Grades
 *     parameters:
 *       - in: path
 *         name: sid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student whose grade is being updated.
 *       - in: path
 *         name: subject
 *         required: true
 *         schema:
 *           type: string
 *         description: The subject for which the grade is being updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *                 description: The new score to be added.
 *                 example: 90
 *     responses:
 *       '201':
 *         description: Successfully updated the student's grade.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: add score done
 *       '400':
 *         description: Bad request, invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input data
 *       '401':
 *         description: Unauthorized, the student is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
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

classRouter.put("/:sid/:subject",verifyUser as any, updateGrade as unknown as NextFunction)
/**
 * @swagger
 * /class/average:
 *   get:
 *     summary: Get student's average grade
 *     description: Retrieve the average grade of the authenticated student.
 *     tags:
 *       - Grades
 *     responses:
 *       '200':
 *         description: Successfully retrieved the student's average grade.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 average:
 *                   type: number
 *                   description: The average grade of the student.
 *                   example: 82.5
 *       '401':
 *         description: Unauthorized, the student is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
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

classRouter.get("/average",verifyUser as any , getAva as unknown as NextFunction)
/**
 * @swagger
 * /class/studentScore:
 *   get:
 *     summary: Get student's grade
 *     description: Retrieve the grade of the authenticated student.
 *     tags:
 *       - Grades
 *     responses:
 *       '200':
 *         description: Successfully retrieved the student's grade.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 studentGrade:
 *                   type: number
 *                   description: The grade of the student.
 *                   example: 85
 *       '401':
 *         description: Unauthorized, the student is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
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

classRouter.get("/studentScore",verifyUser as any,getStudentGrade as unknown as NextFunction)
/**
 * @swagger
 * /class/studentScoreByTeacher/{sid}:
 *   get:
 *     summary: Get student's score by teacher
 *     description: Retrieve the score of a specific student, requested by the authenticated teacher.
 *     tags:
 *       - Scores
 *     parameters:
 *       - in: path
 *         name: sid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student whose score is being requested.
 *     responses:
 *       '200':
 *         description: Successfully retrieved the student's score.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 studentGrade:
 *                   type: number
 *                   description: The grade of the student.
 *                   example: 85
 *       '400':
 *         description: Bad request, invalid student ID or parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid student ID
 *       '401':
 *         description: Unauthorized, the teacher is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
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
classRouter.get("/studentScoreByTeacher/:sid",verifyUser as any,getStudentScoreByTeacher as unknown as NextFunction)












export default classRouter

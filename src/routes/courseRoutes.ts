import { Router } from 'express';
import * as courseController from '../controllers/courseController';
import { authenticate, authorize } from '../middlewares/auth';
import { Role } from '../models/User';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', courseController.getCourses);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a course (Admin only)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authorize([Role.ADMIN]), courseController.createCourse);

/**
 * @swagger
 * /api/courses/{id}/enroll:
 *   post:
 *     summary: Enroll a student into a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 */
router.post('/:id/enroll', authorize([Role.ADMIN]), courseController.enrollStudent);

/**
 * @swagger
 * /api/courses/{id}/students:
 *   get:
 *     summary: Get students in a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id/students', authorize([Role.ADMIN]), courseController.getEnrolledStudents);

export default router;

import { Router } from 'express';
import * as attendanceController from '../controllers/attendanceController';
import { authenticate, authorize } from '../middlewares/auth';
import { Role } from '../models/User';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/attendance:
 *   post:
 *     summary: Mark attendance for a student (Admin only)
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authorize([Role.ADMIN]), attendanceController.markAttendance);

/**
 * @swagger
 * /api/attendance/student/{studentId}:
 *   get:
 *     summary: Get attendance for a specific student
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 */
router.get('/student/:studentId', attendanceController.getStudentAttendance);

/**
 * @swagger
 * /api/attendance/report:
 *   get:
 *     summary: Get monthly report for a course
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 */
router.get('/report', authorize([Role.ADMIN]), attendanceController.getMonthlyReport);

export default router;

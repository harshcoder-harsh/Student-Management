import { Router } from 'express';
import * as studentController from '../controllers/studentController';
import { authenticate, authorize } from '../middlewares/auth';
import { Role } from '../models/User';
import { upload } from '../middlewares/upload';

const router = Router();

// Protect all student routes
router.use(authenticate);

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', studentController.getStudents);
router.get('/:id', studentController.getStudent);

// Only admins can update or delete
router.put('/:id', authorize([Role.ADMIN]), studentController.updateStudent);
router.delete('/:id', authorize([Role.ADMIN]), studentController.deleteStudent);

// Upload profile image
router.post('/:id/upload', authorize([Role.ADMIN, Role.STUDENT]), upload.single('image'), studentController.uploadImage);

export default router;

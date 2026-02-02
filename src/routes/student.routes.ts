import { Router } from 'express';
import { StudentController } from '../controllers/student.controller';

const router = Router();
const studentController = new StudentController();

router.post('/', studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

export default router;

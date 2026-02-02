import { Request, Response, NextFunction } from 'express';
import { StudentService } from '../services/student.service';
import { AppError } from '../utils/AppError';

export class StudentController {
    private studentService: StudentService;

    constructor() {
        this.studentService = new StudentService();
    }

    createStudent = (req: Request, res: Response, next: NextFunction) => {
        try {
            const student = this.studentService.createStudent(req.body);
            res.status(201).json({
                status: 'success',
                data: student
            });
        } catch (error) {
            next(error);
        }
    }

    getAllStudents = (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = this.studentService.getAllStudents(req.query);
            res.status(200).json({
                status: 'success',
                ...result
            });
        } catch (error) {
            next(error);
        }
    }

    getStudentById = (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id as string);
            if (isNaN(id)) {
                throw new AppError('Invalid ID format', 400);
            }
            const student = this.studentService.getStudentById(id);
            res.status(200).json({
                status: 'success',
                data: student
            });
        } catch (error) {
            next(error);
        }
    }

    updateStudent = (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id as string);
            if (isNaN(id)) {
                throw new AppError('Invalid ID format', 400);
            }
            const student = this.studentService.updateStudent(id, req.body);
            res.status(200).json({
                status: 'success',
                data: student
            });
        } catch (error) {
            next(error);
        }
    }

    deleteStudent = (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id as string);
            if (isNaN(id)) {
                throw new AppError('Invalid ID format', 400);
            }
            this.studentService.deleteStudent(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

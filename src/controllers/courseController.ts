import { Request, Response, NextFunction } from 'express';
import * as courseService from '../services/courseService';
export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await courseService.createCourse(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await courseService.getCourses();
    res.status(200).json({ success: true, data: courses });
  } catch (error: any) {
    next(error);
  }
};
export const enrollStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.body;
    const { id } = req.params;
    const course = await courseService.assignStudentToCourse(id, studentId);
    res.status(200).json({ success: true, data: course, message: 'Student enrolled successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getEnrolledStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const students = await courseService.getStudentsInCourse(req.params.id);
    res.status(200).json({ success: true, data: students });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

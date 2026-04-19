import { Request, Response, NextFunction } from 'express';
import * as studentService from '../services/studentService';
export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentService.getAllStudents(req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    next(error);
  }
};
export const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    res.status(200).json({ success: true, data: student });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};
export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);
    res.status(200).json({ success: true, data: student });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await studentService.softDeleteStudent(req.params.id);
    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const student = await studentService.uploadProfileImage(req.params.id, req.file.path);
    res.status(200).json({ success: true, data: student, message: 'Image uploaded successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

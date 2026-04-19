import { Request, Response, NextFunction } from 'express';
import * as attendanceService from '../services/attendanceService';

export const markAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const attendance = await attendanceService.markAttendance(req.body);
    res.status(201).json({ success: true, data: attendance });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getStudentAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const { courseId } = req.query;
    const attendance = await attendanceService.getAttendanceByStudent(studentId, courseId as string);
    res.status(200).json({ success: true, data: attendance });
  } catch (error: any) {
    next(error);
  }
};

export const getMonthlyReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId, month, year } = req.query;
    if (!courseId || !month || !year) {
      return res.status(400).json({ success: false, message: 'Missing required query parameters' });
    }
    const report = await attendanceService.getMonthlyReport(courseId as string, Number(month), Number(year));
    res.status(200).json({ success: true, data: report });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

import Attendance, { AttendanceStatus } from '../models/Attendance';
import Student from '../models/Student';
import Course from '../models/Course';

export const markAttendance = async (data: any) => {
  const { studentId, courseId, date, status } = data;

  const student = await Student.findById(studentId);
  const course = await Course.findById(courseId);

  if (!student) throw new Error('Student not found');
  if (!course) throw new Error('Course not found');

  const attendance = new Attendance({
    studentId,
    courseId,
    date: new Date(date),
    status
  });

  await attendance.save();
  return attendance;
};

export const getAttendanceByStudent = async (studentId: string, courseId?: string) => {
  const filter: any = { studentId };
  if (courseId) filter.courseId = courseId;
  return await Attendance.find(filter).sort({ date: -1 });
};

export const getMonthlyReport = async (courseId: string, month: number, year: number) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  const report = await Attendance.aggregate([
    {
      $match: {
        courseId: require('mongoose').Types.ObjectId(courseId),
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: { studentId: '$studentId', status: '$status' },
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: '$_id.studentId',
        attendance: {
          $push: {
            status: '$_id.status',
            count: '$count'
          }
        }
      }
    }
  ]);

  return report;
};

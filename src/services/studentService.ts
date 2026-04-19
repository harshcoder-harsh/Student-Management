import Student, { IStudent } from '../models/Student';
import User from '../models/User';
export const getAllStudents = async (query: any) => {
  const { page = 1, limit = 10, search, course } = query;
  const skip = (Number(page) - 1) * Number(limit);
  const filter: any = {};
  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }
  if (course) {
    filter.course = course;
  }
  const students = await Student.find(filter)
    .populate('course', 'name code')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));
  const total = await Student.countDocuments(filter);
  return {
    students,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit))
  };
};
export const getStudentById = async (id: string) => {
  const student = await Student.findById(id).populate('course', 'name code');
  if (!student) throw new Error('Student not found');
  return student;
};
export const updateStudent = async (id: string, updateData: any) => {
  const student = await Student.findByIdAndUpdate(id, updateData, { new: true });
  if (!student) throw new Error('Student not found');
  return student;
};
export const uploadProfileImage = async (id: string, filePath: string) => {
  const student = await Student.findByIdAndUpdate(id, { profileImage: filePath }, { new: true });
  if (!student) throw new Error('Student not found');
  return student;
};
export const softDeleteStudent = async (id: string) => {
  const student = await Student.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  if (!student) throw new Error('Student not found');
  return student;
};

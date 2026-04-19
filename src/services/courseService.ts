import Course from '../models/Course';
import Student from '../models/Student';

export const createCourse = async (data: any) => {
  const course = new Course(data);
  await course.save();
  return course;
};

export const getCourses = async () => {
  return await Course.find();
};

export const assignStudentToCourse = async (courseId: string, studentId: string) => {
  const course = await Course.findById(courseId);
  const student = await Student.findById(studentId);

  if (!course) throw new Error('Course not found');
  if (!student) throw new Error('Student not found');

  if (!course.students.includes(student._id)) {
    course.students.push(student._id);
    await course.save();
  }

  if (student.course?.toString() !== course._id.toString()) {
    student.course = course._id;
    await student.save();
  }

  return course;
};

export const getStudentsInCourse = async (courseId: string) => {
  const course = await Course.findById(courseId).populate('students', 'name email age');
  if (!course) throw new Error('Course not found');
  return course.students;
};

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { Role } from '../models/User';
import Student from '../models/Student';

export const registerUser = async (data: any) => {
  const { email, password, role, name, age } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const finalRole = Object.values(Role).includes(role) ? role : Role.STUDENT;

  const user = new User({
    email,
    password: hashedPassword,
    role: finalRole
  });

  await user.save();

  // If role is student, create a student profile
  if (finalRole === Role.STUDENT) {
    if (!name || age === undefined) {
      await User.findByIdAndDelete(user._id);
      throw new Error('Name and age are required for student registration');
    }
    const student = new Student({
      name,
      email,
      age,
      userId: user._id
    });
    await student.save();
  }

  return user;
};

export const loginUser = async (data: any) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'supersecretjwtkey',
    { expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as any }
  );

  return { user: { id: user._id, email: user.email, role: user.role }, token };
};

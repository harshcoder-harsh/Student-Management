import mongoose, { Document, Schema } from 'mongoose';

export enum Role {
  ADMIN = 'Admin',
  STUDENT = 'Student'
}

export interface IUser extends Document {
  email: string;
  password?: string; // Optional for soft-deleted or special cases, but generally present
  role: Role;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(Role), default: Role.STUDENT },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);

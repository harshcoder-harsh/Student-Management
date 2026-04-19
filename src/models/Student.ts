import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  email: string;
  age: number;
  course: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  profileImage?: string;
  createdAt: Date;
  deletedAt?: Date | null;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  age: { type: Number, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  profileImage: { type: String },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null } // Soft delete field
});

// Exclude softly deleted students by default in find queries
StudentSchema.pre('find', function() {
  this.where({ deletedAt: null });
});
StudentSchema.pre('findOne', function() {
  this.where({ deletedAt: null });
});

export default mongoose.model<IStudent>('Student', StudentSchema);

import mongoose, { Document, Schema } from 'mongoose';
export interface ICourse extends Document {
  name: string;
  code: string;
  description: string;
  students: mongoose.Types.ObjectId[];
  createdAt: Date;
}
const CourseSchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true, index: true },
  description: { type: String },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model<ICourse>('Course', CourseSchema);

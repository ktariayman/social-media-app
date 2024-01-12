import mongoose, { Document, Types, model, models } from 'mongoose';

type ObjectId = typeof Types.ObjectId
interface IReact extends Document {
 react: string;
 postRef: ObjectId;
 reactBy: ObjectId;

}
const reactSchema = new mongoose.Schema<IReact>({
 react: {
  type: String,
  enum: ["like", "love", "haha", "sad", "angry", "wow"],
 },
 postRef: {
  type: Types.ObjectId,
  ref: "Post",
 },
 reactBy: {
  type: Types.ObjectId,
  ref: "User",
 },
});

const React = models.React || model<IReact>('React', reactSchema);
export default React;

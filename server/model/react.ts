import mongoose, { Schema, Document, Types, model, models } from 'mongoose';

interface IReact extends Document {
 react: any;
 postRef: any;
 reactBy: any;

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

import mongoose, { Schema, Document, Types, model, models } from 'mongoose';

interface ICode extends Document {
  code: string;
  user: Types.ObjectId;
}
const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Code = models.Code || model<ICode>('Code', codeSchema);

export default Code;

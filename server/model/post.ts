import mongoose, { Schema, Document, Types, model, models } from 'mongoose';

import { ObjectId } from 'mongoose';

interface IComment {
  comment: string;
  image?: string;
  commentBy: ObjectId;
  commentAt: Date;
}

interface IPost extends Document {
  type: 'profilePicture' | 'coverPicture' | null;
  text?: string;
  images?: string[];
  user: ObjectId;
  isArchived:boolean
  isDeleted:boolean
  background?: string;
  comments?: IComment[];
  createdAt?: Date;
  updatedAt?: Date;
}
const postSchema = new Schema<IPost>(
  {
    type: {
      type: String,
      enum: ['profilePicture', 'coverPicture', null],
      default: null
    },
    text: {
      type: String
    },
    images: {
      type: Array
    },
    isArchived : {
      type:Boolean,
      default:false
    },
    isDeleted : {
      type:Boolean,
      default:false
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    background: {
      type: String
    },
    comments: [
      {
        comment: {
          type: String
        },
        image: {
          type: String
        },
        commentBy: {
          type: Types.ObjectId,
          ref: 'User'
        },
        commentAt: {
          type: Date,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Post = models.Post || model<IPost>('Post', postSchema);

export default Post;

import mongoose, { Schema, Document, Types, model, models } from 'mongoose';

import { ObjectId } from 'mongoose';
import { IPost } from '../interfaces/post';


const postSchema = new Schema<IPost>(
  {
    type: {
      type: String,
      enum: ['profilePicture', 'coverPicture', 'story', null],
      default: null
    },
    text: {
      type: String
    },
    images: {
      type: Array
    },
    isArchived: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
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

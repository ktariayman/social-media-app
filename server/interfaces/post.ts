import { ObjectId } from "mongodb";

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
 isArchived: boolean
 isDeleted: boolean
 background?: string;
 comments?: IComment[];
 createdAt?: Date;
 updatedAt?: Date;
}

export {
 IPost, IComment
}
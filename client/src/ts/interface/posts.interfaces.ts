
interface IComment {
 comment: string;
 image?: string;
 commentBy: number;
 commentAt: Date;
}

export interface IPost {
 type: 'profilePicture' | 'coverPicture' | null;
 text?: string;
 images?: string[];
 user: number;
 isArchived: boolean
 isDeleted: boolean
 background?: string;
 comments?: IComment[];
 createdAt?: Date;
 updatedAt?: Date;
}


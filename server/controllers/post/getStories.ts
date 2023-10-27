import { Request, Response } from 'express';
import { Post, User } from '../../model';

interface IStory {
 profile_picture: string;
 profile_name: string;
 image: string;
 username?: string;
 createdAt: string;
 text?: string
}
interface IRequest extends Request {
 user?: any;
 params: any
}
// const getStories = async (req: IRequest, res: Response) => {
//  try {
//   const user = await User.findById(req.user.id);
//   const friends = user.friends;

//   const storyPosts = await Post.find({
//    $or: [
//     { user: req.user.id, type: 'story' },
//     { user: { $in: friends }, type: 'story' },
//    ],
//   })
//    .populate('user', 'first_name last_name picture username cover')
//    .populate('comments.commentBy', 'first_name last_name picture username')
//    .sort({ createdAt: -1 });

//   const usersStoriesMap = new Map(); // Map to store stories for each user

//   storyPosts.forEach((post) => {
//    const userId = post.user._id.toString();
//    if (!usersStoriesMap.has(userId)) {
//     usersStoriesMap.set(userId, []);
//    }

//    console.log('storyPosts ddd', storyPosts);

//    const createdDate = post.createdAt;
//    const now = new Date();
//    const timeDiffInMinutes = Math.floor((+now - createdDate) / (1000 * 60));

//    let createdAt: string;

//    if (timeDiffInMinutes >= 60) {
//     const hours = Math.floor(timeDiffInMinutes / 60);
//     createdAt = `${hours} h ago`;
//    } else {
//     createdAt = `${timeDiffInMinutes}  min  ago`;
//    }

//    const formattedStory: IStory = {
//     profile_picture: post.user.picture,
//     profile_name: `${post.user.first_name} ${post.user.last_name}`,
//     image: post.images[0].url,
//     username: post.user.username,
//     text: post.text,
//     createdAt: createdAt,

//    };
//    usersStoriesMap.get(userId).push(formattedStory);
//   });

//   const usersStoriesArray = Array.from(usersStoriesMap.values());

//   res.json(usersStoriesArray);
//  } catch (error) {
//   const errorMessage: string = (error as Error).message;
//   res.status(500).json({ message: errorMessage });
//  }
// };



const getStories = async (req: IRequest, res: Response) => {
 try {
  const user = await User.findById(req.user.id);
  const friends = user.friends;

  const storyPosts = await Post.find({
   $or: [
    { user: req.user.id, type: 'story' },
    { user: { $in: friends }, type: 'story' },
   ],
  })
   .populate('user', 'first_name last_name picture username cover')
   .populate('comments.commentBy', 'first_name last_name picture username')
   .sort({ createdAt: -1 });

  const usersStoriesMap = new Map(); // Map to store stories for each user

  const now = new Date();

  storyPosts.forEach((post) => {
   const userId = post.user._id.toString();
   const createdDate = post.createdAt;
   const timeDiffInMinutes = Math.floor((+now - createdDate) / (1000 * 60));

   // Check if the story is created within the last 24 hours (1440 minutes)
   if (timeDiffInMinutes <= 1440) {
    let createdAt: string;

    if (timeDiffInMinutes >= 60) {
     const hours = Math.floor(timeDiffInMinutes / 60);
     createdAt = `${hours} h ago`;
    } else {
     createdAt = `${timeDiffInMinutes} min ago`;
    }

    const formattedStory: IStory = {
     profile_picture: post.user.picture,
     profile_name: `${post.user.first_name} ${post.user.last_name}`,
     image: post.images[0]?.url ? post.images[0]?.url : '',
     username: post.user.username,
     createdAt: createdAt,
     text: post.text ? post.text : ''
    };

    if (!usersStoriesMap.has(userId)) {
     usersStoriesMap.set(userId, []);
    }

    usersStoriesMap.get(userId).push(formattedStory);
   }
  });

  const usersStoriesArray = Array.from(usersStoriesMap.values());

  res.json(usersStoriesArray);
 } catch (error) {
  const errorMessage: string = (error as Error).message;
  res.status(500).json({ message: errorMessage });
 }
};
export default getStories;
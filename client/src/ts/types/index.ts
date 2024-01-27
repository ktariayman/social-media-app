export type pagesType = 'friends' | 'home' | 'profile'

export type User = {
 email: string;
 first_name: string;
 id: string;
 last_name: string;
 picture: string;
 token: string;
 username: string;
 verified: boolean;
};
export type ProfileDetails = {
 relationship?: string;
 instagram?: string;
 bio?: string;
 job?: string;
 otherName?: string
 workplace?: any;
 highSchool?: any;
 college?: any;
 currentCity?: any;
 hometown?: any;
};


type FriendshipStatus = {
 friends: boolean;
 following: boolean;
 requestSent: boolean;
 requestReceived: boolean;
};

export type Profile = {
 bDay: number;
 bMonth: number;
 bYear: number;
 cover: string;
 createdAt: string;
 details: ProfileDetails;
 email: string;
 first_name: string;
 followers: any[];
 following: any[];
 friends: any[];
 friendship: FriendshipStatus;
 gender: string;
 last_name: string;
 picture: string;
 posts: any[];
 requests: any[];
 savedPosts: any[];
 search: any[];
 updatedAt: string;
 username: string;
 verified: boolean;
 lastStory: boolean;
 lastStories?: Story[];
};
type Story = {
 _id: string;
 image: string;
 text: string;
 createdAt: string;
};
export type appType = {
 darkTheme: boolean;
 friendsPage: null;
 posts: null;
 profile: {
  error: string;
  loading: boolean;
  profile: Profile;
 };
 user: User;
};


export type Friend = {
 first_name: string;
 last_name: string;
 picture: string;
 username: string;
 _id: string;
};
export type FriendsType = {
 friends: Friend[];
 requests: Friend[];
 sentRequests: Friend[];
};
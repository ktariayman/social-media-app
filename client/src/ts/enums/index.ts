export enum PostActionType {
 POST_REQUEST = 'POST_REQUEST',
 POST_SUCCESS = 'POST_SUCCESS',
 POST_ERROR = 'POST_ERROR',
}
export enum ProfileActionType {
 PROFILE_REQUEST = 'PROFILE_REQUEST',
 PROFILE_SUCCESS = 'PROFILE_SUCCESS',
 PROFILE_ERROR = 'PROFILE_ERROR',
 PROFILE_POSTS = 'PROFILE_POSTS'
}
export enum UserActionType {
 LOGIN = "LOGIN",
 REGISTER = "REGISTER",
 LOGOUT = "LOGOUT",
 UPDATEPROFILEPICTURE = "UPDATE_PROFILE_PICTURE",
}

export enum FriendsActionType {
 PROFILE_REQUEST = 'FRIENDS_REQUEST',
 PROFILE_SUCCESS = 'FRIENDS_SUCCESS',
 PROFILE_ERROR = 'FRIENDS_ERROR',
}
function postReducer(
 state :any,

 action: any
) {
 switch (action.type) {
   case 'POST_REQUEST':
     return {
       ...state,loading:true,error:"",posts:[]

     }
   case 'POST_SUCCESS':
     return {
      ...state,
      loading:false,
      posts:action.payload,
      error:""
     };
   case 'POST_ERROR':
    return {...state,loading:false,error:action.payload,posts:[]}
    default:
     return state;
 }
}
export default postReducer;

// postAction.ts

export enum PostActionType {
  POST_REQUEST = 'POST_REQUEST',
  POST_SUCCESS = 'POST_SUCCESS',
  POST_ERROR = 'POST_ERROR',
}

export interface PostAction {
  type: PostActionType;
  payload?: any;
}
export interface PostState {
  loading: boolean;
  posts: any[]; // Replace `any` with the actual type of posts
  error: string;
}

import { PostActionType } from "../ts/enums";
import { IPost } from "../ts/interface/posts.interfaces";



export interface PostAction {
  type: PostActionType;
  payload?: any;
}
export interface PostState {
  loading: boolean;
  posts: IPost[];
  error: string;
}


function postReducer(state: PostState, action: PostAction): PostState {
  switch (action.type) {
    case PostActionType.POST_REQUEST:
      return {
        ...state, loading: true, error: "", posts: []

      }
    case PostActionType.POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: ""
      };
    case PostActionType.POST_ERROR:
      return { ...state, loading: false, error: action.payload, posts: [] }
    default:
      return state;
  }
}
export default postReducer;


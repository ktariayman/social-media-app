import { PostActionType } from "../ts/enums";



export interface PostAction {
  type: PostActionType;
  payload?: any;
}
export interface PostState {
  loading: boolean;
  posts: any;
  error: string;
}


function postReducer(state: any = null, action: PostAction): any {
  switch (action.type) {
    case 'POST_REQUEST':
      return {
        ...state, loading: true, error: "", posts: []
      }
    case 'POST_SUCCESS':
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: ""
      };
    case 'POST_ERROR':
      return { ...state, loading: false, error: action.payload, posts: [] }
    default:
      return state;
  }
}
export default postReducer;


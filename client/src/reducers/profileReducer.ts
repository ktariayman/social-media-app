import { ProfileActionType } from "../ts/enums";
import { IPost } from "../ts/interface/posts.interfaces";



export interface ProfileAction {
  type: ProfileActionType;
  payload?: any;
}
export interface ProfileState {
  loading: boolean;
  profile: any;
  error: string;
}
const initialState: ProfileState = {
  error: "",
  loading: false,
  profile: {},
}


function profileReducer(state: ProfileState = initialState, action: ProfileAction): ProfileState {
  console.log('action', action);

  switch (action.type) {
    case ProfileActionType.PROFILE_REQUEST:
      return {
        ...state, loading: true, error: ""

      }
    case ProfileActionType.PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: ""
      };
    case ProfileActionType.PROFILE_POSTS:
      return {
        loading: false,
        profile: { ...state.profile, posts: action.payload },
        error: "",
      };
    case ProfileActionType.PROFILE_ERROR:
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
}
export default profileReducer;


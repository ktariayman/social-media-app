import { ProfileActionType } from "../ts/enums";
import { Profile } from "../ts/types";
export interface ProfileAction {
  type: ProfileActionType;
  payload?: any;
}
export interface ProfileState {
  loading: boolean;
  profile: Profile;
  error: string;
}
const initialState: ProfileState = {
  error: "",
  loading: false,
  profile: {} as Profile,
}


function profileReducer(state = initialState, action: ProfileAction): ProfileState {
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


import { ProfileActionType } from "../ts/enums";
import { IPost } from "../ts/interface/posts.interfaces";



export interface ProfileAction {
 type: ProfileActionType;
 payload?: any;
}
export interface ProfileState {
 loading: boolean;
 profile: IPost[];
 error: string;
}


function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
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
  case ProfileActionType.PROFILE_ERROR:
   return { ...state, loading: false, error: action.payload }
  default:
   return state;
 }
}
export default profileReducer;


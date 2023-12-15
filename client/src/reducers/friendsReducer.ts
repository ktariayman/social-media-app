import { FriendsActionType } from "../ts/enums";

export interface ProfileAction {
  type: FriendsActionType;
  payload?: any;
}
export interface FriendsState {
  loading: boolean;
  data: FriendsState;
  error: string;
}
const initialState: FriendsState = {
  error: "",
  loading: false,
  data: {} as FriendsState,
}

export function friendsReducer(state = initialState, action: ProfileAction) {
  switch (action.type) {
    case FriendsActionType.PROFILE_REQUEST:
      return { ...state, loading: true, error: "" };
    case FriendsActionType.PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case FriendsActionType.PROFILE_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
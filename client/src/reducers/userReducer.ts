import { UserActionType } from "../ts/enums";

function userReducer(
  state = null,

  action: any
) {
  switch (action.type) {
    case UserActionType.LOGIN:
      return action.payload;
    case UserActionType.REGISTER:
      return action.payload;
    case UserActionType.LOGOUT:
      return null;
    default:
      return state;
  }
}
export default userReducer;

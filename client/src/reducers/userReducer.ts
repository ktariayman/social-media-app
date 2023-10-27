import { UserActionType } from "../ts/enums";
import Cookies from "js-cookie";

function userReducer(
  state = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null,

  action: any
) {
  switch (action.type) {
    case UserActionType.LOGIN:
      return action.payload;
    case UserActionType.REGISTER:
      return action.payload;
    case UserActionType.UPDATEPROFILEPICTURE:
      return action.payload;
    case UserActionType.LOGOUT:
      return null;
    default:
      return state;
  }
}
export default userReducer;

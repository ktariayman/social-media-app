import { UserActionType } from "../ts/enums";
import Cookies from "js-cookie";
import { IUser } from "../ts/interface/user";
const initialState: IUser | null = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null
interface UserAction {
  type: UserActionType,
  payload: null | IUser
}
function userReducer(
  state = initialState,
  action: UserAction
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

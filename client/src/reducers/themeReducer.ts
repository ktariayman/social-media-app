import Cookies from "js-cookie";

export function themeReducer(
 state: any = Cookies.get("darkTheme")
  ? JSON.parse(Cookies.get("darkTheme")!)
  : false,

 action: any
) {
 switch (action.type) {
  case "DARK":
   return true;
  case "LIGHT":
   return false;

  default:
   return state;
 }
}
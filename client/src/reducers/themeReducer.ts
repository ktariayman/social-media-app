import Cookies from "js-cookie";
interface ThemeAction {
  type: Theme,
}
enum Theme {
  DARK = "DARK",
  LIGHT = "LIGHT"
}
export function themeReducer(
  state: boolean = Cookies.get("darkTheme")
    ? JSON.parse(Cookies.get("darkTheme")!)
    : false,

  action: ThemeAction
) {

  switch (action.type) {
    case Theme.DARK:
      return true;
    case Theme.LIGHT:
      return false;

    default:
      return state;
  }
}


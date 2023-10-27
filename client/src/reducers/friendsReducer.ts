export function friendsReducer(state: any = null, action: any) {
 switch (action.type) {
  case "FRIENDS_REQUEST":
   return { ...state, loading: true, error: "" };
  case "FRIENDS_SUCCESS":
   return {
    ...state,
    loading: false,
    data: action.payload,
    error: "",
   };
  case "FRIENDS_ERROR":
   return { ...state, loading: false, error: action.payload };

  default:
   return state;
 }
}
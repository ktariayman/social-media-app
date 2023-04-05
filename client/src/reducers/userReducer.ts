function userReducer(
  state = null,

  action: any
) {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'REGISTER':
      return action.payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
}
export default userReducer;

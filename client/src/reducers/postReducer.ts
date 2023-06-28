function postReducer(
 state :any,

 action: any
) {
 switch (action.type) {
   case 'POST_REQUEST':
     return {
       ...state,loading:true,error:"",posts:[]

     }
   case 'POST_SUCCESS':
     return {
      ...state,
      loading:false,
      posts:action.payload,
      error:""
     };
   case 'POST_ERROR':
    return {...state,loading:false,error:action.payload,posts:[]}
    default:
     return state;
 }
}
export default postReducer;

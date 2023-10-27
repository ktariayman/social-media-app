


import axios from "axios";

const usersNotFriends = async (token: string) => {
 try {

  const { data } = await axios.get(
   `${process.env.REACT_APP_BACKEND_URL}/usersNotFriends`,

   {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   }
  );
  return data;
 } catch (error: any) {
  return error.response.data.message;
 }
};
export default usersNotFriends



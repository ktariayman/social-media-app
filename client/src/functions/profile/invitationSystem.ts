import axios from "axios";

export const addFriend = async (id: string, token: string) => {
 try {
  const { data } = await axios.put(
   `${process.env.REACT_APP_BACKEND_URL}/addFriend/${id}`,
   {},
   {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   }
  );
  return "ok";
 } catch (error: any) {
  return error.response.data.message;
 }
};
export const cancelRequest = async (id: string, token: string) => {
 try {
  const { data } = await axios.put(
   `${process.env.REACT_APP_BACKEND_URL}/cancelRequest/${id}`,
   {},

   {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   }
  );
  return "ok";
 } catch (error: any) {
  return error.response.data.message;
 }
};
export const follow = async (id: string, token: string) => {
 try {
  const { data } = await axios.put(
   `${process.env.REACT_APP_BACKEND_URL}/follow/${id}`,
   {},

   {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   }
  );
  return "ok";
 } catch (error: any) {
  console.log(error.response.data.message);
  return error.response.data.message;
 }
};
export const unfollow = async (id: string, token: string) => {
 try {
  const { data } = await axios.put(
   `${process.env.REACT_APP_BACKEND_URL}/unfollow/${id}`,
   {},

   {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   }
  );
  return "ok";
 } catch (error: any) {
  return error.response.data.message;
 }
};
export const acceptRequest = async (id: string, token: string) => {
 try {
  const { data } = await axios.put(
   `${process.env.REACT_APP_BACKEND_URL}/acceptRequest/${id}`,
   {},

   {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   }
  );
  return "ok";
 } catch (error: any) {
  return error.response.data.message;
 }
};
export const unfriend = async (id: string, token: string) => {
 try {
  const { data } = await axios.put(
   `${process.env.REACT_APP_BACKEND_URL}/unfriend/${id}`,
   {},

   {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   }
  );
  return "ok";
 } catch (error: any) {
  return error.response.data.message;
 }
};
export const deleteRequest = async (id: string, token: string) => {
 try {
  const { data } = await axios.put(
   `${process.env.REACT_APP_BACKEND_URL}/deleteRequest/${id}`,
   {},

   {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   }
  );
  return "ok";
 } catch (error: any) {
  return error.response.data.message;
 }
};
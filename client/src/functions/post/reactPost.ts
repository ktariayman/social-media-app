import axios from "axios";

export const reactPost = async (postId: any, react: any, token: any) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/reactPost`,
      {
        postId,
        react,
      },
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
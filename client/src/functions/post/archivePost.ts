import axios from "axios";

export const archivePost = async (postId: string, token: string, isArchived: boolean) => {
  try {

    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/archivePost`,
      { id: postId, isArchived: isArchived },
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

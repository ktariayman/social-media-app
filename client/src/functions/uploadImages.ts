import axios from "axios";

export const uploadImages = async (
  formData: FormData,
  path: string,
  token: string
): Promise<any> => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/uploadImages`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error :any) {
    return error.response.data.message;
  }
};

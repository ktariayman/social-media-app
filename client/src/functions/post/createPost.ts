import axios from "axios"

export const createPostService = async (type: any | null, background: any | null, text: any | null, images: any | null, user: any | null, token: any | null) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/createPost`,
      { type, background, text, images: images || [], user },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return { status: "ok", data }
  } catch (error: any) {
    return error.response.data.message

  }
}
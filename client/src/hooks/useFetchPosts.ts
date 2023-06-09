import { useEffect, useReducer, useRef } from 'react';
import { useSelector } from 'react-redux';
import postReducer, { PostActionType, PostState } from '../reducers/postReducer';
import { getAllPostsService } from '../functions';

interface HomeProps {
  setVisible: (visible: boolean) => void;
  visible: boolean;
  getData:Function;
}

const usePosts = ({ setVisible, visible ,getData}: HomeProps) => {
  const { user } = useSelector((state: any) => ({ ...state }));

  const [postState, dispatch] = useReducer(postReducer, {
    loading: false,
    posts: [],
    error: '',
  } as PostState);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    try {
      dispatch({ type: PostActionType.POST_REQUEST });
      const data = await getData(user?.token);
      dispatch({ type: PostActionType.POST_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({ type: PostActionType.POST_ERROR, payload: error.response.data.message });
    }
  };

  return {
    postState,
    setVisible,
    visible,
  };
};

export default usePosts;

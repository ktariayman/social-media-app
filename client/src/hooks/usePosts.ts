import { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import postReducer from '../reducers/postReducer';
import { PostActionType } from '../ts/enums';
import { IUser } from '../ts/interface/user';

interface HomeProps {
  setVisible: (visible: boolean) => void;
  visible: boolean;
  getData: Function;
}

const usePosts = ({ setVisible, visible, getData }: HomeProps) => {
  const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));

  const [postState, dispatch] = useReducer(postReducer, {
    loading: false,
    posts: [],
    error: '',
  });

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
    dispatch,
    handleGetData
  };
};

export default usePosts;

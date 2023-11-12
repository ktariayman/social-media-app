import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';

const useTheme = () => {
 const { darkTheme } = useSelector((state: any) => ({ ...state }));
 const dispatch = useDispatch();
 const onSwitch = () => {
  Cookies.set('darkTheme', darkTheme ? "true" : "false");
  dispatch({ type: darkTheme ? 'LIGHT' : "DARK" });
 }

 const onLight = () => {
  Cookies.set('darkTheme', 'false');
  dispatch({ type: 'LIGHT' });
 }

 const onDark = () => {
  Cookies.set('darkTheme', 'true');
  dispatch({ type: 'DARK' });
 }
 return {
  onSwitch,
  onLight,
  onDark
 }
};

export default useTheme;

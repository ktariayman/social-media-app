import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Login from '../pages/login';

export default function LoggedInRoutes(): JSX.Element {
  const { user } = useSelector((state: any) => ({ ...state }));
  return user ? <Outlet /> : <Login />;
}

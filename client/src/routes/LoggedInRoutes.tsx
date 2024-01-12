import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Login from '../pages/login';
import { IUser } from '../ts/interface/user';

export default function LoggedInRoutes(): JSX.Element {
  const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
  return user ? <Outlet /> : <Login />;
}

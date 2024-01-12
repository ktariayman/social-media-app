import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { IUser } from '../ts/interface/user';

export default function NotLoggedInRoutes(): JSX.Element {
  const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
  return user ? <Navigate to='/' /> : <Outlet />;
}

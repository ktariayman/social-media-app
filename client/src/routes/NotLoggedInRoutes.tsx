import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function NotLoggedInRoutes(): JSX.Element {
  const { user } = useSelector((state: any) => ({ ...state }));
  return user ? <Navigate to='/' /> : <Outlet />;
}

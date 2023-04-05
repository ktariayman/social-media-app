import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function NotLoggedInRoutes() {
  const { user } = useSelector((state: any) => ({ ...state }));
  return user ? <Navigate to='/' /> : <Outlet />;
}

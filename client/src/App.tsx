import { Routes, Route, RouteProps } from 'react-router-dom';
import { Profile, Home, Login } from './pages';
import { LoggedInRoutes, NotLoggedInRoutes } from './routes';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path='/login' element={<Login />} />
        </Route>
        <Route element={<LoggedInRoutes />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

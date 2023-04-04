import { Routes, Route } from 'react-router-dom';
import Profile from './pages/profile';
import Login from './pages/login';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import { Profile, Home, Login } from './pages';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

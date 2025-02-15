import './App.css'
import FoodStock from './componentes/FoodStock';
import AdminRoute from './routes/AdminRoute';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './componentes/Login';
import Register from './componentes/Register';
import Navbar from './componentes/Navbar';
import Home from './componentes/Home';
import Foods from './componentes/Foods';
import ProtectedRoute from './routes/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path={`${import.meta.env.BASE_URL}`} element={<Home />} />
            <Route path={`${import.meta.env.BASE_URL}/login`} element={<Login />} />
            <Route path={`${import.meta.env.BASE_URL}/register`} element={<Register />} />
            <Route path={`${import.meta.env.BASE_URL}/comidas`} element={<ProtectedRoute><Foods /></ProtectedRoute>} />
            <Route path={`${import.meta.env.BASE_URL}/disponiblidad`} element={<AdminRoute><FoodStock /></AdminRoute>} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App

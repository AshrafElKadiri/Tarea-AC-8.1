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
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Foods" element={<ProtectedRoute><Foods /></ProtectedRoute>} />
            <Route path="/disponiblidad" element={<AdminRoute><FoodStock /></AdminRoute>} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App

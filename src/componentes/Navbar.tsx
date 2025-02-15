import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { authService } from '../servicios/AuthService';
import '../App.css';
import { Role } from '../servicios/IAuthService';
const Navbar: React.FC = () => {
    const { user, roles } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await authService.signOut();
            navigate('/login');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <nav className="navbar">
            <ul className="nav-menu">
                <li><Link to={`${import.meta.env.BASE_URL}`}>Home</Link></li>
                {user && roles && roles.includes(Role.ADMIN) && (
                    <li><Link to={`${import.meta.env.BASE_URL}/disponiblidad`}>Disponiblidad</Link></li>)
                }
                {user && roles && roles.includes(Role.USER) && (
                    <li><Link to={`${import.meta.env.BASE_URL}/comidas`}>Comida</Link></li>)
                }
                {!user && <li><Link to={`${import.meta.env.BASE_URL}/login`}>Login</Link></li>}
                {!user && <li><Link to={`${import.meta.env.BASE_URL}/register`}>Registro</Link></li>}
                {user && <li><button onClick={handleLogout}>Logout</button></li>}
            </ul>
        </nav>
    );
};

export default Navbar;
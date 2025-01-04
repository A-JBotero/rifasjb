import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavBar = ({ onAddCard, userRole, setUserRole }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Usamos useNavigate para la navegación programática

  // Comprobar si estamos en la página /login
  const isLoginPage = location.pathname === '/login';

  // Comprobar si estamos en la página /home
  const isHomePage = location.pathname === '/home';

  // Función para manejar la navegación a la página de administración
  const handleAdminClick = () => {
    navigate('/login'); // Navega a la página de login
  };

  // Función para manejar el logout
  const handleLogout = () => {
    setUserRole(null); 
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <header className="text-gray-600 body-font bg-primary">
      <div className="container mx-auto flex flex-wrap p-8 flex-col md:flex-row items-center">
        <a
          href="/home"
          className="flex title-font font-medium items-center text-gray-900 mb-3 md:mb-0"
        >
          <span className="ml-12 pt-2 text-2xl text-white font-serif italic">RIFAS BOCADILLO</span>
        </a>

        {userRole === 'admin' && (
          <button
            onClick={onAddCard}
            className="inline-flex items-center text-white bg-green-500 border-0 py-2 px-5 focus:outline-none hover:bg-green-600 rounded ml-4"
          >
            Agregar Card
          </button>
        )}

        {isHomePage && !isLoginPage && userRole !== 'admin' && (
          <button
            onClick={handleAdminClick}
            className="inline-flex items-center text-white bg-blue-500 border-0 py-2 px-5 focus:outline-none hover:bg-blue-600 rounded ml-auto"
          >
            ADMINISTRAR
          </button>
        )}

        {userRole === 'admin' && (
          <button
            onClick={handleLogout}
            className="inline-flex items-center text-white bg-red-500 border-0 py-2 px-5 focus:outline-none hover:bg-red-600 rounded ml-auto"
          >
            LogOut
          </button>
        )}
      </div>
    </header>
  );
};

export default NavBar;
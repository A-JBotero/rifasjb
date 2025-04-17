import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoDsB from '../assets/logoDsB.png'; 

const NavBar = ({ onAddCard, userRole, setUserRole }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === '/login';
  const isHomePage = location.pathname === '/home';

  const handleAdminClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    setUserRole(null);
    navigate('/login');
  };

  return (
    <header className="text-gray-600 body-font bg-bgb">
      <div className="container mx-auto flex flex-wrap p-8 flex-col md:flex-row items-center">
        <a href="/home" className="flex title-font font-medium items-center text-gray-900 mb-3 md:mb-0">
          <img src={logoDsB} alt="DieselStyles Logo" className="w-20 h-20 mr-2" />
          <span className="text-2xl text-white font-serif italic">DieselStyles</span>
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
            className="inline-flex items-center text-black bg-gold border border-black py-2 px-5 focus:outline-none hover:bg-[#E6C200] hover:shadow-lg hover:shadow-black rounded ml-auto transition-all"
          >
            ADMINISTRAR
          </button>
        )}

        {userRole === 'admin' && (
          <button
            onClick={handleLogout}
            className="inline-flex items-center text-white bg-red-500 border-0 py-2 px-5 focus:outline-none hover:bg-hovbtn rounded ml-auto"
          >
            LogOut
          </button>
        )}
      </div>
    </header>
  );
};

export default NavBar;

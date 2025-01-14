import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/navBar';
import Items from '../components/items';
import Footer from '../components/footer';

const Sale = () => {
  const location = useLocation(); // Obtener el estado de navegación
  const item = location.state?.item; // Extraer el ítem pasado desde Blocks

  return (
    <>
      <NavBar />
      {item ? (
        <Items item={item} /> // Pasar el ítem al componente Items
      ) : (
        <p className="text-center text-white mt-10">
          No se encontró información del producto seleccionado.
        </p>
      )}
      <Footer />
    </>
  );
};

export default Sale;

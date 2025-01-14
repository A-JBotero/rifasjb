import React from 'react';
import { useLocation } from 'react-router-dom';
import Grid from './grid';

const Items = () => {
  // Obtener los datos del producto seleccionados desde el estado de navegación
  const location = useLocation();
  const item = location.state?.item;

  if (!item) {
    return (
      <div className="bg-secondary h-screen flex justify-center items-center">
        <h1 className="text-white text-2xl">No se encontró información del producto seleccionado.</h1>
      </div>
    );
  }

  return (
    <div className="bg-secondary flex flex-wrap lg:flex-nowrap">
      {/* Sección de la imagen y los detalles */}
      <div className="lg:w-1/2 w-full p-5 flex flex-col items-center">
        <img
          alt={item.name || 'Producto'}
          className="w-3/4 lg:w-2/3 lg:h-auto h-48 object-cover object-center rounded"
          src={item.imageUrl || 'https://via.placeholder.com/150'} // Mostrar la imagen en base64 o un placeholder
        />
        <div className="mt-5 w-full">
          <h1 className="text-white text-2xl md:text-3xl title-font font-medium mb-2">
            {item.name}
          </h1>
          <p className="leading-relaxed text-white text-sm md:text-base">
            Descripción: {item.description || 'No disponible'}
          </p>
          <p className="leading-relaxed text-white text-sm md:text-base">
            Fecha: {item.startDate || 'No disponible'}
          </p>
          <p className="leading-relaxed text-white text-sm md:text-base">
            Precio: {item.value || 'No disponible'}
          </p>
          <div className="flex items-center justify-between mt-6">
            <span className="title-font font-medium text-xl md:text-2xl text-white">
              Total:
            </span>
            <span className="title-font font-medium text-xl md:text-2xl text-white">
              {item.value || '0.00'}$
            </span>
            <button className="flex text-white bg-blue-500 border-0 py-2 px-4 md:px-5 focus:outline-none hover:bg-blue-600 rounded">
              Pagar
            </button>
          </div>
        </div>
      </div>

      {/* Sección de la cuadrícula */}
      <div className="lg:w-1/2 w-full p-5">
        <Grid />
      </div>
    </div>
  );
};

export default Items;

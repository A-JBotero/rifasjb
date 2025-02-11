import React from 'react';
import { useLocation } from 'react-router-dom';
import Grid from './grid';

const Items = () => {
  
  const location = useLocation();
  const item = location.state?.item;
  const imagesMap = location.state?.imagesMap; 

  if (!item || !imagesMap) {
    return (
      <div className="bg-secondary h-screen flex justify-center items-center">
        <h1 className="text-white text-2xl">No se encontró información del producto seleccionado.</h1>
      </div>
    );
  }

  
  const itemImage = imagesMap[item.id];

  return (
    <div className="bg-darkgray flex flex-wrap lg:flex-nowrap">
     
     <div className="lg:w-1/2 w-full p-5 flex flex-col items-center justify-center min-h-screen">
  {/* Contenedor de la imagen */}
  {itemImage ? (
    <img
      alt={item.name || 'Producto'}
      className="w-3/4 lg:w-2/3 lg:h-auto h-48 object-cover object-center rounded"
      src={`data:image/jpeg;base64,${itemImage}`} 
    />
  ) : (
    <div className="w-3/4 lg:w-2/3 lg:h-auto h-48 bg-gray-300 flex justify-center items-center rounded">
      <span className="text-white">Imagen no disponible</span>
    </div>
  )}

  {/* Contenedor del texto */}
  <div className="mt-5 w-full text-center">
    <h1 className="text-white text-2xl md:text-3xl title-font font-medium mb-2">
      {item.name}
    </h1>
    
    {/* Precio más grande y arriba */}
    <p className="leading-relaxed text-white text-lg md:text-xl font-semibold">
      Precio: {item.ticketPrice || 'No disponible'}
    </p>

    <p className="leading-relaxed text-white text-sm md:text-base">
      Descripción: {item.description || 'No disponible'}
    </p>
    <p className="leading-relaxed text-white text-sm md:text-base">
      Fecha: {item.startDate || 'No disponible'}
    </p>

    {/* Total y botón "Pagar" alineados */}
    <div className="flex items-center justify-between mt-6 w-full px-5">
      <span className="title-font font-medium text-xl md:text-2xl text-white">
        Total:
      </span>
      <span className="title-font font-medium text-xl md:text-2xl text-white">
        {item.value || '0.00'}$
      </span>
      <button className="inline-flex text-center items-center text-black bg-gold border border-black py-2 px-5 focus:outline-none hover:bg-[#E6C200] 
        hover:scale-105 hover:shadow-lg hover:shadow-black rounded transition-all">
        Pagar
      </button>
    </div>
  </div>
</div>



      <div className="lg:w-1/2 w-full p-5">
        <Grid />
      </div>
    </div>
  );
};

export default Items;

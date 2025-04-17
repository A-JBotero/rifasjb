import React from 'react';
import Grid from './grid';

const Items = ({ item, imagesMap }) => {
  console.log("🟢 item:", item);
  console.log("🟢 imagesMap:", imagesMap);
  const itemImage = imagesMap?.[item?.id];
  console.log("🟢 itemImage:", itemImage);

  if (!item) {
    return (
      <div className="bg-secondary h-screen flex justify-center items-center">
        <h1 className="text-white text-2xl">No se encontró información del producto seleccionado.</h1>
      </div>
    );
  }

  return (
    <div className="bg-darkgray flex flex-wrap lg:flex-nowrap">
      <div className="lg:w-1/2 w-full p-5 flex flex-col items-center justify-center min-h-screen">
        {itemImage ? (
          <img
            alt={item.name || 'Producto'}
            className="w-full max-w-md h-auto object-contain rounded"
            src={`data:image/jpeg;base64,${itemImage}`}
          />
        ) : (
          <div className="w-full max-w-md h-48 bg-gray-300 flex justify-center items-center rounded">
            <span className="text-white">Imagen no disponible</span>
          </div>
        )}

        <div className="mt-5 w-full text-center px-4">
          <h1 className="text-white text-2xl md:text-3xl font-medium mb-2">{item.name}</h1>
          <p className="leading-relaxed text-white text-lg md:text-xl font-semibold">
            Precio: {item.ticketPrice || 'No disponible'}
          </p>
          <p className="leading-relaxed text-white text-sm md:text-base">
            Descripción: {item.description || 'No disponible'}
          </p>
          <p className="leading-relaxed text-white text-sm md:text-base">
            Fecha: {item.startDate || 'No disponible'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 w-full">
            <span className="title-font font-medium text-xl md:text-2xl text-white">Total:</span>
            <span className="title-font font-medium text-xl md:text-2xl text-white">
              {item.value || '0.00'}$
            </span>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 w-full p-5">
        <Grid item={item} />
      </div>
    </div>
  );
};

export default Items;

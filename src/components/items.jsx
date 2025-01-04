import React from 'react';
import kwtImage from '../assets/kwt800.png';
import Grid from './grid';

const Items = () => {
  return (
    <div className='bg-secondary flex flex-wrap lg:flex-nowrap'>
      
      <div className='lg:w-1/2 w-full p-5 flex flex-col items-center'>
        <img
          alt="ecommerce"
          className="w-3/4 lg:w-2/3 lg:h-auto h-48 object-cover object-center rounded"
          src={kwtImage}
        />
        <div className="mt-5 w-full">
          <h1 className="text-white text-2xl md:text-3xl title-font font-medium mb-2">Product</h1>
          <p className="leading-relaxed text-white text-sm md:text-base">Descripcion: </p>
          <p className="leading-relaxed text-white text-sm md:text-base">Fecha: </p>
          <p className="leading-relaxed text-white text-sm md:text-base">Precio: </p>
          <div className="flex items-center justify-between mt-6">
            <span className="title-font font-medium text-xl md:text-2xl text-white">Total: </span>
            <span className="title-font font-medium text-xl md:text-2xl text-white">58.000$</span>
            <button className="flex text-white bg-blue-500 border-0 py-2 px-4 md:px-5 focus:outline-none hover:bg-blue-600 rounded">
              Pagar
            </button>
          </div>
        </div>
      </div>

      
      <div className='lg:w-1/2 w-full p-5'>
        <Grid />
      </div>
    </div>
  );
};

export default Items;
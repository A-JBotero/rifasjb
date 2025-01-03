import React from 'react'
import kwtImage from '../assets/kwt800.png';
const Items = () => {
  return (
    <div className='bg-secondary '>
    <section class="text-gray-600 body-font overflow-hidden">
  <div class="container px-5 py-20 pb-10px mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={kwtImage}/>
      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h1 class="text-white text-3xl title-font font-medium mb-1">Product</h1>
        <div class="flex mb-4">
       
       
        </div>
        <p class="leading-relaxed text-white">Descripcion : </p>
        <p class="leading-relaxed text-white">Fecha : </p>
        <p class="leading-relaxed text-white">Precio : </p>
        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          
        
        </div>
        <div class="flex">
         <span class="title-font font-medium text-2xl text-white">Total: </span>
         
          <span class="title-font font-medium text-2xl text-white"> 58.000$</span>
          <button class="flex ml-auto text-white bg-blue-500 border-0 py-2 px-5 focus:outline-none hover:bg-blue-600 rounded">Pagar</button>
         
        
        </div>
      </div>
    </div>
  </div>
</section>
</div>
  )
}
export default Items
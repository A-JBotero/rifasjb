import React, { useState } from 'react';
import kwtImage from '../assets/kwt800.png';

const Blocks = () => {
  const [cards, setCards] = useState([]);
  const [userRole, setUserRole] = useState("guest"); // Estado inicial como "guest"

  const addCard = () => {
    const newCard = {
      id: Date.now(),
      name: "Nombre PROD",
      date: "Fecha",
      value: "Valor",
      lottery: "Loteria",
    };
    setCards([...cards, newCard]);
  };

  const deleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id)); // Elimina la tarjeta por su id
  };

  const toggleRole = () => {
    setUserRole((prevRole) => (prevRole === "guest" ? "admin" : "guest"));
  };

  return (
    <div className="bg-secondary">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          
          <div className="flex justify-end space-x-4">
           
            <button
              className="mb-5 text-white bg-gray-500 border-0 py-2 px-5 focus:outline-none hover:bg-gray-600 rounded"
              onClick={toggleRole}
            >
              Cambiar a {userRole === "guest" ? "Admin" : "Guest"}
            </button>

            
            {userRole === "admin" && (
              <button
                className="mb-5 text-white bg-green-500 border-0 py-2 px-5 focus:outline-none hover:bg-green-600 rounded"
                onClick={addCard}
              >
                Agregar Card
              </button>
            )}
          </div>

          
          <div className="flex flex-wrap gap-6 text-center justify-center">
            {cards.map((card) => (
              <div
                key={card.id}
                className="sm:w-2/5 bg-gray-800 border-2 border-gray-700 rounded-lg pt-4 pb-3 px-5 transform transition duration-300 hover:scale-105 hover:border-indigo-500 hover:shadow-lg"
              >
                <div className="rounded-lg h-56 overflow-hidden">
                  <img alt="content" className="object-cover object-center h-full w-full" src={kwtImage} />
                </div>
                <h2 className="title-font text-2xl font-medium text-white mt-5 mb-3">{card.name}</h2>
                <p className="leading-relaxed text-white">{card.date}</p>
                <p className="leading-relaxed text-white">{card.value}</p>
                <p className="leading-relaxed text-white">{card.lottery}</p>
                <a href="/sale">
                  <button className="flex mx-auto mt-5 text-white bg-blue-500 border-0 py-2 px-5 focus:outline-none hover:bg-blue-600 rounded">
                    COMPRAR
                  </button>
                </a>

                
                {userRole === "admin" && (
                  <button
                    className="mt-3 text-white bg-red-500 border-0 py-2 px-5 focus:outline-none hover:bg-red-600 rounded"
                    onClick={() => deleteCard(card.id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blocks;
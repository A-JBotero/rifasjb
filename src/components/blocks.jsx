import React, { useState } from 'react';
import kwtImage from '../assets/kwt800.png';

const Blocks = () => {
  const [cards, setCards] = useState([]);
  const [userRole, setUserRole] = useState("guest");

  const formatDate = (date) => {
    try {
      const parsedDate = new Date(date);
      return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(parsedDate);
    } catch {
      return date;
    }
  };

  const addCard = () => {
    const newCard = {
      id: Date.now(),
      name: "Nombre PROD", 
      date: formatDate(new Date()), // Fecha actual formateada
      value: "5000", 
      lottery: "Loteria",
    };
    setCards([...cards, newCard]);
  };

  const deleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const editCard = (id) => {
    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        const newName = prompt("Nuevo nombre", card.name) || card.name;
        const newValue = prompt("Nuevo valor", card.value) || card.value;
        const newDateInput = prompt("Nueva fecha (dd/mm/yyyy)", card.date);
        const newDate = newDateInput ? formatDate(newDateInput) : card.date;
        const newLottery = prompt("Nueva lotería", card.lottery) || card.lottery;

        return { ...card, name: newName, value: newValue, date: newDate, lottery: newLottery };
      }
      return card;
    });
    setCards(updatedCards);
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
                <p className="leading-relaxed text-white">Fecha: {card.date}</p>
                <p className="leading-relaxed text-white">Valor: {card.value}</p>
                <p className="leading-relaxed text-white">Lotería: {card.lottery}</p> 

                {userRole !== "admin" && (
                  <a href="/sale">
                    <button className="flex mx-auto mt-5 text-white bg-blue-500 border-0 py-2 px-5 focus:outline-none hover:bg-blue-600 rounded">
                      COMPRAR
                    </button>
                  </a>
                )}

                {userRole === "admin" && (
                  <div className="mt-3 space-x-4">
                    <button
                      className="text-white bg-red-500 border-0 py-2 px-5 focus:outline-none hover:bg-red-600 rounded"
                      onClick={() => deleteCard(card.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="text-white bg-yellow-500 border-0 py-2 px-5 focus:outline-none hover:bg-yellow-600 rounded"
                      onClick={() => editCard(card.id)}
                    >
                      Editar
                    </button>
                  </div>
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
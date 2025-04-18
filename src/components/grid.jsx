import React, { useState, useEffect } from "react";

const Grid = ({ item }) => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [soldNumbers, setSoldNumbers] = useState([]);

  useEffect(() => {
    const fetchSoldNumbers = async () => {
      try {
        const response = await fetch(`http://localhost:5026/Ticket/GetTicketsByRaffle/${item.id}`);
        const data = await response.json();
        const vendidos = data
          .filter(ticket => ticket.state === 2)
          .map(ticket => ticket.number.toString().padStart(2, '0'));
        setSoldNumbers(vendidos);
      } catch (error) {
        console.error("Error al cargar los números vendidos:", error);
      }
    };

    if (item?.id) fetchSoldNumbers();
  }, [item?.id]);

  const handleClick = (number) => {
    if (soldNumbers.includes(number)) return;

    setSelectedNumbers((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number]
    );
  };

  const handlePay = async () => {
    try {
      await Promise.all(
        selectedNumbers.map(async (number) => {
          const response = await fetch("http://localhost:5026/Ticket/UpdateTicketState", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              raffleId: item.id,
              number: parseInt(number, 10),
              state: 2,
            }),
          });

          if (!response.ok) {
            throw new Error(`Fallo al actualizar número ${number}`);
          }
        })
      );

      alert("Números reservados con éxito");
      setSelectedNumbers([]);

      const res = await fetch(`http://localhost:5026/Ticket/GetTicketsByRaffle/${item.id}`);
      const data = await res.json();
      const vendidos = data
        .filter(ticket => ticket.state === 2)
        .map(ticket => ticket.number.toString().padStart(2, '0'));
      setSoldNumbers(vendidos);
    } catch (error) {
      console.error("Error al reservar los números:", error);
      alert("Hubo un problema al reservar los números.");
    }
  };

  const getButtonStyle = (number) => {
    if (soldNumbers.includes(number)) {
      return "bg-red-400 text-black cursor-not-allowed";
    }
    if (selectedNumbers.includes(number)) {
      return "bg-yellow-300 text-black";
    }
    return "bg-white text-black hover:bg-gray-200";
  };

  if (!item || !item.id) {
    return <div className="text-white">Cargando información de la rifa...</div>;
  }

  return (
    <div className="text-white px-4 py-2 flex flex-col items-center">
      <div className="mb-2 text-center">
        <h2 className="text-lg font-bold">Selecciona tus números</h2>
      </div>
      <div
        className="grid gap-2 justify-center"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(48px, 1fr))", maxWidth: "400px" }}
      >
        {Array.from({ length: 100 }, (_, i) => i.toString().padStart(2, '0')).map((number) => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            disabled={soldNumbers.includes(number)}
            className={`w-12 h-12 rounded font-bold ${getButtonStyle(number)}`}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        onClick={handlePay}
        disabled={selectedNumbers.length === 0}
        className={`mt-4 px-4 py-2 rounded font-semibold ${
          selectedNumbers.length === 0
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-green-400 text-black hover:bg-green-500"
        }`}
      >
        Pagar
      </button>
      <p className="mt-2 text-center">
        Total: {selectedNumbers.length} x ${item.ticketPrice || 0} ={" "}
        <strong>{selectedNumbers.length * (item.ticketPrice || 0)}$</strong>
      </p>
    </div>
  );
};

export default Grid;

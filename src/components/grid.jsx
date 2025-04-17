import React, { useState, useEffect } from "react";

const Grid = ({ item }) => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [soldNumbers, setSoldNumbers] = useState([]);

  if (!item || !item.id) {
    return <div style={{ color: "white" }}>Cargando información de la rifa...</div>;
  }

  useEffect(() => {
    const fetchSoldNumbers = async () => {
      try {
        console.log("🟢 Fetching vendidos para raffleId:", item.id);
        const response = await fetch(`http://localhost:5026/Ticket/GetTicketsByRaffle/${item.id}`);
        const data = await response.json();
        console.log("🟢 Tickets recibidos:", data);

        const vendidos = data.filter(ticket => ticket.state === 1).map(ticket => ticket.number);
        console.log("🟢 Números vendidos:", vendidos);
        setSoldNumbers(vendidos);
      } catch (error) {
        console.error("❌ Error al cargar los números vendidos:", error);
      }
    };

    fetchSoldNumbers();
  }, [item.id]);

  const handleClick = (number) => {
    if (soldNumbers.includes(number)) return;

    setSelectedNumbers(prev =>
      prev.includes(number) ? prev.filter(n => n !== number) : [...prev, number]
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
              number: number,
              state: 1,
            }),
          });

          if (!response.ok) {
            throw new Error(`Fallo al actualizar número ${number}`);
          }
        })
      );

      alert("Números reservados con éxito");
      setSelectedNumbers([]);

      // Refrescar vendidos
      const res = await fetch(`http://localhost:5026/Ticket/GetTicketsByRaffle/${item.id}`);
      const data = await res.json();
      const vendidos = data.filter(ticket => ticket.state === 1).map(ticket => ticket.number);
      setSoldNumbers(vendidos);
    } catch (error) {
      console.error("❌ Error al reservar los números:", error);
      alert("Hubo un problema al reservar los números.");
    }
  };

  const getButtonStyle = (number) => {
    if (soldNumbers.includes(number)) {
      return { backgroundColor: "red", color: "white", cursor: "not-allowed" };
    }
    if (selectedNumbers.includes(number)) {
      return { backgroundColor: "orange", color: "white" };
    }
    return {};
  };

  return (
    <div style={{ color: "white", textAlign: "center" }}>
      <h2>Selecciona tus números</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 40px)", gap: "5px", justifyContent: "center" }}>
        {Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            disabled={soldNumbers.includes(number)}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              ...getButtonStyle(number),
            }}
          >
            {number}
          </button>
        ))}
      </div>
      <button onClick={handlePay} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#f1c40f", border: "none", borderRadius: "5px" }}>
        Pagar
      </button>
      <p style={{ marginTop: "10px" }}>
        Total: {selectedNumbers.length} x ${item.ticketPrice || 0} = <strong>{selectedNumbers.length * (item.ticketPrice || 0)}$</strong>
      </p>
    </div>
  );
};

export default Grid;

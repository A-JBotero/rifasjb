import React, { useState, useEffect } from "react";
import { ENDPOINTS } from "../config";

const Grid = ({ item }) => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [pendingNumbers, setPendingNumbers] = useState([]);
  const [soldNumbers, setSoldNumbers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    city: ""
  });
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const fetchSoldNumbers = async () => {
      try {
        const response = await fetch(ENDPOINTS.TICKET.GET_TICKETS_BY_RAFFLE(item.id));
        const data = await response.json();
        const pendientes = data
          .filter(ticket => ticket.state === 2)
          .map(ticket => ticket.number.toString().padStart(2, '0'));
        const vendidos = data
          .filter(ticket => ticket.state === 3)
          .map(ticket => ticket.number.toString().padStart(2, '0'));
        setPendingNumbers(pendientes);
        setSoldNumbers(vendidos);
      } catch (error) {
        console.error("Error al cargar números:", error);
      }
    };

    if (item?.id) fetchSoldNumbers();
  }, [item?.id]);

  const handleClick = (number) => {
    if (soldNumbers.includes(number) || pendingNumbers.includes(number)) return;
    setSelectedNumbers((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number]
    );
  };

  const handlePayButtonClick = () => {
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setPaymentData({
      raffleId: item.id,
      numbers: selectedNumbers.map(Number),
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      customerCity: formData.city,
      total: selectedNumbers.length * (item.ticketPrice || 0)
    });
    setShowModal(false);
    setShowConfirmationModal(true);
  };

  const handleConfirmPayment = async () => {
    try {
      const response = await fetch(ENDPOINTS.APPLICATION_PROCESSING.BUY_TICKET, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) throw new Error("Error al procesar el pago");

      alert("Pago exitoso!");
      setSelectedNumbers([]);
      setFormData({ fullName: "", phoneNumber: "", email: "", city: "" });
      setShowConfirmationModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert(`Hubo un problema: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getButtonStyle = (number) => {
    if (pendingNumbers.includes(number)) {
      return "bg-gray-400 text-black cursor-not-allowed";
    }
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
      {/* Sección de números */}
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

      {/* Total a pagar */}
      <div className="mt-4 p-3 bg-yellow-100 rounded-lg text-center">
        <p className="text-2xl font-bold text-yellow-800">
          TOTAL: ${selectedNumbers.length * (item.ticketPrice || 0)}
        </p>
        <p className="text-sm text-yellow-700 mt-1">
          ({selectedNumbers.length} números x ${item.ticketPrice || 0})
        </p>
      </div>

      {/* Botón de pagar */}
      <button
        onClick={handlePayButtonClick}
        disabled={selectedNumbers.length === 0}
        className={`mt-4 px-6 py-3 rounded-lg font-bold text-lg transition-all
          ${selectedNumbers.length === 0
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-yellow-300 text-black hover:bg-yellow-400 hover:shadow-lg"
          }`}
      >
        PAGAR AHORA
      </button>

      {/* Modal de formulario */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-black mb-4">Datos del comprador</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Ciudad
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Continuar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-black mb-4">Confirmar Compra</h3>

            <div className="text-black mb-4">
              <p><strong>Nombre:</strong> {paymentData?.fullName}</p>
              <p><strong>Teléfono:</strong> {paymentData?.phoneNumber}</p>
              <p><strong>Email:</strong> {paymentData?.email}</p>
              <p><strong>Ciudad:</strong> {paymentData?.customerCity}</p>
              <p className="mt-2">
                <strong>Números:</strong> {paymentData?.numbers.join(', ')}
              </p>
              <p className="text-xl font-bold mt-3">
                Total a Pagar: ${paymentData?.total}
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmPayment}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Confirmar Pago
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grid;

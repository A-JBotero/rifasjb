import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../config";

const Blocks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState("guest");
  const [imagesMap, setImagesMap] = useState({});
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    file: "",
    startDate: "",
    endDate: "",
    state: 1,
    ticketPrice: 0,
    idLottery: 0,
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(ENDPOINTS.RAFFLE.GET_ALL);
      if (!response.ok) {
        const text = await response.text();
        console.error("Error en fetchData:", response.status, text);
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const text = await response.text();
      if (text) {
        try {
          const result = JSON.parse(text);
          if (!Array.isArray(result)) {
            console.warn("Los datos recibidos no son un array:", result);
            setData([]);
            setImagesMap({});
          } else {
            setData(result);
            const newImagesMap = {};
            result.forEach((item) => {
              newImagesMap[item.id] = item.file;
            });
            setImagesMap(newImagesMap);
          }
        } catch (e) {
          console.warn("Error al parsear la respuesta JSON:", e);
          setData([]);
          setImagesMap({});
        }
      } else {
        console.warn("La respuesta del servidor está vacía.");
        setData([]);
        setImagesMap({});
      }

      setLoading(false);
    } catch (err) {
      console.error("Error en fetchData:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBuy = (item) => {
    navigate(`/sale/${item.id}`, {
      state: {
        item: item,
        imagesMap: imagesMap,
      },
    });
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(ENDPOINTS.RAFFLE.DELETE(id), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Error al eliminar el elemento.");

      alert("Elemento eliminado exitosamente.");
      fetchData();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("No se pudo eliminar el elemento.");
    }
  };

  const toggleRole = () => {
    setUserRole((prevRole) => (prevRole === "guest" ? "admin" : "guest"));
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setFormData({ ...item });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      console.log("Datos a enviar para actualizar:", formData); 
      const response = await fetch(ENDPOINTS.RAFFLE.UPDATE, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          raffle: {
            id: Number(formData.id) || 0,
            name: formData.name,
            description: formData.description,
            file: formData.file,
            startDate: formData.startDate,
            endDate: formData.endDate,
            status: Number(formData.state), 
            ticketPrice: Number(formData.ticketPrice),
            idLottery: Number(formData.idLottery),
          },
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Error al actualizar elemento:", response.status, text);
        throw new Error("Error al actualizar el elemento.");
      }

      alert("Elemento actualizado exitosamente.");
      fetchData();
      setEditItem(null);
      setFormData({
        id: "",
        name: "",
        description: "",
        file: "",
        ticketPrice: 0,
        startDate: "",
        endDate: "",
        state: 1,
        idLottery: 0,
      });
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("No se pudo actualizar el elemento.");
    }
  };

  const handleAddNew = async () => {
    try {
      const response = await fetch(ENDPOINTS.RAFFLE.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number(formData.id) || 0,
          name: formData.name,
          description: formData.description,
          file: formData.file,
          startDate: formData.startDate,
          endDate: formData.endDate,
          status: Number(formData.state),
          ticketPrice: Number(formData.ticketPrice),
          idLottery: Number(formData.idLottery),
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Error al añadir elemento:", response.status, text);
        throw new Error("Error al añadir el elemento.");
      }

      alert("Elemento añadido exitosamente.");
      await fetchData();
      setNewItem(false);
      setEditItem(null);
      setFormData({
        id: "",
        name: "",
        description: "",
        file: "",
        ticketPrice: 0,
        startDate: "",
        endDate: "",
        state: 1,
        idLottery: 0,
      });
    } catch (error) {
      console.error("Error al añadir:", error);
      alert("No se pudo añadir el elemento.");
    }
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-darkgray">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex justify-end items-center space-x-4 mb-5">
            <button
              className="text-white bg-gray-500 border-0 py-2 px-5 focus:outline-none hover:bg-gray-600 rounded"
              onClick={toggleRole}
            >
              Cambiar a {userRole === "guest" ? "Admin" : "Guest"}
            </button>
            {userRole === "admin" && (
              <button
                className="text-white bg-green-500 border-0 py-2 px-5 focus:outline-none hover:bg-green-600 rounded"
                onClick={() => {
                  setNewItem(true);
                  setFormData({
                    id: "",
                    name: "",
                    description: "",
                    file: "",
                    ticketPrice: 0,
                    startDate: new Date().toISOString().split("T")[0],
                    endDate: "",
                    state: 1,
                    idLottery: 0,
                  });
                }}
              >
                Crear una nueva rifa
              </button>
            )}
          </div>

          {(editItem || newItem) && (
            <div className="mb-6 bg-gray-800 p-5 rounded-lg">
              <h2 className="text-white text-xl mb-4">
                {editItem ? "Editar Elemento" : "Añadir Nuevo Elemento"}
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                  className="w-full p-2 rounded"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descripción"
                  className="w-full p-2 rounded"
                />
                <input
                  type="text"
                  name="file"
                  value={formData.file}
                  onChange={handleInputChange}
                  placeholder="Archivo"
                  className="w-full p-2 rounded"
                />
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded"
                />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded"
                />
                <input
                  type="number"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleInputChange}
                  placeholder="Precio del boleto"
                  className="w-full p-2 rounded"
                />
                <input
                  type="number"
                  name="idLottery"
                  value={formData.idLottery}
                  onChange={handleInputChange}
                  placeholder="ID de la Lotería"
                  className="w-full p-2 rounded"
                />
                <div className="flex gap-4">
                  <button
                    className="text-white bg-blue-500 border-0 py-2 px-5 focus:outline-none hover:bg-blue-600 rounded"
                    onClick={editItem ? handleUpdate : handleAddNew}
                  >
                    {editItem ? "Actualizar" : "Añadir"}
                  </button>
                  <button
                    className="text-white bg-gray-500 border-0 py-2 px-5 focus:outline-none hover:bg-gray-600 rounded"
                    onClick={() => {
                      setEditItem(null);
                      setNewItem(false);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-6 text-center justify-center">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <div
                  key={item.id || `item-${index}`}
                  className="sm:w-2/5 bg-lightgray border-2 border-gray-900 rounded-lg pt-4 pb-3 px-5 transform transition duration-300 hover:scale-105 hover:border-black hover:shadow-lg"
                >
                  <div className="grid grid-cols-1 gap-4">
                    {imagesMap[item.id] ? (
                      <div className="flex justify-center items-center w-full h-64 bg-gray-200">
                        <img
                          src={`data:image/jpeg;base64,${imagesMap[item.id]}`}
                          alt={`Imagen ${item.name}`}
                          className="object-cover w-full h-full rounded-2xl"
                        />
                      </div>
                    ) : (
                      <p>No hay imágenes disponibles</p>
                    )}
                  </div>

                  <h2 className="title-font text-2xl font-bold text-white mt-5 mb-3">
                    {item.name}
                  </h2>

                  <p className="leading-relaxed text-white">
                    Valor: {item.ticketPrice}
                  </p>

                  <p className="leading-relaxed text-white">
                    Fecha: {item.endDate
                      ? new Date(item.endDate).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Fecha no disponible"}
                  </p>

                  <p className="leading-relaxed text-white">
                    Lotería: {item.idLottery}
                  </p>

                  {userRole !== "admin" && (
                    <button
                      className="inline-flex items-center text-black bg-gold border border-black py-2 px-5 focus:outline-none hover:bg-[#E6C200] hover:scale-105 hover:shadow-lg hover:shadow-black rounded ml-auto transition-all"
                      onClick={() => handleBuy(item)}
                    >
                      COMPRAR
                    </button>
                  )}

                  {userRole === "admin" && (
                    <div className="mt-3 space-x-4">
                      <button
                        className="text-white bg-red-500 border-0 py-2 px-5 focus:outline-none hover:bg-red-600 rounded"
                        onClick={() => deleteItem(item.id)}
                      >
                        Eliminar
                      </button>
                      <button
                        className="text-white bg-yellow-500 border-0 py-2 px-5 focus:outline-none hover:bg-yellow-600 rounded"
                        onClick={() => handleEditClick(item)}
                      >
                        Editar
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-white text-lg">No hay rifas disponibles</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blocks;
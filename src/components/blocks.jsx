import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Blocks = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState("guest");
  const [imagesMap, setImagesMap] = useState({});
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    file: "",
    startDate: "",
    endDate: "",
    status: 1,
    ticketPrice: 0,
    idLottery: 1,
  });
  const fetchData = () => {
    setLoading(true);
    fetch("https://l8sb6dzk-7123.use2.devtunnels.ms/Raffle")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        const newImagesMap = {};
        data.forEach((item) => {
          newImagesMap[item.id] = item.file;
        });
        setImagesMap((prevImagesMap) => ({
          ...prevImagesMap,
          ...newImagesMap,
        }));
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBuy = (item) => {
    navigate("/sale", {
      state: {
        item: item,
        imagesMap: imagesMap,
      },
    });
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(
        `https://l8sb6dzk-7123.use2.devtunnels.ms/Raffle/?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el elemento.");
      }

      alert("Elemento eliminado exitosamente.");

      setData((prevData) => prevData.filter((item) => item.id !== id));
      setImagesMap((prevImagesMap) => {
        const updatedImagesMap = { ...prevImagesMap };
        delete updatedImagesMap[id];
        return updatedImagesMap;
      });
    } catch (error) {
      console.error("Error al realizar la petición DELETE:", error);
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
      const response = await fetch(
        `https://l8sb6dzk-7123.use2.devtunnels.ms/Raffle`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el elemento.");
      }

      alert("Elemento actualizado exitosamente.");

      setData((prevData) =>
        prevData.map((item) => (item.id === formData.id ? formData : item))
      );

      setEditItem(null);
    } catch (error) {
      console.error("Error al realizar la petición PUT:", error);
      alert("No se pudo actualizar el elemento.");
    }
  };

  const handleAddNew = async () => {
    try {
      const response = await fetch(
        `https://l8sb6dzk-7123.use2.devtunnels.ms/Raffle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al añadir el elemento.");
      }

      const newItem = await response.json();
      alert("Elemento añadido exitosamente.");

      setData((prevData) => [...prevData, newItem]);
      setImagesMap((prevImagesMap) => ({
        ...prevImagesMap,
        [newItem.id]: newItem.file,
      }));

      setNewItem(false);
    } catch (error) {
      console.error("Error al realizar la petición POST:", error);
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
                    name: "",
                    description: "",
                    file: "",
                    ticketPrice: 0,
                    startDate: "",
                    endDate: "",
                    status: 1,
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
          )}

          <div className="flex flex-wrap gap-6 text-center justify-center">
            {Array.isArray(data) &&
              data.map((item, index) => (
                <div
                  key={item.id || `item-${index}`}
                  className="sm:w-2/5 bg-lightgray border-2 border-gray-900 rounded-lg pt-4 pb-3 px-5 transform transition duration-300 hover:scale-105 hover:border-black hover:shadow-lg"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
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
                    Fecha:{" "}
                    {item.endDate
                      ? (() => {
                          const parsedDate = new Date(item.endDate);
                          return !isNaN(parsedDate)
                            ? parsedDate.toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "Fecha no válida";
                        })()
                      : "Fecha no disponible"}
                  </p>
                 
                  <p className="leading-relaxed text-white">
                    Lotería: {item.idLottery}
                  </p>

                  {userRole !== "admin" && (
                    <button
                       className="inline-flex items-center text-black bg-gold border border-black py-2 px-5 focus:outline-none hover:bg-[#E6C200] 
                       hover:scale-105
                       hover:shadow-lg hover:shadow-black  rounded ml-auto transition-all"
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
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blocks;

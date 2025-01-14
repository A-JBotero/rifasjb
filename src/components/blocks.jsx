import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Blocks = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState("guest");
  const [imagesMap, setImagesMap] = useState({});
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    file: "",
    startDate: "",
    endDate: "",
    status: 1,
    ticketPrice: 0,
    idLottery: 0,
    value: 0, // Nuevo campo para el valor
  });
  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    fetch("https://f1lt5trd-7123.use2.devtunnels.ms/Raffle")
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
        `https://f1lt5trd-7123.use2.devtunnels.ms/Raffle/?id=${id}`,
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
        `https://f1lt5trd-7123.use2.devtunnels.ms/Raffle`,
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

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

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
          </div>

          {editItem && (
            <div className="mb-6 bg-gray-800 p-5 rounded-lg">
              <h2 className="text-white text-xl mb-4">Editar Elemento</h2>
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
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder="Valor"
                  className="w-full p-2 rounded"
                />
                <button
                  className="text-white bg-blue-500 border-0 py-2 px-5 focus:outline-none hover:bg-blue-600 rounded"
                  onClick={handleUpdate}
                >
                  Actualizar
                </button>
                <button
                  className="text-white bg-gray-500 border-0 py-2 px-5 focus:outline-none hover:bg-gray-600 rounded"
                  onClick={() => setEditItem(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-6 text-center justify-center">
            {Array.isArray(data) &&
              data.map((item) => (
                <div
                  key={item.id}
                  className="sm:w-2/5 bg-gray-800 border-2 border-gray-700 rounded-lg pt-4 pb-3 px-5 transform transition duration-300 hover:scale-105 hover:border-indigo-500 hover:shadow-lg"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
                    {imagesMap[item.id] ? (
                      <div className="flex justify-center items-center w-full h-full bg-gray-200">
                        <img
                          src={`data:image/jpeg;base64,${imagesMap[item.id]}`}
                          alt={`Imagen ${item.name}`}
                          className="object-cover w-full h-full rounded-lg"
                        />
                      </div>
                    ) : (
                      <p>No hay imágenes disponibles</p>
                    )}
                  </div>

                  <h2 className="title-font text-2xl font-medium text-white mt-5 mb-3">
                    {item.name}
                  </h2>

                  <p className="leading-relaxed text-white">
                    Fecha: {new Date(item.startDate).toLocaleDateString("en-CA")}
                  </p>
                  <p className="leading-relaxed text-white">Valor: {item.value}</p>
                  <p className="leading-relaxed text-white">Lotería: {item.lottery}</p>

                  {userRole !== "admin" && (
                    <button
                      className="flex mx-auto mt-5 text-white bg-blue-500 border-0 py-2 px-5 focus:outline-none hover:bg-blue-600 rounded"
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

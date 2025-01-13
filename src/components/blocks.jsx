import React, { useState, useEffect } from "react";

const Blocks = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState("guest");
  const [imagesBase64, setImagesBase64] = useState(null);

  // Fetch inicial de datos
  useEffect(() => {
    fetch("https://f1lt5trd-7123.use2.devtunnels.ms/Raffle")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        const imagesData = data.map((item) => item.file);
        setImagesBase64(imagesData);
        setLoading(false);
        ;
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Función para eliminar un elemento
  const deleteItem = async (id) => {
    try {
      const response = await fetch(`https://f1lt5trd-7123.use2.devtunnels.ms/Raffle/?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error("Error al eliminar el elemento.");
      }
      // Actualiza el estado para reflejar los cambios en la UI
      setData((prevData) => prevData.filter((item) => item.id !== id));
      alert("Elemento eliminado exitosamente.");
      
    } catch (error) {
      console.error("Error al realizar la petición DELETE:", error);
      alert("No se pudo eliminar el elemento.");
    }
  };

  const toggleRole = () => {
    setUserRole((prevRole) => (prevRole === "guest" ? "admin" : "guest"));
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
          

          <div className="flex flex-wrap gap-6 text-center justify-center">
            
            {Array.isArray(data) &&
              data.map((item, index) => (
                
                <div
                  key={item.id}
                  className="sm:w-2/5 bg-gray-800 border-2 border-gray-700 rounded-lg pt-4 pb-3 px-5 transform transition duration-300 hover:scale-105 hover:border-indigo-500 hover:shadow-lg"
                > 
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
  {imagesBase64.length > 0 ? (
    <div
      key={1}
      className="flex justify-center items-center w-full h-full bg-gray-200" // Fondo para asegurar que la imagen ocupe espacio
    >
      <img
        src={`data:image/jpeg;base64,${imagesBase64[index]}`}
        alt={`Imagen ${index + 1}`}
        className="object-cover w-full h-full rounded-lg" // Asegura que la imagen ocupe todo el espacio disponible
      />
    </div>
  ) : (
    <p>No hay imágenes disponibles</p>
  )}
</div>
                 
                  <h2 className="title-font text-2xl font-medium text-white mt-5 mb-3">

                    {item.name}
                  </h2>

                  <p className="leading-relaxed text-white">Fecha: {item.startDate}</p>
                  <p className="leading-relaxed text-white">Valor: {item.value}</p>
                  <p className="leading-relaxed text-white">Lotería: {item.lottery}</p>

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
                        onClick={() => deleteItem(item.id)}
                      >
                        Eliminar
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

import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import NavBar from '../components/navBar';
import Items from '../components/items';
import Footer from '../components/footer';

const Sale = () => {
  const location = useLocation();
  const { id } = useParams();
  const [item, setItem] = useState(location.state?.item || null);
  const [imagesMap, setImagesMap] = useState(
    location.state?.imagesMap || { [item?.id]: item?.file } || {} 
  );
  const [loading, setLoading] = useState(!location.state?.item);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!item) {
      fetch(`http://localhost:5026/Raffle/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('No se pudo cargar la información del producto.');
          }
          return response.json();
        })
        .then((data) => {
          setItem(data);
          setImagesMap(prev => ({ ...prev, [data.id]: data.file }));
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id, item]);

  return (
    <>
      <NavBar />
      {loading ? (
        <p className="text-center text-white mt-10">Cargando...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-10">{error}</p>
      ) : item ? (
        <Items item={item} imagesMap={imagesMap} />
      ) : (
        <p className="text-center text-white mt-10">
          No se encontró información del producto seleccionado.
        </p>
      )}
      <Footer />
    </>
  );
};

export default Sale;
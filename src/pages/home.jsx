import React from 'react';
import NavBar from '../components/navBar';
import Blocks from '../components/blocks';
import Footer from "../components/footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-darkgray"> {/* Contenedor principal */}
      <NavBar />
      <main className="flex-grow"> {/* Contenedor de contenido flexible */}
        <Blocks />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
import React from 'react';
import NavBar from '../components/navBar';
import Blocks from '../components/blocks';
import Footer from "../components/footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-darkgray"> 
      <NavBar />
      <main className="flex-grow"> 
        <Blocks />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
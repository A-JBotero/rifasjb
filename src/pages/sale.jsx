import React from 'react';
import NavBar from '../components/navBar';
import Items from '../components/items';
import Footer from '../components/footer';

const Sale = () => {
  return (
    //renders the navigation bar, cards and footer
    <>
      <NavBar />
      <Items />
      <Footer />
    </>
  );
};

export default Sale;
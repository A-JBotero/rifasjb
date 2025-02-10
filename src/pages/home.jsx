import React from 'react'
import NavBar from '../components/navBar'
import Blocks from '../components/blocks'
import Footer from "../components/footer";
 const Home = () => {
  return (
    //renders the navigation bar, cards and footer
    <>
     <NavBar/>
     <Blocks/>
     <Footer/>
     </>
  )
}

export default Home;
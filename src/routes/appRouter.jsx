import React from 'react'
import { Routes,Route,Navigate } from "react-router-dom";
import  Login  from "../pages/login";
import  Home  from "../pages/home.jsx";
import Sale from "../pages/sale.jsx";
import Grid from "../components/grid.jsx";

const AppRouter = () => {
  return (
    //renders home as the main path and adds the different routes to the application
    <Routes>
      
        <Route path='/login' element={<Login/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/*' element={ <Navigate to="/home" />} />
        <Route path='/sale' element={<Sale/>}/>
        <Route path="/sale/:raffleId" element={<Sale />} />
        
    </Routes>
  )
}
export default AppRouter

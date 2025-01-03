import React from 'react'
import { Routes,Route,Navigate } from "react-router-dom";
import  Login  from "../pages/login";
import  Home  from "../pages/home.jsx";
import Sale from "../pages/sale.jsx"

const AppRouter = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/*' element={ <Navigate to="/home" />} />
        <Route path='/sale' element={<Sale/>}/>
        
    </Routes>
  )
}
export default AppRouter

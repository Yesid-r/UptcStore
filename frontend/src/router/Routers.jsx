import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import Register from '../components/pages/Register'
import RegisterProduct from '../components/product/RegisterProduct'
import ProductDetails from '../components/product/ProductDetails'

const Routers = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/register-product' element={<RegisterProduct/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  )
}

export default Routers
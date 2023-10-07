import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { ShopContextProvider } from './context/shop-context.jsx'
import { CartProvider } from './context/cart.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(

  <CartProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </CartProvider>









)

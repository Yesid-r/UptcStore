import React, { createContext, useEffect, useState } from "react";
import { API_URL } from "../components/utils/constants";



const fetchDataFromAPI = async () => {
  
  const response = await fetch(`${API_URL}/products`);
  const data = await response.json();
  return data.dataProducts;
};

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
   
    const fetchProducts = async () => {
      const data = await fetchDataFromAPI();
      setProducts(data);
      
      
      const defaultCart = {};
      data.forEach((product) => {
        defaultCart[product._id] = 0;
      });
      setCartItems(defaultCart);
    };

    fetchProducts();
  }, []);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = products.find((product) => product._id === itemId);
        totalAmount += cartItems[itemId] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1 > 0 ? prev[itemId] + 1 : 0,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1 > 0 ? prev[itemId] - 1 : 0,
    }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: newAmount > 0 ? newAmount : 0,
    }));
  };

  const checkout = () => {
    setCartItems({});
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

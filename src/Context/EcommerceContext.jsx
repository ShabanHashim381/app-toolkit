import React, { createContext, useContext, useState } from "react";

const EcommerceContext = createContext();

export const useEcommerce = () => useContext(EcommerceContext);

const products = [
  { id: 1, name: "Product One", price: 49.99 },
  { id: 2, name: "Product Two", price: 89.99 },
  { id: 3, name: "Product Three", price: 29.99 },
];

export const EcommerceProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <EcommerceContext.Provider
      value={{ cart, products, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};

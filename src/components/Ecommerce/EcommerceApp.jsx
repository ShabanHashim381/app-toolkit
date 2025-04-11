import React from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { EcommerceProvider } from "../../context/EcommerceContext";

const EcommerceApp = () => {
  return (
    <EcommerceProvider>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">🛍️ Ecommerce App</h1>
        <ProductList />
        <Cart />
        <Checkout />
      </div>
    </EcommerceProvider>
  );
};

export default EcommerceApp;

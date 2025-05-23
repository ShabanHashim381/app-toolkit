import React, { useState, useEffect } from "react";
import ProductList from "../components/Ecommerce/ProductList";
import Cart from "../components/Ecommerce/Cart";
import Checkout from "../components/Ecommerce/Checkout";
import { EcommerceProvider, useEcommerce } from "../context/EcommerceContext";
import SearchBar from "../components/Ecommerce/searchbar";

const EcommerceApp = () => {
  const { products } = useEcommerce();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let filtered;
    if (searchQuery === "") {
      setFilteredProducts(products);
    } else {
      filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <EcommerceProvider>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">🛍️ Ecommerce App</h1>

        <SearchBar onSearch={handleSearch} />

        <ProductList products={filteredProducts} />

        <Cart />
        <Checkout />
      </div>
    </EcommerceProvider>
  );
};

export default EcommerceApp;

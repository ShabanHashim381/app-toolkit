import React from "react";
import { useEcommerce } from "../../context/EcommerceContext";

const ProductList = () => {
  const { products, addToCart } = useEcommerce();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md p-4 rounded-md">
            <h3 className="text-lg font-medium">{product.name}</h3>
            <p className="text-sm text-gray-500">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

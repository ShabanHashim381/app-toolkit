import React from "react";
import { useEcommerce } from "../../context/EcommerceContext";

const Checkout = () => {
  const { cart, clearCart } = useEcommerce();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Checkout</h2>
      <p className="text-gray-600 mb-4">Total: ${total.toFixed(2)}</p>
      <button
        onClick={() => {
          alert("Order placed!");
          clearCart();
        }}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;

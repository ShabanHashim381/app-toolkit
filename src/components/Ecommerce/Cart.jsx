import React from "react";
import { useEcommerce } from "../../context/EcommerceContext";

const Cart = () => {
  const { cart, removeFromCart } = useEcommerce();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Cart</h2>
      {cart.length === 0 ? (
        <p className="text-sm text-gray-500">Cart is empty.</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item, index) => (
            <li
              key={index}
              className="bg-gray-100 px-4 py-2 rounded flex justify-between"
            >
              <span>{item.name}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;

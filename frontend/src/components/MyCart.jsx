import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const API_BASE = import.meta.env.VITE_URI;

const MyCart = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  let c=0
  /* ---------- Fetch Cart + Products ---------- */
  useEffect(() => {
    async function fetchCart() {
      try {
        const user = await axios.get(`${API_BASE}/api/users/user`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log(user)

        const groceries = await axios.get(`${API_BASE}/api/products/`);
        const filtered=groceries.data.filter((item)=>item.inStock==true)
        setCart(user.data.cart);
        setProducts(filtered);

      } catch (err) {
        console.error(err);
      }
    }
    fetchCart();
  }, []);

  /* ---------- Helpers ---------- */
  const getProduct = (id) =>
    products.find((p) => p._id === id);

  /* ---------- Increment ---------- */
  async function increment(id) {
    try {
      await axios.patch(
        `${API_BASE}/api/users/add/cart`,
        { id },
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      setCart((prev) =>
        prev.map((item) =>
          item.product === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  /* ---------- Decrement ---------- */
  async function decrement(id) {
    try {
      await axios.patch(
        `${API_BASE}/api/users/remove/cart`,
        { id },
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      setCart((prev) =>
        prev
          .map((item) =>
            item.product === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    } catch (err) {
      console.error(err);
    }
  }

  /* ---------- Remove Item ---------- */
  async function removeItem(id) {
    try {
      await axios.patch(
        `${API_BASE}/api/users/remove/cart`,
        { id, removeAll: true },
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      setCart((prev) =>
        prev.filter((item) => item.product !== id)
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
<div className="flex justify-center">
      <div className="bg-white rounded-xl my-6 w-[92%] py-6">
        
          <><h2 className="px-10 text-xl font-bold mb-6">
          My Cart
        </h2>
        
        <div className="px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => {
              const product = getProduct(item.product);
              if (!product || product.inStock==false) return null;
              c+=1
              return (
                <div
                  key={item.product}
                  className="border rounded-xl shadow-md 
                             hover:shadow-xl transition-all bg-white"
                >
                  {/* Image */}
                  <div className="h-40 overflow-hidden rounded-t-xl">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4 text-center">
                    <p className="font-semibold text-lg truncate">
                      {product.name}
                    </p>
                    <p className="text-gray-600 mt-1">
                      ₹{product.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex justify-center items-center gap-4 mt-4">
                      <button
                        onClick={() => decrement(product._id)}
                        className="px-3 py-1 text-lg font-bold 
                                   bg-gray-100 rounded hover:bg-red-100"
                      >
                        −
                      </button>

                      <span className="font-semibold text-lg">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increment(product._id)}
                        className="px-3 py-1 text-lg font-bold 
                                   bg-gray-100 rounded hover:bg-green-100"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(product._id)}
                      className="mt-4 w-full py-2 text-sm font-semibold 
                                 text-red-600 border border-red-300 
                                 rounded-lg hover:bg-red-50 transition"
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div></>
          {c==0?<div className="flex justify-center text-2xl items-center text-gray-500 h-[70vh] py-10">
            Your cart is empty 🛒
          </div>:<div className="w-full flex justify-center items-center">
          <NavLink to="/checkout" className="w-25 m-4 text-center bg-green-600 text-white font-semibold px-2 py-3 rounded-lg hover:bg-green-700">CheckOut</NavLink>
          </div>}
          
       
        

      </div>
    </div>
    
  );
};

export default MyCart;

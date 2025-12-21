import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_URI;

const AllGrocery = () => {
  const [products, setProducts] = useState([]);
  const [counts, setCounts] = useState({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const groceries = await axios.get(`${API_BASE}/api/products/`);
        setProducts(groceries.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProducts();
  }, []);

  /* ---------- Count Logic ---------- */
  const increment = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrement = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  /* ---------- Search + Filter Logic ---------- */
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "All" || item.category === category;

      return matchSearch && matchCategory;
    });
  }, [products, search, category]);

  return (
    <div id="grocery" className="flex justify-center">
      <div className="bg-white rounded-xl my-6 w-[92%] py-6">

        {/* Search & Filter */}
        <div className="px-10 flex flex-wrap gap-6 justify-between items-center">
          
          {/* Search */}
          <div className="w-full md:w-[50%]">
            <div className="flex items-center bg-gray-100 h-12 rounded-lg px-4">
              <input
                className="w-full bg-transparent outline-none text-gray-700"
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="text-gray-500">🔍</span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-[25%]">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-yellow-100 border border-yellow-300 rounded-lg py-3 px-4 font-semibold outline-none hover:bg-yellow-200 transition"
            >
              <option value="All">All Categories</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Masala">Masala</option>
              <option value="Grocery">Grocery</option>
            </select>
          </div>
        </div>

        {/* Title */}
        <div className="px-10 my-6 font-bold text-xl">
          All Products ({filteredProducts.length})
        </div>

        {/* Products Grid (4 per row) */}
        <div className="px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => {
            const count = counts[item._id] || 0;

            return (
              <div
                key={item._id}
                className="border rounded-xl overflow-hidden shadow-md 
                           hover:shadow-xl transform hover:-translate-y-2 
                           transition-all duration-300 group bg-white"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-full w-full object-cover 
                               group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Hover Controls */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg">
                      <button
                        className="text-lg font-bold px-2 hover:text-red-500"
                        onClick={() => decrement(item._id)}
                      >
                        −
                      </button>

                      <span className="font-semibold text-lg">{count}</span>

                      <button
                        className="text-lg font-bold px-2 hover:text-green-600"
                        onClick={() => increment(item._id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 text-center">
                  <p className="font-semibold text-base truncate">
                    {item.name}
                  </p>
                  <p className="text-gray-600 mt-1">₹{item.price}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {item.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No products found 😕
          </div>
        )}
      </div>
    </div>
  );
};

export default AllGrocery;

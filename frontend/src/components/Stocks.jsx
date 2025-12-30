import axios from "axios";
import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_URI;

const Stocks = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    async function fetchProducts() {
      const stocks = await axios.get(`${API_BASE}/api/products`);
      setProducts(stocks.data);
    }
    fetchProducts();
  }, []);

  async function toggleStock(id) {
    await axios.patch(`${API_BASE}/api/products/edit/${id}`);
  }

  return (
    <>
      {products && (
        <div className="flex-1 mt-10 pt-10 bg-green-50">
          <div className="w-full md:p-10 p-4">
            <div className="flex justify-center items-center">
            <h2 className="text-3xl font-semibold text-green-700 mb-6">
              Stocks Management
            </h2>
            </div>

            <div className="flex justify-center items-center w-full overflow-hidden rounded-lg bg-white border border-green-300 shadow">
              <table className="w-full  table-auto">
                <thead className="bg-green-700 text-white text-sm">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Product</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold hidden md:block">
                      Price
                    </th>
                    <th className="px-4 py-3 font-semibold text-center">
                      Availability
                    </th>
                  </tr>
                </thead>

                <tbody className="text-sm  text-gray-700">
                  {products.map((product, index) => (
                    <tr
                      key={index}
                      className="border-t border-green-200 hover:bg-green-100 transition"
                    >
                      {/* Product */}
                      <td className="px-4 py-3 flex items-center gap-3">
                        <div className="border border-green-300 rounded overflow-hidden">
                          <img
                            src={product.img}
                            alt={product.name}
                            className="w-14 h-14 object-cover"
                          />
                        </div>
                        <span className="font-medium">
                          {product.name}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3">{product.category}</td>

                      {/* Price */}
                      <td className="px-4 py-3">
                        ₹{product.price}
                      </td>

                      {/* Toggle */}
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-3">
                          {/* Status Badge */}
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold
                            ${
                              product.inStock
                                ? "bg-green-300 text-green-900"
                                : "bg-yellow-300 text-yellow-900"
                            }`}
                          >
                            {product.inStock ? "Available" : "Not Available"}
                          </span>

                          {/* Switch */}
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked={product.inStock}
                              onClick={() => toggleStock(product._id)}
                            />
                            <div className="w-11 h-6 bg-yellow-300 rounded-full peer peer-checked:bg-green-700 transition"></div>
                            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></span>
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Stocks;

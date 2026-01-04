import axios from "axios";
import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_URI;

const Stocks = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [name, setname] = useState();
  const [brand, setbrand] = useState();
  const [price, setprice] = useState();
  const [quantity, setquantity] = useState();
  const [category, setcategory] = useState();
  const [exp_date, setexp_date] = useState();

  useEffect(() => {
    async function fetchProducts() {
      const stocks = await axios.get(`${API_BASE}/api/products`);
      setProducts(stocks.data);
    }
    fetchProducts();
  }, []);

  async function toggleStock(id) {
    const token = localStorage.getItem("token");
    await axios.patch(
      `${API_BASE}/api/products/edit/${id}`,
      {},
      { headers: { Authorization: token } }
    );
  }

  async function editData(id) {
    const data = products.find((item) => item._id === id);
    setname(data.name);
    setbrand(data.brand);
    setquantity(data.quantity);
    setcategory(data.category);
    setprice(data.price);
    setexp_date(data.exp_date);
  }

  async function saveData(id) {
    const payload = { name, brand, quantity, category, price, exp_date };
    const response = await axios.patch(
      `${API_BASE}/api/products/edit`,
      { id, payload },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    if (response.status !== 404) {
      alert("Successfully Edited the Product");
      setEditingId(null);
    }
  }

  async function deleteProduct(id) {
    const response = await axios.delete(
      `${API_BASE}/api/products/delete/${id}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    if (response.status !== 404) {
      alert("Product Deleted Successfully");
    }
  }

  return (
    <div className="flex-1 mt-10 pt-10 bg-green-50">
      <div className="w-full p-4 md:p-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-6 text-center">
          Stocks Management
        </h2>

        {/* TABLE WRAPPER */}
        <div className="overflow-x-auto bg-white border border-green-300 rounded-lg shadow">
          <table className="min-w-[900px] w-full table-auto text-sm">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Expiry</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {products.map((product) => {
                const isEditing = editingId === product._id;

                return (
                  <tr
                    key={product._id}
                    className="border-t border-green-200 hover:bg-green-100 transition"
                  >
                    {/* PRODUCT */}
                    <td className="px-4 py-3 flex items-center gap-3">
                      {!isEditing && (
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded border"
                        />
                      )}

                      {isEditing ? (
                        <input
                          value={name}
                          onChange={(e) => setname(e.target.value)}
                          className="border px-2 py-1 rounded w-32"
                        />
                      ) : (
                        <span className="font-medium">{product.name}</span>
                      )}
                    </td>

                    {/* BRAND */}
                    <td className="px-4 py-3 text-center">
                      {isEditing ? (
                        <input
                          value={brand}
                          onChange={(e) => setbrand(e.target.value)}
                          className="border px-2 py-1 rounded w-24"
                        />
                      ) : (
                        product.brand
                      )}
                    </td>

                    {/* EXPIRY */}
                    <td className="px-4 py-3 text-center">
                      {isEditing ? (
                        <input
                          type="date"
                          value={exp_date}
                          onChange={(e) => setexp_date(e.target.value)}
                          className="border px-2 py-1 rounded w-28"
                        />
                      ) : (
                        product.exp_date
                      )}
                    </td>

                    {/* CATEGORY */}
                    <td className="px-4 py-3 text-center">
                      {isEditing ? (
                        <input
                          value={category}
                          onChange={(e) => setcategory(e.target.value)}
                          className="border px-2 py-1 rounded w-24"
                        />
                      ) : (
                        product.category
                      )}
                    </td>

                    {/* QUANTITY */}
                    <td className="px-4 py-3 text-center">
                      {isEditing ? (
                        <input
                          value={quantity}
                          onChange={(e) => setquantity(e.target.value)}
                          className="border px-2 py-1 rounded w-20"
                        />
                      ) : (
                        product.quantity
                      )}
                    </td>

                    {/* PRICE */}
                    <td className="px-4 py-3 text-center">
                      {isEditing ? (
                        <input
                          value={price}
                          onChange={(e) => setprice(e.target.value)}
                          className="border px-2 py-1 rounded w-24"
                        />
                      ) : (
                        `₹${product.price}`
                      )}
                    </td>

                    {/* STATUS */}
                    <td className="px-4 py-3 text-center">
                      {!isEditing && (
                        <div className="flex items-center justify-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              product.inStock
                                ? "bg-green-300 text-green-900"
                                : "bg-yellow-300 text-yellow-900"
                            }`}
                          >
                            {product.inStock ? "Available" : "Not Available"}
                          </span>

                          <input
                            type="checkbox"
                            defaultChecked={product.inStock}
                            onClick={() => toggleStock(product._id)}
                          />
                        </div>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-4 py-3 text-center">
                      {!isEditing ? (
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                          <button
                            onClick={() => {
                              editData(product._id);
                              setEditingId(product._id);
                            }}
                            className="px-3 py-1 text-xs bg-blue-600 text-white rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                          <button
                            onClick={() => saveData(product._id)}
                            className="px-3 py-1 text-xs bg-green-600 text-white rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 text-xs bg-gray-400 text-white rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stocks;

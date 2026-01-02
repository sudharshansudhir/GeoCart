import axios from "axios";
import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_URI;

const UserOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const orderRes = await axios.get(
          `${API_BASE}/api/users/orders`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        const productRes = await axios.get(
          `${API_BASE}/api/products`
        );

        setOrders(orderRes.data.orderlist);
        setProducts(productRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  /* ---------- HELPERS ---------- */
  const getProduct = (id) =>
    products.find((p) => p._id === id);

  /* ---------- GROUP ORDERS BY PAYMENT ID ---------- */
  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.paymentId]) {
      acc[order.paymentId] = [];
    }
    acc[order.paymentId].push(order);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-gray-500">
        Loading orders...
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 text-gray-500">
        <p className="text-lg font-semibold">
          No Orders Found
        </p>
        <p className="text-sm mt-1">
          You haven’t placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <h1 className="text-3xl font-semibold mb-8">
        My Orders
      </h1>

      <div className="space-y-8">
        {Object.entries(groupedOrders).map(
          ([paymentId, orderItems]) => {
            const totalAmount = orderItems.amount
            console.log(totalAmount)
            return (
              <div
                key={paymentId}
                className="border rounded-lg bg-white shadow-sm"
              >
                {/* ORDER HEADER */}
                <div className="flex justify-between items-center px-5 py-4 border-b">
                  <div>
                    <p className="text-xs text-gray-500">
                      Payment ID
                    </p>
                    <p className="font-semibold text-sm text-green-600">
                      {paymentId}
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    Paid
                  </span>
                </div>

                {/* ORDER ITEMS */}
                <div className="divide-y">
                  {orderItems.map((order) => {
                    const product = getProduct(order.product);
                    if (!product) return null;

                    return (
                      <div
                        key={order._id}
                        className="flex gap-4 items-center px-5 py-4"
                      >
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-20 h-20 border rounded object-cover"
                        />

                        <div className="flex-1">
                          <p className="font-semibold">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {order.quantity}
                          </p>
                          <p className="text-sm text-gray-500">
                            Price: ₹{product.price}
                          </p>
                        </div>

                        <p className="font-semibold">
                          ₹{product.price*order.quantity}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* ORDER TOTAL */}
                <div className="flex justify-end px-5 py-4 bg-gray-50">
                  <p className="text-lg font-semibold">
                    Total: ₹{totalAmount / 100}
                  </p>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default UserOrderList;

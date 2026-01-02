import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_URI;

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [Id, setId] = useState(0);
  const [showAddress, setShowAddress] = useState(false);
  const [myOrder, setMyorder] = useState();
  const navigate=useNavigate()
  /* ---------- FETCH CART + PRODUCTS ---------- */
  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await axios.get(`${API_BASE}/api/users/user`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setId(userRes.data._id)

        const productRes = await axios.get(`${API_BASE}/api/products`);

        setCart(userRes.data.cart);
        const filtered=productRes.data.filter((item)=>item.inStock==true)
        setProducts(filtered);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  /* ---------- HELPERS ---------- */
  const getProduct = (id) =>
    products.find((p) => p._id === id);

  
  
  /* ---------- REMOVE ITEM ---------- */
async function clearcart(id) {
    const res=await axios.patch(
        `${API_BASE}/api/users/remove/cart`,{id,clearall:true},{
          headers:{
            Authorization:localStorage.getItem("token")
          }
        })

}

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
    
  



  /* ---------- TOTAL CALCULATION ---------- */
  const itemsTotal = cart.reduce((sum, item) => {
    const product = getProduct(item.product);
    if (!product) return sum;
    return sum + product.price * item.quantity;
  }, 0);

  const tax = Math.round(itemsTotal * 0.05);
  const total = itemsTotal + tax;

  /* ---------- STOCK VALIDATION ---------- */
  const hasStockIssue = cart.some((item) => {
    const product = getProduct(item.product);
    return (
      !product ||
      !product.inStock ||
      product.quantity < item.quantity
    );
  });


  const handlePayment = async () => {
  try {
    // 1️⃣ Create order
    const { data: order } = await axios.post(
      `${API_BASE}/api/payment/create-order`,
      { amount: total },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    // 2️⃣ Razorpay options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "GeoCart",
      description: "Grocery Order Payment",
      order_id: order.id,

      handler: async function (response) {
        // 3️⃣ Verify payment
        const verify = await axios.post(
          `${API_BASE}/api/payment/verify`,
          response
        );

        if (verify.data.success) {
          // setMyorder(cart)
        async function settingOrder() {
          const data=await axios.patch(`${API_BASE}/api/users/orders`,{cart,paymentId:order.id,amount:order.amount},{
            headers:{
              Authorization:localStorage.getItem("token")
            }
          })          
          console.log("..",data)
        }
          settingOrder()
          clearcart(Id)
          alert("Payment Successful 🎉");
          navigate("/orders")
          // console.log(myOrder)

          // 👉 clear cart / redirect
       
        }
      },

      prefill: {
        name: "GeoCart User",
        email: "user1@email.com",
        contact: "9876543210",
      },
      theme: {
        color: "#16a34a",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  } catch (err) {
    console.error(err);
    alert("Payment failed");
  }
};

function getOrder(){
  console.log(myOrder)
}


  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto gap-10">
      {/* LEFT - CART ITEMS */}
      <div className="flex-1">
        <h1 className="text-3xl font-semibold mb-6">
          Checkout
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 font-medium pb-3 border-b">
          <p>Product</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cart.map((item) => {
          const product = getProduct(item.product);
          if (!product) return null;

          const isOutOfStock =
            !product.inStock ||
            product.quantity < item.quantity;

          const subtotal =
            product.price * item.quantity;

          return (
            <div
              key={item.product}
              className="grid grid-cols-[2fr_1fr_1fr] items-center py-4 border-b text-sm"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-24 h-24 border rounded object-cover"
                />

                <div>
                  <p className="font-semibold">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity}
                  </p>

                  {isOutOfStock && (
                    <p className="text-xs text-red-600 font-semibold">
                      Out of stock
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 mt-4">
                      <button
                        onClick={() => decrement(product._id)}
                        className="px-3 py-1 text-lg font-bold 
                                   bg-gray-100 rounded hover:bg-red-100"
                      >
                        −
                      </button>

                      <span className="font-semibold text-lg">
                        ₹{subtotal}
                      </span>

                      <button
                        onClick={() => increment(product._id)}
                        className="px-3 py-1 text-lg font-bold 
                                   bg-gray-100 rounded hover:bg-green-100"
                      >
                        +
                      </button>
                    </div>

              <button
                onClick={() =>
                  removeItem(product._id)
                }
                className="mx-auto text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      {/* RIGHT - ORDER SUMMARY */}
      <div className="w-full md:w-[360px] bg-gray-50 border rounded-lg p-5 h-fit">
        <h2 className="text-xl font-semibold mb-4">
          Order Summary
        </h2>

        {/* Address */}
        <div className="mb-6">
          <p className="text-sm font-medium uppercase mb-1">
            Delivery Address
          </p>
          <div className="relative">
            <div className="flex justify-between">
              <p className="text-gray-500 text-sm">
                No address selected
              </p>
              <button
                onClick={() =>
                  setShowAddress(!showAddress)
                }
                className="text-green-600 text-sm hover:underline"
              >
                Change
              </button>
            </div>

            {showAddress && (
              <div className="absolute z-10 mt-2 bg-white border rounded w-full text-sm">
                <p className="p-2 hover:bg-gray-100 cursor-pointer">
                  Chennai, India
                </p>
                <p className="p-2 text-center text-green-600 hover:bg-green-50 cursor-pointer">
                  + Add Address
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Payment */}
        <div className="mb-6">
          <p className="text-sm font-medium uppercase mb-1">
            Payment Method
          </p>
          <select className="w-full border px-3 py-2 rounded outline-none">
            <option value="COD">
              Cash On Delivery
            </option>
            <option value="ONLINE">
              Online Payment
            </option>
          </select>
        </div>

        <hr />

        {/* Totals */}
        <div className="text-sm text-gray-600 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Items Total</span>
            <span>₹{itemsTotal}</span>
          </p>
          <p className="flex justify-between">
            <span>Delivery</span>
            <span className="text-green-600">
              Free
            </span>
          </p>
          <p className="flex justify-between">
            <span>Tax (5%)</span>
            <span>₹{tax}</span>
          </p>
          <p className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>₹{total}</span>
          </p>
        </div>

  
        <button
  onClick={()=>handlePayment()}
  // disabled={hasStockIssue || cart.length === 0}
  className="w-full mt-6 bg-green-600 text-white py-3 rounded 
             hover:bg-green-700 transition disabled:bg-gray-400"
>
  Pay ₹{total}
</button>


<h1 onClick={()=>getOrder()}>Click me</h1>

      </div>
    </div>
  );
};

export default Checkout;

import React, { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_URI;

const ChatWindow = ({ onClose }) => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function sendPrompt() {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE}/api/ai/recipe`,
        { prompt },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setResult(res.data);
    } catch (err) {
      alert("AI failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function addAllToCart() {
    for (const item of result.available) {
      await axios.patch(
        `${API_BASE}/api/users/add/cart`,
        { id: item.productId },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    }
    alert("All ingredients added to cart!");
  }

  return (
    <div
      className="
        fixed inset-0 md:inset-auto
        md:bottom-24 md:right-6
        z-50
        bg-white
        md:w-[380px]
        md:max-h-[80vh]
        md:rounded-2xl
        shadow-2xl
        flex flex-col
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white md:rounded-t-2xl">
        <div>
          <p className="font-semibold text-sm">GeoCart AI Chef 🤖</p>
          <p className="text-xs text-green-100">
            Ask recipes • Auto add items
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-white text-xl hover:scale-110 transition"
        >
          ✖
        </button>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Input */}
        <textarea
          placeholder="Eg: Chicken biryani for 5 people under ₹500"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          className="
            w-full border rounded-lg p-3 text-sm
            outline-none focus:ring-2 focus:ring-green-400
          "
        />

        <button
          onClick={sendPrompt}
          className="
            w-full py-2.5 rounded-lg text-white font-medium
            bg-green-600 hover:bg-green-700 transition
            disabled:bg-gray-400
          "
          disabled={loading}
        >
          {loading ? "🤔 Thinking..." : "Generate Ingredients"}
        </button>

        {/* RESULT */}
        {result && (
          <>
            {/* AVAILABLE */}
            <div>
              <h3 className="font-semibold text-green-700 mb-2">
                ✅ Available Ingredients
              </h3>

              <div className="space-y-2">
                {result.available.map((item) => (
                  <div
                    key={item.productId}
                    className="border rounded-lg p-3 text-sm bg-green-50"
                  >
                    <p className="font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-gray-600">
                      Needed: {item.requiredQty}
                    </p>
                    <p className="text-gray-600">
                      Price: ₹{item.price}
                    </p>
                  </div>
                ))}
              </div>

              {result.available.length > 0 && (
                <button
                  onClick={addAllToCart}
                  className="
                    w-full mt-3 py-2.5 rounded-lg
                    bg-green-600 text-white font-semibold
                    hover:bg-green-700 transition
                  "
                >
                  🛒 Add All to Cart
                </button>
              )}
            </div>

            {/* UNAVAILABLE */}
            {result.unavailable.length > 0 && (
              <div>
                <h3 className="font-semibold text-red-600 mt-4 mb-2">
                  ❌ Unavailable Items
                </h3>

                <div className="space-y-1">
                  {result.unavailable.map((item, i) => (
                    <p
                      key={i}
                      className="text-sm text-gray-600 bg-red-50 px-3 py-1 rounded"
                    >
                      {item.name} ({item.requiredQty})
                    </p>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* FOOTER (Mobile hint) */}
      <div className="md:hidden text-center text-xs text-gray-400 py-2">
        Swipe down or tap ✖ to close
      </div>
    </div>
  );
};

export default ChatWindow;

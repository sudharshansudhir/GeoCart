import React from "react";

const About = () => {
  return (
    <div id="about" className="relative overflow-hidden">

      {/* Soft Background Blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>

      <div className="relative flex justify-center py-16">
        <div className="w-[90%] max-w-6xl">

          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-green-700">
              About GeoCart
            </h1>
            <p className="mt-4 text-gray-700 max-w-3xl mx-auto text-lg">
              Fresh groceries, everyday essentials, and a shopping experience
              inspired by nature.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div className="bg-gradient-to-br from-green-50 to-yellow-50 p-8 rounded-3xl shadow-md hover:shadow-xl transition hover:-translate-y-2">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                🌿 Who We Are
              </h2>
              <p className="text-gray-700 leading-relaxed">
                GeoCart is your neighborhood-friendly online grocery store,
                bringing farm-fresh vegetables, fruits, and daily essentials
                straight to your home. We believe good food starts with
                freshness and care.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 p-8 rounded-3xl shadow-md hover:shadow-xl transition hover:-translate-y-2">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                🛒 What We Offer
              </h2>
              <ul className="text-gray-700 space-y-3">
                <li>✔ Fresh vegetables & fruits</li>
                <li>✔ Quality groceries & masalas</li>
                <li>✔ Handpicked daily essentials</li>
                <li>✔ Affordable, honest pricing</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-green-50 to-yellow-50 p-8 rounded-3xl shadow-md hover:shadow-xl transition hover:-translate-y-2">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                💛 Our Promise
              </h2>
              <p className="text-gray-700 leading-relaxed">
                From careful sourcing to doorstep delivery, we promise quality,
                freshness, and convenience in every order. Your family’s food
                deserves the best.
              </p>
            </div>
          </div>

          {/* Highlight Strip */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-lime-500 rounded-3xl p-10 text-center text-white shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Freshness You Can See. Quality You Can Taste.
            </h2>
            <p className="text-green-100 max-w-3xl mx-auto">
              GeoCart brings nature closer to your kitchen with carefully
              selected groceries, reliable delivery, and a shopping experience
              that feels simple and warm.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;

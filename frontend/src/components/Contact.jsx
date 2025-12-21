import React from "react";

const Contact = () => {
  return (
    <div id="contact" className="relative overflow-hidden">

      {/* Soft Background Accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#9bc197] rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 -right-24 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-40"></div>

      <div className="relative flex justify-center py-16">
        <div className="w-[90%] max-w-6xl">

          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-green-700">
              Get in Touch
            </h1>
            <p className="mt-4 text-gray-700 text-lg max-w-2xl mx-auto">
              Have questions about our products, delivery, or orders?
              We’re here to help you with fresh solutions.
            </p>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-green-50 to-yellow-50 p-8 rounded-3xl shadow-md">
              <h2 className="text-2xl font-semibold text-green-700 mb-6">
                🌿 Contact Information
              </h2>

              <div className="space-y-5 text-gray-700">
                <p>
                  📍 <span className="font-semibold">Address:</span>  
                  <br /> GeoCart Fresh Market, Chennai, Tamil Nadu
                </p>

                <p>
                  📞 <span className="font-semibold">Phone:</span>  
                  <br /> +91 98765 43210
                </p>

                <p>
                  📧 <span className="font-semibold">Email:</span>  
                  <br /> support@geocart.com
                </p>

                <p>
                  ⏰ <span className="font-semibold">Working Hours:</span>  
                  <br /> Mon – Sun : 7:00 AM – 9:00 PM
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <h2 className="text-2xl font-semibold text-green-700 mb-6">
                🛒 Send Us a Message
              </h2>

              <form className="space-y-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
                />

                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition active:scale-95"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>

          {/* Footer Note */}
          <div className="text-center mt-14 text-gray-600">
            🌱 We value freshness, transparency, and your trust.
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;

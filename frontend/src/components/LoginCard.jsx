import React, { useState } from "react";
import logo from "../assets/GeoCart-Logo.png";
import axios from "axios";
const API_BASE = import.meta.env.VITE_URI;

const LoginCard = () => {
  const [isLogin, setIsLogin] = useState(true);

  

  // State to store user input
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Placeholder auth functions
  async function authLogin() {
    const result=await axios.post(`${API_BASE}/api/users/login`,{
        email:userData.email,
        password:userData.password
    })

    console.log(result)
  }

    //   name:"String",
    // email:"String",
    // phonenumber:"String",
    // password:"String",
    // address:"String",
    // cart:[{type:"String"}]

  async function authRegister() {
    const result=await axios.post(`${API_BASE}/api/users/add`,{
        name:userData.name,
        email:userData.email,
        phonenumber:userData.phone,
        password:userData.password,
        address:userData.address,
    })
    console.log(result)
  }


  return (
    <div className="flex h-screen w-full bg-green-50">
      {/* Left side image for desktop */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-green-100">
        <img src={logo} alt="GeoCart Logo" className="w-64 h-64 object-contain" />
      </div>

      {/* Right side form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 md:px-20">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-lg flex flex-col items-center">

          {/* Toggle Login/Register */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 font-semibold rounded-full ${
                isLogin ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
              } transition`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 font-semibold rounded-full ${
                !isLogin ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
              } transition`}
            >
              Register
            </button>
          </div>

          {isLogin ? (
            <form className="w-full flex flex-col gap-4">
              <h2 className="text-3xl font-bold text-green-700 mb-2">Sign In</h2>
              <p className="text-gray-600 text-sm mb-4 text-center">
                Welcome back! Please login to continue.
              </p>

              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full h-12 px-5 rounded-full border border-gray-300 placeholder-gray-400 text-gray-600 focus:ring-2 focus:ring-green-300 outline-none"
                required
              />

              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full h-12 px-5 rounded-full border border-gray-300 placeholder-gray-400 text-gray-600 focus:ring-2 focus:ring-green-300 outline-none"
                required
              />

              <div className="flex justify-between items-center text-sm text-gray-500">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  Remember me
                </label>
                <a href="#" className="underline hover:text-green-700">
                  Forgot password?
                </a>
              </div>

              <button
                type="button"
                onClick={authLogin}
                className="w-full h-12 rounded-full bg-green-600 text-white font-semibold mt-4 hover:bg-green-700 transition"
              >
                Login
              </button>
            </form>
          ) : (
            <form className="w-full flex flex-col gap-4">
              <h2 className="text-3xl font-bold text-green-700 mb-2">Sign Up</h2>
              <p className="text-gray-600 text-sm mb-4 text-center">
                Create your account to start shopping.
              </p>

              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full h-12 px-5 rounded-full border border-gray-300 placeholder-gray-400 text-gray-600 focus:ring-2 focus:ring-green-300 outline-none"
                required
              />
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full h-12 px-5 rounded-full border border-gray-300 placeholder-gray-400 text-gray-600 focus:ring-2 focus:ring-green-300 outline-none"
                required
              />
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full h-12 px-5 rounded-full border border-gray-300 placeholder-gray-400 text-gray-600 focus:ring-2 focus:ring-green-300 outline-none"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full h-12 px-5 rounded-full border border-gray-300 placeholder-gray-400 text-gray-600 focus:ring-2 focus:ring-green-300 outline-none"
                required
              />
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full h-12 px-5 rounded-full border border-gray-300 placeholder-gray-400 text-gray-600 focus:ring-2 focus:ring-green-300 outline-none"
                required
              />
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full h-12 px-5 rounded-full border border-gray-300 placeholder-gray-400 text-gray-600 focus:ring-2 focus:ring-green-300 outline-none"
                required
              />

              <button
                type="button"
                onClick={authRegister}
                className="w-full h-12 rounded-full bg-green-600 text-white font-semibold mt-2 hover:bg-green-700 transition"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginCard;

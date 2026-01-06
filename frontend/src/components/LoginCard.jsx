import React, { useState } from "react";
import logo from "../assets/GeoCart-Logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
const API_BASE = import.meta.env.VITE_URI;

const LoginCard = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // 👁️ Password toggle states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  async function authLogin() {
    try {
      const result = await axios.post(`${API_BASE}/api/users/login`, {
        email: userData.email,
        password: userData.password,
      });

      if (result.data.isAdmin) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("isAdmin", true);
        localStorage.setItem("isUser", false);
        alert("Welcome Admin");
        navigate("/admin");
      } else {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("isUser", true);
        localStorage.setItem("isAdmin", false);
        alert("Logged In Successfully");
        navigate("/");
      }
    } catch (e) {
      alert(e.response?.data?.message);
    }
  }

  async function authRegister() {
    try {
      const result = await axios.post(`${API_BASE}/api/users/add`, {
        name: userData.name,
        email: userData.email,
        phonenumber: userData.phone,
        password: userData.password,
        address: userData.address,
      });

      if (result.status !== 404) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("isUser", true);
        localStorage.setItem("isAdmin", false);

        setUserData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          address: "",
          phone: "",
        });

        alert("Registered Successfully");
        navigate("/");
      }
    } catch (e) {
      alert(e.response?.data?.message);
    }
  }

  return (
    <div className="flex h-screen w-full bg-green-50 p-6">
      {/* Left side image */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-green-100">
        <img src={logo} alt="GeoCart Logo" className="w-64 h-64 object-contain" />
      </div>

      {/* Right side form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 md:px-20">
        <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center">
          {/* Toggle */}
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
                className="w-full h-12 px-5 rounded-full border border-gray-300"
                required
              />

              {/* Password */}
              <div className="relative">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full h-12 px-5 pr-12 rounded-full border border-gray-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
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
                className="w-full h-12 px-5 rounded-full border border-gray-300"
                required
              />

              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full h-12 px-5 rounded-full border border-gray-300"
                required
              />

              {/* Password */}
              <div className="relative">
                <input
                  type={showRegisterPassword ? "text" : "password"}
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full h-12 px-5 pr-12 rounded-full border border-gray-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showRegisterPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full h-12 px-5 pr-12 rounded-full border border-gray-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full h-12 px-5 rounded-full border border-gray-300"
                required
              />

              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full h-12 px-5 rounded-full border border-gray-300"
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

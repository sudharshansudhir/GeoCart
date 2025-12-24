import React, { useEffect, useState } from "react";
import logo from "../assets/GeoCart-Logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_BASE = import.meta.env.VITE_URI

const ProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate=useNavigate()
  const [name,Setname]=useState()
  const [email,Setemail]=useState()
  const [phonenumber,Setphonenumber]=useState()
  const [address,Setaddress]=useState()
  const [editUser,seteditUser]=useState()

  useEffect(()=>{
    try{
        async function getUser() {
            const userData=await axios.get(`${API_BASE}/api/users/user/`,{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            console.log(userData.data)
            seteditUser([userData.data])

        }
    
        getUser()

    }
    catch(e){

    }

  },[])

  async function saveEdit(id) {
    try{
        const payload={}
        payload.name=name
        payload.email=email
        payload.phonenumber=phonenumber
        payload.address=address
        const response=await axios.patch(`${API_BASE}/users/edituser`,{editId:id,payload},{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        console.log(response.data)
    }   
    catch(e) {

    }
  }



  return (
    <div className="min-h-screen bg-[#f8fff3]">

      {/* Top Banner */}
      <div className="relative bg-gradient-to-r from-green-600 via-green-500 to-lime-400 h-48 flex items-center px-10">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <img src={logo} alt="GeoCart" className="w-14 h-14" />
          </div>
          <div className="text-white">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-green-100 text-sm">
              Manage your personal information
            </p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-5xl mx-auto px-10 py-10">

        {/* Header Row */}
        {editUser && editUser.map((item)=>{
                return <><div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Personal Details
          </h2>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-5 py-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button onClick={()=>saveEdit(item._id)}
                className="px-6 py-2 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            

          {/* Name */}
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <input value={item.name}
            onChange={(e)=>{return item.name =e.target.value,Setname(e.target.value)}}

              disabled={!isEditing}
              placeholder="Your Name"
              className={`mt-2 w-full border-b-2 bg-transparent py-2 outline-none text-gray-800
                ${isEditing ? "border-green-500" : "border-gray-300"}
              `}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input value={item.email}
            onChange={(e)=>{return item.email =e.target.value,Setemail(e.target.value)}}
              disabled
              placeholder="email@example.com"
              className="mt-2 w-full border-b-2 border-gray-300 bg-transparent py-2 outline-none text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-500">Phone Number</label>
            <input value={item.phonenumber}
            onChange={(e)=>{return item.phonenumber =e.target.value,Setphonenumber(e.target.value)}}
              disabled={!isEditing}
              placeholder="+91 98765 43210"
              className={`mt-2 w-full border-b-2 bg-transparent py-2 outline-none text-gray-800
                ${isEditing ? "border-green-500" : "border-gray-300"}
              `}
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm text-gray-500">Address</label>
            <input value={item.address}
            onChange={(e)=>{return item.address =e.target.value,Setaddress(e.target.value)}}
              disabled={!isEditing}
              placeholder="Your Address"
              className={`mt-2 w-full border-b-2 bg-transparent py-2 outline-none text-gray-800
                ${isEditing ? "border-green-500" : "border-gray-300"}
              `}
            />
          </div>
        </div>

            </>})}
            
            {/* Form Grid */}
        
        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>

        {/* Account Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Account Actions
          </h2>

          <div className="flex flex-wrap gap-4">
            <button onClick={()=>{return localStorage.clear("token"),navigate("/login")}} className="px-6 py-3 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition">
              Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileCard;

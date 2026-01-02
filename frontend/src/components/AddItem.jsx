import axios from "axios";
import React, { useState } from "react";
const API_BASE=import.meta.env.VITE_URI

const AddItem = () => {
  const [add, setAdd] = useState(false);


const [name,setName]=useState("")
const [price,setprice]=useState("")
const [brand,setbrand]=useState("")
const [capacity,setcapacity]=useState()

const [category,setcategory]=useState("")
const [img,setimg]=useState(null)
const [exp_date,setexp_date]=useState("")
const [quantity,setquantity]=useState("")
const [inStock,setinStock]=useState("")

async function addNew(){
    if(!name || !price || !category || !exp_date || !quantity){
        alert("Add All the details")
    }
    else{
        const formData = new FormData();

formData.append("name", name);
formData.append("price", price);
formData.append("brand", brand);
formData.append("category", category);
formData.append("exp_date", exp_date);
formData.append("quantity", quantity);
formData.append("capacity", capacity);
formData.append("inStock", inStock);
formData.append("img", img);

const data= await axios.post(`${API_BASE}/api/products/add`, formData,{
  headers:{
    Authorization:localStorage.getItem("token")
  }
});

        // console.log(name,price,brand,category,exp_date,quantity)
        // const data=await axios.post(`${API_BASE}/api/products/add`,{name,price,brand,category,img,exp_date,inStock,quantity})
        console.log(data)
    alert("Added Successfully")
    setAdd(!add)
    setName("")
    setprice("")
    setbrand("")
    setcategory("")
    setcapacity()
    setimg(null)
    setexp_date("")
    setquantity("")
    setinStock(false)
    }
    
}

  return (
    <>
      {/* Overlay */}
      {add && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
          
          {/* Form Container */}
          <div className="bg-white w-full max-w-2xl rounded-lg p-6 shadow-lg">
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-green-700">
                Add New Product
              </h2>
              <button
                onClick={() => setAdd(false)}
                className="text-xl font-bold text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>

            {/* FORM UI */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="text" value={name} onChange={(e)=>setName(e.target.value)}
                placeholder="Product Name"
                className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              <input
                type="text"  value={price} onChange={(e)=>setprice(e.target.value)}
                placeholder="Price"
                className="border border-green-300 rounded px-3 py-2"
              />

              <input  value={brand} onChange={(e)=>setbrand(e.target.value)}
                type="text"
                placeholder="Brand"
                className="border border-green-300 rounded px-3 py-2"
              />

              <input  value={category} onChange={(e)=>setcategory(e.target.value)}
                type="text"
                placeholder="Category"
                className="border border-green-300 rounded px-3 py-2"
              />


              <input onChange={(e) => setimg(e.target.files[0])}
                type="file"
                className="border border-green-300 rounded px-3 py-2"
              />

              <input  value={exp_date} onChange={(e)=>setexp_date(e.target.value)}
                type="date"
                placeholder="Expiry Date"
                className="border border-green-300 rounded px-3 py-2"
              />

              <input  value={quantity} onChange={(e)=>setquantity(e.target.value)}
                type="text"
                placeholder="Quantity"
                className="border border-green-300 rounded px-3 py-2"
              />
              <input  value={capacity} onChange={(e)=>setcapacity(e.target.value)}
                type="Number" placeholder="Total Stocks"
                className="border border-green-300 rounded px-3 py-2"
              />

              {/* Stock Toggle */}
              <div className="flex items-center gap-3 col-span-full">
                <input type="checkbox"  onChange={(e)=>setinStock(e.target.checked)}/>
                <label className="text-gray-700">In Stock</label>
              </div>

              {/* Buttons */}
              <div className="col-span-full flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setAdd(false)}
                  className="px-5 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  type="submit" onClick={(e)=>{e.preventDefault() ,addNew()}}
                  className="px-5 py-2 rounded bg-green-700 text-white hover:bg-green-800"
                >
                  Add Product
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Floating Add Button */}
      <div
        className="fixed right-10 bottom-10 bg-green-700 text-white rounded-full
        hover:scale-110 transition-transform duration-300
        h-16 w-16 flex items-center justify-center text-4xl cursor-pointer"
        onClick={() => setAdd(!add)}
      >
        <span className="leading-none">+</span>
      </div>
    </>
  );
};

export default AddItem;

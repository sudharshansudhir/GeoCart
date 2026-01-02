import axios from "axios";
import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_URI;

const Stocks = () => {
  const [products, setProducts] = useState([]);
const [editingId, setEditingId] = useState(null);
const [name,setname]=useState()
const [brand,setbrand]=useState()
const [price,setprice]=useState()
const [quantity,setquantity]=useState()
const [category,setcategory]=useState()
const [exp_date,setexp_date]=useState()

// {
//   name:"",
//   brand:"",
//   exp_date:"",
//   quantity:"",
//   price:"",
//   inStock:""
// }


  useEffect(() => {
    async function fetchProducts() {
      const stocks = await axios.get(`${API_BASE}/api/products`);
      setProducts(stocks.data);

    }
    fetchProducts();
  }, []);

  async function toggleStock(id) {
    try{
    // console.log(localStorage.getItem("token"))
    const token=localStorage.getItem("token")

 const resp=await axios.patch(`${API_BASE}/api/products/edit/${id}`,{},{
      headers:{
        Authorization:`${token}`
      }
    });
    // console.log(resp)
    }
    catch(e){
      console.log("E",e)
    }

   
  }

  async function editData(id) {
    const data=products.find((item)=>item._id==id)
    console.log(data)  
    setname(data.name)
    setbrand(data.brand)
    setquantity(data.quantity)
    setcategory(data.category)
    setprice(data.price)
    setexp_date(data.exp_date)
  }

   async function saveData(id) {
      const payload={
      name:name,
      brand:brand,
      quantity:quantity,
      category:category,
      price:price,
      exp_date:exp_date
    }
    console.log(payload)
   const response=await axios.patch(`${API_BASE}/api/products/edit`,{id,payload},{
    headers:{
      Authorization:localStorage.getItem("token")
    }
   })     
   if(response.status!=404){
    alert("SuccessFully Edited the Product")
    setEditingId(null)
   }
  }

  async function deleteProduct(id) {
    const response=await axios.delete(`${API_BASE}/api/products/delete/${id}`,{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    })
    if(response.status!=404){
      alert("Product Deleted Successfully")
    }
    
  }

  return (
    <>
      {products && (
        <div className="flex-1 mt-10 pt-10 bg-green-50">
          <div className="w-full md:p-10 p-4">
            <div className="flex justify-center items-center">
            <h2 className="text-3xl font-semibold text-green-700 mb-6">
              Stocks Management
            </h2>
            </div>

            <div className="flex justify-center items-center w-full overflow-hidden rounded-lg bg-white border border-green-300 shadow">
              <table className="w-full  table-auto">
                <thead className="bg-green-700 text-white text-sm">
  <tr>
    <th className="px-4 py-3 w-[15%] font-semibold">Product</th>
    <th className="px-4 py-3 w-[12%] font-semibold">Brand</th>
    <th className="px-4 py-3 w-[12%] font-semibold">Expiry</th>
    <th className="px-4 py-3 w-[12%] font-semibold">Category</th>
    <th className="px-4 py-3 w-[12%] font-semibold">Quantity</th>
    <th className="px-4 py-3 w-[12%] font-semibold">Price</th>
    <th className="px-4 py-3 w-[13%] font-semibold text-center">Availability</th>
    <th className="w-[12%]"></th>
  </tr>
</thead>

                <tbody className="text-sm text-gray-700">
  {products.map((product) => {
    const isEditing = editingId === product._id;

    return (
      <tr
        key={product._id}
        className="group border-t border-green-200 hover:bg-green-100 transition relative"
      >
        {/* Product Name */}
        <td className="px-4 py-3 flex items-center gap-3">
          <div className="border border-green-300 rounded overflow-hidden">
            {isEditing?<></>
            : <img
              src={product.img}
              alt={product.name}
              className="w-14 h-14 object-cover"
            />}
           
          </div>

          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e)=>setname(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          ) : (
            <span className="font-medium">{product.name}</span>
          )}
        </td>

        {/* Brand (view only) */}
        <td className="px-4 py-3">
          
          <div className="flex items-center justify-center gap-3">
          {isEditing ? (
            <input
              type="text"
              value={brand}
              onChange={(e)=>setbrand(e.target.value)}
              
              className="border px-2 py-1 rounded w-20"
            />
          ) : (
            product.brand
          )}
            </div>
        </td>
        
        <td className="px-4 py-3">
          
          <div className="flex items-center justify-center gap-3">
          {isEditing ? (
            <input
              type="date"
                            value={exp_date}
              onChange={(e)=>setexp_date(e.target.value)}
              
              className="border px-2 py-1 rounded w-20"
            />
          ) : (
            product.exp_date
          )}
          </div>
        </td>

        <td className="px-4 py-3">
          
          <div className="flex items-center justify-center gap-3">
          {isEditing ? (
            <input
              type="text"
              value={category}
              onChange={(e)=>setcategory(e.target.value)}
              
              className="border px-2 py-1 rounded w-20"
            />
          ) : (
            product.category
          )}
          </div>
        </td>

        {/* Quantity (editable) */}
        <td className="px-4 py-3">
          
          <div className="flex items-center justify-center gap-3">
          {isEditing ? (
            <input
              type="text"
              value={quantity}
              onChange={(e)=>setquantity(e.target.value)}
              
              className="border px-2 py-1 rounded w-20"
            />
          ) : (
            product.quantity
          )}
          </div>
        </td>

        {/* Price (editable) */}
        <td className="px-4 py-3">
          
          <div className="flex items-center justify-center gap-3">
          {isEditing ? (
            <input
              type="number"
                            value={price}
              onChange={(e)=>setprice(e.target.value)}
              
              className="border px-2 py-1 rounded w-24"
            />
          ) : (
            `₹${product.price}`
          )}
          </div>
        </td>

        {/* Availability (UNCHANGED toggle) */}

        {isEditing ? (
            <></>
          ) : (
 <td className="px-4 py-3 text-center">
          <div className="flex items-center justify-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold
              ${
                product.inStock
                  ? "bg-green-300 text-green-900"
                  : "bg-yellow-300 text-yellow-900"
              }`}
            >
              {product.inStock ? "Available" : "Not Available"}
            </span>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                defaultChecked={product.inStock}
                onClick={() => toggleStock(product._id)}
              />
              <div className="w-11 h-6 bg-yellow-300 rounded-full peer peer-checked:bg-green-700 transition"></div>
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></span>
            </label>
          </div>
        </td>
          )}
          <td></td>
       

        {/* Hover Actions */}
        <td className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition">
          {!isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={() => {editData(product._id),setEditingId(product._id)}}
                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>

              <button onClick={()=>deleteProduct(product._id)}
                className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button onClick={()=>saveData(product._id)}
                className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>

              <button
                onClick={() => setEditingId(null)}
                className="px-3 py-1 text-xs bg-gray-400 text-white rounded hover:bg-gray-500"
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
      )}
    </>
  );
};

export default Stocks;

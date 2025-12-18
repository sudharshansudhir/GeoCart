import React from 'react'

const AllGrocery = () => {
const products=[
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
    {
    img:"..",
    name:"item1"
},
]


  return (
    <div className='flex justify-center items-center'>
    <div className='bg-white rounded-md my-5 w-[90%] py-5'>

        <div className='px-10 flex w-full gap-4 justify-between items-center '>
            <div className='w-[50%]'>
                <div className="flex px-4 items-center text-sm bg-white h-12 outline rounded w-full">
                    <input className="px-2 w-full h-full outline-none text-gray-500 bg-transparent" type="email" placeholder="Search..." />
                    <button type="submit" className="bg-green-800 py-2 px-4 rounded-sm active:scale-95 transition">
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.836 10.615 15 14.695" stroke="#ffffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                <path clip-rule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#ffffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                    </button>
                </div>
            </div>
            <div className='w-[25%]'>
                <label htmlFor="lst" className='font-bold me-2'>Category</label>
                    <select name="grocery-lst" className='bg-yellow-100 w-50 border rounded-md py-2 px-4' id="lst">
                        <option value="All">All</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Masala">Masala's</option>
                    </select>
            </div>
        </div>

        <div className='my-4'>
            <div className='flex justify-center items-center'>
                <img src="." className='w-[100%] h-100'/>
            </div>
        </div>

        <div>
            <div>All Products</div>

    <div className='flex gap-2 flex-wrap justify-between items-center'>
            {               
                products && products.map((item)=>{
                    return <div className='w-40 border-2 border-black h-40'>
                        <img src={item.img} alt="" />
                    </div>
                })
            }
    </div>

        </div>

    </div>
    </div>
  )
}

export default AllGrocery
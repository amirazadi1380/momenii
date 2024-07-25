import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdOutlineNewspaper } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import ProductUpdate from './ProductUpdate';

export default function Adminpannel() {
    const [isProduct,setIsProduct] = useState(true)
    return (
        <div className='w-screen h-screen bg-sky-200 flex justify-center items-center'>
                <div className='w-5/6 h-5/6 bg-white text-tire flex rounded-2xl shadow-xl shadow-black/30 relative'>
                <div className='w-3/4 h-full rounded-md  lg:w-5/6'>
                    {isProduct && <ProductUpdate />}
                </div>
                    <div className='bg-blue-600 rounded-lg w-1/4 h-full flex pt-10 items-center space-y-8 flex-col lg:w-1/6'>
                        <div className='w-5/6 h-14 bg-white  rounded-2xl flex justify-center items-center space-x-3 cursor-pointer hover:bg-blue-600 hover:text-roshan duration-300 ease-in'>
                            <h4 className='font-semibold'>داشبورد</h4>
                            <LuLayoutDashboard className='text-xl'/>
                        </div>
                        <div className='w-5/6 h-14 bg-white  rounded-2xl flex justify-center items-center space-x-3 cursor-pointer hover:bg-blue-600 hover:text-roshan duration-300 ease-in'>
                            <h4 className='font-semibold' onClick={()=>setIsProduct(true)}>محصولات</h4>
                            <MdOutlineProductionQuantityLimits className='text-xl'/>
                        </div>
                        <div className='w-5/6 h-14 bg-white  rounded-2xl flex justify-center items-center space-x-3 cursor-pointer hover:bg-blue-600 hover:text-roshan duration-300 ease-in'>
                            <h4 className='font-semibold'>خبر</h4>
                            <MdOutlineNewspaper className='text-xl'/>
                        </div>
                    </div>
                </div>
     
            <Outlet/>
        </div>
    )
}

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineChangeCircle } from "react-icons/md";

export default function ProductUpdate() {
  const [items, setItems] = useState([])
  const [isChanging, setIsChanging] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedItem, setSelectedItem] = useState()
  const [newTitle, setNewTitle] = useState('')
  const [newPrice, setNewPrice] = useState(0)
  const [newDesc, setNewDesc] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [desc, setDesc] = useState('')
  const [image, setImage] = useState()

  useEffect(() => {
    const fetchMyData = async () => {
      await axios.get('http://localhost/max_momeni/controllers/getProducts.php').then(res => setItems(res.data))
    }
    fetchMyData()
  }, [])

  const handleChange = (id) => {
    const item = items.find(item => item.id == id);
    setSelectedItem(item)
    setNewTitle(item.title);
    setNewPrice(item.price);
    setNewDesc(item.description);
    setIsChanging(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedItem = {
      id: selectedItem.id,
      title: newTitle,
      price: newPrice,
      description: newDesc
    };
    axios.post('http://localhost/max_momeni/controllers/updateProduct.php', updatedItem, {
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
      }
    })
      .then(() => {
        setItems(prevItems => prevItems.map(item => item.id == updatedItem.id ? updatedItem : item))
        setIsChanging(false)
      }

      )
  }
  const [searchInput,setSearchInput] = useState('')
  const handleAdd = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', desc);
    formData.append('image', image);

        axios.post('http://localhost/max_momeni/controllers/createProduct.php',formData,{
          headers:{
            "Content-Type": 'multipart/form-data'
          }
        }).then(res=>setSrc(res.data.data))
  }
  const handleDelete = (id) => {
        axios.post('http://localhost/max_momeni/controllers/deleteproduct.php',{id:id},{
          headers:{
            "Content-Type": 'application/x-www-form-urlencoded'
          }
        }).then(res=>console.log(res.data))
  }
  return (
    <div className=' w-full h-full flex flex-col  items-center '>
      <div className='w-full  h-20 mb-10 pt-10 flex justify-around'>
        <div className='w-36 relative pl-5 lg:pl-0'>
          <input onChange={(e)=>setSearchInput(e.target.value)} type="text" className='border-b border-black/50 bg-transparent w-28 placeholder:text-xs placeholder:opacity-70 placeholder:text-black outline-none  text-sm' placeholder=' ...' />
          <CiSearch className='absolute text-lg right-0 top-0 cursor-pointer w-10' />
        </div>
        <h4 className='font-bold'>پنل محصولات</h4>
      </div>
      <div className='grid grid-cols-4 gap-10'>
        {items.filter(item=> searchInput ? item.title.includes(searchInput) : item).map(item => (
          <div className='w-20 h-20 flex flex-col justify-center items-center space-y-3'  key={item.id}>

          <div  className='bg-white shadow-xl shadow-black/30 w-20 rounded-lg h-10 text-black text-sm flex justify-center items-center cursor-pointer border border-slate-950/10 hover:scale-105 duration-200 ease-out hover:bg-blue-600 hover:text-roshan relative group'>
            <h4 className='text-[9px]'>{item.title}</h4>
            <div onClick={() => handleChange(item.id)} className='bg-white shadow-xl shadow-black/30 w-20 rounded-lg  text-black text-sm flex justify-center items-center cursor-pointer border border-slate-950/10 hover:scale-105 duration-200 ease-in hover:bg-blue-600 opacity-0 hover:text-roshan absolute  group-hover:opacity-100 h-16' key={item.id}>
            <h4 className='text-[15px]'>تغییر</h4>

          </div>
          </div>
          <div className='w-full text-lg  flex z-50 space-x-1 justify-center '>
          <MdOutlineDelete onClick={(e)=>handleDelete(item.id)} className='bg-red-600 w-8  text-white rounded-md cursor-pointer h-5'/>
          <MdOutlineChangeCircle className='bg-green-700 w-8  text-white rounded-md cursor-pointer h-5'/>
          </div>
          </div>
        ))}
        <button onClick={() => setIsCreating(true)} className='bg-blue-600 text-white shadow-xl shadow-black/30 w-32 rounded-lg h-10   flex justify-center items-center cursor-pointer border border-slate-950/10 hover:scale-110 duration-200 ease-out text-xs font-bold  absolute left-5 bottom-5' >
          افزودن محصول جدید
        </button>

      </div>

      {isChanging && (
        <div className=' inset-0  bg-black/80 fixed flex justify-center items-center'>
          <div className='w-[500px] h-[560px] bg-roshan flex flex-col rounded-lg'>
            <form className=' flex flex-col space-y-10 justify-center items-center w-full h-full relative' onSubmit={handleSubmit}>
              <label className='flex flex-col text-right'>
                <p>: نام محصول</p>
                <input className='bg-blue-600 w-64 h-10 rounded-md text-white pl-3 text-right pr-2' type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
              </label>
              <label className='flex flex-col text-right'>
                <p>: قیمت</p>
                <input className='bg-blue-600 w-64 h-10 rounded-md text-white pl-3 text-right pr-2' type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
              </label>
              <label className='flex flex-col text-right'>
                <p>: توضیحات</p>
                <input className='bg-blue-600 w-64 h-10 rounded-md text-white pl-3 text-right pr-2' type="text" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
              </label>
              <button type='submit' className='w-36 bg-blue-600/90 h-14 text-roshan  rounded-2xl flex justify-center items-center space-x-3 cursor-pointer hover:bg-blue-600 hover:text-roshan duration-300 ease-in'>ثبت تغییرات </button>
              <IoCloseOutline className='text-4xl cursor-pointer absolute left-0 -top-5' onClick={() => setIsChanging(false)} />
            </form>

          </div>
        </div>
      )}
      {isCreating && (
        <div className=' inset-0  bg-black/80 fixed flex justify-center items-center'>
          <div className='w-[500px] h-[560px] bg-roshan flex flex-col rounded-lg'>
            <form className=' flex flex-col space-y-10 justify-center items-center w-full h-full relative' onSubmit={handleAdd} encType='multipart/form-data'>
              <label className='flex flex-col text-right'>
                <p>: نام محصول</p>
                <input className='bg-blue-600 w-64 h-10 rounded-md text-white pl-3 text-right pr-2' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </label>
              <label className='flex flex-col text-right'>
                <p>: قیمت</p>
                <input className='bg-blue-600 w-64 h-10 rounded-md text-white pl-3 text-right pr-2' type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              </label>
              <label className='flex flex-col text-right'>
                <p>: توضیحات</p>
                <input className='bg-blue-600 w-64 h-10 rounded-md text-white pl-3 text-right pr-2' type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
              </label>
              <label className='flex flex-col text-right'>
                <p>: عکس</p>
                <input className=' w-64' type="file" onChange={(e) => setImage(e.target.files[0])} />
              </label>
              <button type='submit' className='w-36 bg-blue-600/90 h-14 text-roshan  rounded-2xl flex justify-center items-center space-x-3 cursor-pointer hover:bg-blue-600 hover:text-roshan duration-300 ease-in'>ثبت تغییرات </button>
              <IoCloseOutline className='text-4xl cursor-pointer absolute left-0 -top-5' onClick={() => setIsCreating(false)} />
            </form>

          </div>
        </div>
      )}
    </div>
  )
}

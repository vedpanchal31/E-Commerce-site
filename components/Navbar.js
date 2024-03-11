import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { useRouter } from 'next/router';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



const Navbar = ({ logout,user,cart, addToCart, removeFromCart, clearCart, subtotal }) => {

  const [dropdown, setDropdown] = useState(false)
  const [sidebar, setSidebar] = useState(false)
 
const router = useRouter()

useEffect(() => {
  let exempted = ['/checkout','/order' , '/orders' , '/myaccount']
  if(exempted.includes(router.pathname)){
    setSidebar(false)
  }
}, [])


  const togglecart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }

  const ref = useRef()

  return (
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-white z-10'>
      <div className="logo mr-auto md:mx-5">
        <Link href={'/'} className='cursor-pointer'><Image src="/logo1.png" alt="" width={200} height={20} /></Link>
      </div>
      <div className="nav">
        <ul className='flex space-x-4 font-bold md:text-md cursor-pointer'>
          <Link href={"/tshirts"}><li>Tshirts</li></Link>
          <Link href={"/hoodies"}><li>Hoodies</li></Link>
          <Link href={"/stickers"}><li>Stickers</li></Link>
          <Link href={"/mugs"}><li>Mugs</li></Link>
        </ul>
      </div>

      <div className="cursor-pointer items-center  cart absolute right-0 top-4  mx-5 flex">
        <span onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>
      {dropdown && <div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="absolute right-8 bg-white shadow-lg border top-7 rounded-md py-4 px-5 w-32">
          <ul>
            <Link href={'/myaccount'}><li className='py-1 text-sm hover:text-pink-700 font-bold'>My Account</li></Link>
            <Link href={'/orders'}><li className='py-1 text-sm hover:text-pink-700 font-bold'>My Orders</li></Link>
            <a onClick={logout}><li className='py-1 text-sm hover:text-pink-700 font-bold'>Logout</li></a>
          </ul>
        </div>}
        
      {user.value && <MdAccountCircle  className='text-xl md:text-3xl mx-2' />}
      </span>
        {!user.value && <Link href={'/login'}>
          <button className='bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2'>Login</button>
        </Link>}
        <AiOutlineShoppingCart onClick={togglecart} className='text-xl md:text-3xl' />
      </div>
        

      <div ref={ref} className="w-72 h-[100vh]  z-50 sideCart absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform translate-x-full">
        <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
        <span onClick={togglecart} className='absolute top-5 right-4 cursor-pointer text-2xl text-pink-500'><AiFillCloseCircle /></span>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Your Cart is empty! </div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].varient})</div>
                <div className='flex font-semibold items-center justify-center w-1/3 '><AiOutlineMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].varient) }} className='cursor-pointer' /><span className='mx-2 text-sm'>{cart[k].qty}</span><AiOutlinePlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].varient) }} className='cursor-pointer' /></div>
              </div>
            </li>
          })}

        </ol>
        <div className='font-bold my-2'>Subtotal : ₹{subtotal}</div>
        <div className="flex">
          <Link href={'/checkout'}><button disabled={Object.keys(cart).length === 0} className="disabled:bg-pink-300 flex mr-2 my-3 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg"><BsFillBagCheckFill className='m-1' />Checkout</button></Link>
          <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className=" disabled:bg-pink-300 flex my-3  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg">Clear Cart</button>
        </div>
      </div>

    </div>
  )
}

export default Navbar
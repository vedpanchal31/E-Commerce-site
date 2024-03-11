import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'




export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subtotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({ value: null })
  const [key, setkey] = useState()
  const [progress, setProgress] = useState(0)
  const router = useRouter()


  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    });
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    });
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.error(error)
      localStorage.clear()
    }
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email })
    }
    setkey(Math.random())
  }, [router.query])

  const logout = () => {
    localStorage.removeItem('myuser')
    setUser({ value: null })
    setkey(Math.random())
    router.push('/')
  }


  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart))
    let subt = 0;
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty

    }
    setSubTotal(subt)
  }

  const addToCart = (itemcode, qty, price, name, size, varient) => {
    let newcart = cart;
    if (itemcode in cart) {
      newcart[itemcode].qty = cart[itemcode].qty + qty
    }
    else {
      newcart[itemcode] = { qty: 1, price, name, size, varient }
    }

    setCart(newcart)
    // setkey(Math.random())
    saveCart(newcart)
  }

  const buyNow = (itemcode, qty, price, name, size, varient) => {
    let newcart = {}
    newcart[itemcode] = { qty: 1, price, name, size, varient };


    setCart(newcart)
    saveCart(newcart)
    router.push('/checkout')
  }

  const clearCart = () => {

    setCart({})
    saveCart({})
  }

  const removeFromCart = (itemcode, qty, price, name, size, varient) => {
    let newcart = cart;
    if (itemcode in cart) {
      newcart[itemcode].qty = cart[itemcode].qty - qty
    }
    if (newcart[itemcode]["qty"] <= 0) {
      delete newcart[itemcode]
    }

    setCart(newcart)
    saveCart(newcart)
  }
  return <>
    <LoadingBar
      color='#ff2d55'
      progress={progress}
      waitingTime={400}
      onLoaderFinished={() => setProgress(0)}
    />
  
        {key && <Navbar logout={logout} user={user} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />}
        <Component buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
 
    <Footer /></>

}

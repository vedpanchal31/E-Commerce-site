import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'


const forgot = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassowrd] = useState('')
  const [cpassword, setCpassword] = useState('')

  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
  }, [])
  
  const handleChange = async (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value)
    }
    else if (e.target.name == "password") {
      setPassowrd(e.target.value)
    }
    else if (e.target.name == "cpassword") {
      setCpassword(e.target.value)
    }
    
  }
  const sendresetemail = async () =>{
    let data = {
      email,
      sendMail : true
    }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let res = await a.json()
    if(res.success){
      console.log("Password reset instruction have been sent to your email");
    }
    else{
      console.log("error");
    }
  }
  const resetpassword = async () =>{
    if(password == cpassword){

      let data = {
        password,
        sendMail : false
    }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    let res = await a.json()
    if(res.success){
      console.log("Password has been changed");
    }
    else{
      console.log("error");
    }
  }
  }

  return (
    <div>
     
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=pink&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot password</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {router.query.token && <div>
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
              <div className="mt-2">
                <input value={password} onChange={handleChange} id="password" name="password" type="password" autocomplete="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 p-4" />
              </div>
            </div>

            <div>
              <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
              <div className="mt-2">
                <input value={cpassword} onChange={handleChange} id="cpassword" name="cpassword" type="password" autocomplete="cpassword" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 p-4" />
              </div>
            </div>

            <div>
              <button onClick={resetpassword} type="submit" className=" flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Continue</button>
            </div>
            {password != cpassword && 
            <span className='text-red-600'>Passwords don't match</span>
            }
            {password && password === cpassword && 
            <span className='text-green-600'>Passwords match</span>
            }
          </form>
        </div>
        }
        {!router.query.token && <form className="space-y-6" action="#" method="POST">
            <div>
              <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input value={email} onChange={handleChange} id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 p-4" />
              </div>
            </div>

            {/* <div>
              <div className="flex items-center justify-between">
                <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <Link href={'/forgot'} className="font-semibold text-pink-600 hover:text-pink-500">Forgot password?</Link>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 p-4" />
              </div>

            </div> */}

            <div>
              <button onClick={sendresetemail} type="submit" className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Continue</button>
            </div>
          </form>}

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link href={'/signup'} className="font-semibold leading-6 text-pink-600 hover:text-pink-500"> Login </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default forgot
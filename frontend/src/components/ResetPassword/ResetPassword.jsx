import axiosInstance from '@/ulities/axios'
import { Alert } from '@material-tailwind/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const handleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
       try {
        const {data} = await axiosInstance.post('/api/v1//serviceProvider/forgot-password', {email})
        if(data.success){
            toast.success('Email sent successfully')
            setEmail('')
            setSuccess(true)
        }
       } catch (error) {
              toast.error(error.response.data.message)
        
       }finally{
        setLoading(false)
       }
    }
  return (
    <>
   {
    success && ( <div className="flex w-full flex-col gap-2 max-w-xl mx-auto mt-8">
      
        <Alert color="green">We have sent an email to your account. Please go and reset your password quickly.</Alert>
      
      </div>)
   }
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
         
    <h1 className="text-4xl font-medium">Reset password</h1>
    <p className="text-slate-500">Fill up the form to reset the password</p>
    <form  className="my-10" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label htmlFor="email">
          <p className="font-medium text-slate-700 pb-2">Email address</p>
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} id="email" required name="email" type="email" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" />
        </label>
       {
          !loading && ( <button type='submit' className="w-full py-3 font-medium text-white bg-black hover:bg-black rounded-lg border-black hover:shadow inline-flex space-x-2 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
              <span>Reset password</span>
            </button>)
       }
       {
              loading && <button type='button' className="w-full py-3 font-medium text-white bg-black hover:bg-black rounded-lg border-black hover:shadow inline-flex space-x-2 items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 animate-spin">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                  <span>Reset password</span>
              </button>
       }
        <p className="text-center">Not registered yet? <Link to="/signup" className="text-buttoncolor font-medium inline-flex space-x-1 items-center"><span>Register now </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg></span></Link></p>
      </div>
    </form>
  </div>
    </>

  )
}

export default ResetPassword

import axiosInstance from '@/ulities/axios'
import { Alert } from '@material-tailwind/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'

const SetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const {token} = useParams()
    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
       try {
        if(password !== confirmPassword){
            toast.error('Password does not match')
            return
        }
        const {data} = await axiosInstance.post(`/api/v1/email/account/reset-password/${token}`, {password})
        if(data.success){
            toast.success('New password set successfully')
            setPassword('')
            setSuccess(true)
            navigate("/login");
        }
       } catch (error) {
              toast.error(error.response.data.message)
        
       }finally{
        setLoading(false)
       }
    }
  return (
    <>
   
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
         
    <h1 className="text-4xl font-medium">New Password</h1>
    
    <form  className="my-10" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label htmlFor="password">
          <p className="font-medium text-slate-700 pb-2">New Password</p>
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}} id="password" required name="password" type="password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" />
        </label>
        <label htmlFor="ConfirmPassword">
          <p className="font-medium text-slate-700 pb-2">Confirm Password</p>
          <input value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} id="ConfirmPassword" required name="ConfirmPassword" type="password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" />
        </label>
       {
          !loading && ( <button type='submit' className="w-full py-3 font-medium text-white bg-black hover:bg-black rounded-lg border-buttoncolor hover:shadow inline-flex space-x-2 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
              <span>Reset password</span>
            </button>)
       }
       {
              loading && <button type='button' disabled className="w-full py-3 font-medium text-white bg-black hover:bg-black rounded-lg border-buttoncolor hover:shadow inline-flex space-x-2 items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 animate-spin">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                  <span>Loading....</span>
              </button>
       }
      
      </div>
    </form>
  </div>
    </>

  )
}

export default SetPassword

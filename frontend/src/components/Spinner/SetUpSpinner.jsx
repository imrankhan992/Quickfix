




import React, { useEffect, useState } from 'react'
import {InfinitySpin} from "react-loader-spinner"

import { useNavigate } from 'react-router-dom';

const SetuPSpinner = ({message, path="login"}) => {
   
    const navigate = useNavigate()
    const [count, setcount] = useState(3)
    useEffect(() => {
     const interval = setInterval(() => {
        setcount((prevalue)=>--prevalue)
     }, 1000);
    
     if (count===0) {
        navigate("/");
      }
      return ()=>{clearInterval(interval)}
    }, [count,navigate,path])
    
    return <div className=" flex items-center justify-center flex-col h-screen">
    <InfinitySpin className="h-16 w-16 text-white" />
    <p className='text-primarycolor text-2xl'>{message}</p>
    {/* <h1>redirecting you in {count} second</h1> */}
    </div>
}

export default SetuPSpinner

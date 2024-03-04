import React from 'react'
import { ComplexNavbar } from '../Navbar/Navbar'
import { Button } from '../ui/button'
import { toast } from '../ui/use-toast'

import { AlertDestructive } from './../Alerts/ErrorAlert';


const Home = () => {
  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px]">
        {/* header */}
        <div className=' py-4'>
        <ComplexNavbar/>
        </div>

      
        
    
    </div>
  )
}

export default Home
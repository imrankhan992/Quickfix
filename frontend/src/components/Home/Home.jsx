import React from 'react'
import { ComplexNavbar } from '../Navbar/Navbar'


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
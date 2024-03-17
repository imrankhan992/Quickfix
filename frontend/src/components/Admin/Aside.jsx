import React from 'react'
import { Sidebar } from './Sidebar'

const Aside = ({open}) => {
  return (
    <aside className="h-screen bg-thirdcolor sticky top-0 lg:w-[25%] md:block hidden border-e border-bordercolor">
       
        <Sidebar open={open}/>
  
    </aside>
  )
}

export default Aside
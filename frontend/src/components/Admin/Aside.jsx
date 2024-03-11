import React from 'react'
import { Sidebar } from './Sidebar'

const Aside = () => {
  return (
    <aside className="h-screen sticky top-0 lg:w-[20%] lg:block hidden">
       
        <Sidebar/>
  
    </aside>
  )
}

export default Aside
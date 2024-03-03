import React from 'react'
import { Sidebar } from './Sidebar'

const Aside = () => {
  return (
    <aside className="w-[25%]  border-e border-bordercolor h-screen sticky top-0  md:block hidden bg-thirdcolor text-primarycolor">
        <Sidebar/>
    </aside>
  )
}

export default Aside
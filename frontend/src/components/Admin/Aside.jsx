import React from 'react'
import { Sidebar } from './Sidebar'

const Aside = ({open,pendingCounts}) => {
  return (
    <aside className="h-screen bg-sidebarbg sticky top-0 lg:w-[25%] md:block hidden border-e border-bordercolor">
       
        <Sidebar open={open} pendingCounts={pendingCounts}/>
  
    </aside>
  )
}

export default Aside
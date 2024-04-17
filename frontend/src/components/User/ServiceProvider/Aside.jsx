import React from 'react'
import { Sidebar } from './Sidebar'
import { ApproveSidebar } from './ApproveSidebar'
import { useSelector } from 'react-redux'

const Aside = ({open}) => {
  const {user} = useSelector((state)=>state.user)
  return (
    <aside className="w-[25%]  border-e border-bordercolor h-screen sticky top-0  md:block hidden bg-sidebarbg text-primarycolor">
       {
        user?.accountStatus==="pending"&&( <Sidebar/>)
       }
       {
        user?.accountStatus==="approve" && (<ApproveSidebar open={open}/>)
       }
    </aside>
  )
}

export default Aside
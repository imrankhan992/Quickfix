import React from 'react'
import { BurgerMenu } from '../BurgerMenu'
import Aside from '../Aside'
import Header from '../Header'
import UserProfileAdmin from './UserProfileAdmin'

const ReportedProfile = () => {
  return (
    <>
    <BurgerMenu />
    <div className="flex ">
      <Aside open={6} />

      <main className="lg:w-[100%] w-full  h-full bg-cardbg">
        <Header />
        <div className="w-full  min-h-screen p-4 flex flex-col gap-4 ">
          {/* heading */}

          <h3 className="text-hoverblack text-2xl font-bold arimo">Reported Profile</h3>
          <div className="   w-full h-full">
           <UserProfileAdmin/>
          </div>
        </div>
        {/* testing */}
      </main>
    </div>
  </>
  )
}

export default ReportedProfile

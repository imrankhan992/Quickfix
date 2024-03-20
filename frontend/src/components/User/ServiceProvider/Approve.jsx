import React from 'react'
import { useSelector } from 'react-redux';
import Header from './Header';
import ReactStars  from 'react-rating-stars-component';

const Approve = ({products}) => {
    const {user} = useSelector((state)=>state.user)
  return (
    <>
    <main className="text-primarycolor w-full">
<div>
  <Header user={user} />
</div>
<div className="p-6">
  <h1 className="text-3xl pb-8">
    Hello! {user?.firstname + " " + user?.lastname}
  </h1>
  <div className="grid md:grid-cols-3 gap-5">
    <div className="bg-[#00AEAE] h-40 rounded-lg">
      <div className="flex flex-col gap-3 items-center justify-center p-10 w-full h-full">
        <h2 className="text-xl">Active orders</h2>
        <h1 className="text-6xl">0</h1>
      </div>
    </div>
    {/* second dev */}
    <div className="bg-[#8F84FC] h-40 rounded-lg">
      <div className="flex flex-col gap-3 items-center justify-center p-10 w-full h-full">
        <h2 className="text-xl">Completed orders</h2>
        <h1 className="text-6xl">0</h1>
      </div>
    </div>
    {/* cancel dev */}
    <div className="bg-[#FC3277] h-40 rounded-lg">
      <div className="flex flex-col gap-3 items-center justify-center p-10 w-full h-full">
        <h2 className="text-xl">Cancel orders</h2>
        <h1 className="text-6xl">0</h1>
      </div>
    </div>
    {/* total revene dev */}
    <div className="bg-thirdcolor border border-bordercolor h-40 rounded-lg">
      <div className="flex flex-col gap-3 items-center justify-center p-10 w-full h-full">
        <h2 className="text-xl">Avaliable balance</h2>
        <h1 className="text-6xl">0</h1>
      </div>
    </div>

    {/* cusotomer satisfaction dev */}
    <div className="bg-greencolor border border-bordercolor h-40 rounded-lg">
      <div className="flex flex-col gap-3 items-center justify-center p-10 w-full h-full">
        <h2 className="text-xl">Customer satisfaction</h2>
        <h1 className="text-6xl">100%</h1>
      </div>
    </div>
  </div>
  
  
  {/* recent orders */}
  <div className="py-10">
      <h1 className="text-3xl">Recent orders:</h1>
      <p className="text-red-500 text-xl text-center p-6">Orders history not found.</p>
  </div>
  {/* top 10 services */}
  <div className="py-10">
    <h1 className="text-3xl">Customer Feedback:</h1>

    <div className='flex items-center justify-center py-8'>
      <p className='text-red-500 text-xl text-center p-6'>Not found</p>
    </div>
  </div>
</div>
</main>
    </>
  )
}

export default Approve
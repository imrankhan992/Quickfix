import React from "react";
import Header from "./Header";
import ReactStars from "react-rating-stars-component";

const Main = ({ user, products }) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
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
              <h2 className="text-xl">Pending orders</h2>
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
        </div>
        
        {/* recent orders */}
        <div className="py-10">
            <h1 className="text-3xl">Recent orders:</h1>
            <p className="text-red-500 text-xl text-center p-6">You have placed no orders.</p>
        </div>
        {/* top 10 services */}
        <div className="py-10">
          <h1 className="text-3xl">Latest Service:</h1>

          <div className="grid md:grid-cols-3 gap-3  w-full h-full py-8 ">
            {products?.map((product) => {
              return (
                <>
                  <div className="flex gap-2 border p-4 rounded-lg bg-thirdcolor">
                    <div className="text-primarycolor">
                      <img
                        src={product?.picture?.url}
                        className="w-32 h-32 rounded-lg object-contain"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-primarycolor">{product?.title}</h1>
                      <p className=" text-mutedcolor">{product?.description}</p>
                      <p className="text-primarycolor">Rs:{product?.price}</p>
                      <div className="flex justify-between gap-3">
                        <div className="flex items-center justify-center">
                          <p className="text-primarycolor">
                            <ReactStars
                              count={5}
                              size={20}
                              activeColor="#ffd700"
                              edit={false}
                              value={0}
                              half={true}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;

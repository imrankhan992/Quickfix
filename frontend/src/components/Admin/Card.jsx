import React from "react";
import ReactStars from "react-rating-stars-component";
import { DropdownMenu } from "../ui/dropdown-menu";
import { ActionProduct } from "./Action";

export function ProductsCard({ products,getallProducts }) {
  
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <>
      {products?.map((product) => {
        return (
          <div className="flex gap-2 border p-4 rounded-lg bg-cardbg shadow-md">
            <div className="text-hoverblack">
              <img
                src={product?.picture?.url}
                className="w-32 h-32 rounded-lg object-contain"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-hoverblack">{product?.title}</h1>
              <p className=" text-mutedcolor">{product?.description}</p>
              <p className="text-hoverblack">Rs:{product?.price}</p>
              <div className="flex justify-end gap-3">
                
                <div>
                  <ActionProduct product={product} id={product?._id} getallProducts={getallProducts} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

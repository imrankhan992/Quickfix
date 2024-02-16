import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaRegCircle, FaDotCircle, FaUserTie } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";

const ChooseJob = () => {
  const [selectedOption, setSelectedOption] = useState("notselected");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="w-full md:max-w-[1750px] mx-auto h-[100vh] ">
      <div className="px-8">Header</div>
      <div className="flex flex-col md:justify-center md:items-center w-full h-full">
        <div className="py-5 mt-10 flex flex-col gap-4 md:gap-8 md:w-[80%] lg:w-[50%] items-center ">
          <h1 className="md:text-3xl text-[1.3rem] font-bold px-2 ">
            Join as a client or Service Provider
          </h1>

          <div className="grid md:grid-cols-2 gap-6 w-full px-6">
            {/* left */}
            <div
              className={`overflow-y-auto cursor-pointer hover:bg-hovercolor hover:border-greencolor relative p-6 h-[12rem] rounded-lg  border-[3px] ${
                selectedOption === "client" && "border-greencolor bg-hovercolor"
              }`}
              onClick={() => handleOptionClick("client")}
            >
              {!selectedOption === "client" ||
                ("notselected" && (
                  <FaRegCircle className="text-2xl absolute right-3 top-3 text-gray-200" />
                ))}
              {selectedOption === "client" && (
                <FaDotCircle className="text-2xl absolute right-3 top-3 text-greencolor" />
              )}
              <FaUserTie className="text-2xl" />
              <div className="md:text-2xl sm:text-2xl text-[20px] py-3">
                {" "}
                <h2>I’m a client, hiring for a project</h2>
              </div>
            </div>
            {/* right */}
            <div
              className={`overflow-y-auto relative hover:bg-hovercolor hover:border-greencolor cursor-pointer p-6 h-[12rem] rounded-lg  border-[3px] ${
                selectedOption === "serviceprovider" &&
                "border-greencolor bg-hovercolor"
              }`}
              onClick={() => handleOptionClick("serviceprovider")}
            >
              {(selectedOption === "client" || "notselected") && (
                <FaRegCircle className="text-2xl absolute right-3 top-3 text-gray-200" />
              )}
              {selectedOption === "serviceprovider" && (
                <FaDotCircle className="text-2xl absolute right-3 top-3 text-greencolor" />
              )}
              <GrUserWorker className="text-2xl" />
              <div className="md:text-2xl sm:text-2xl text-[20px] py-3">
                {" "}
                <h2>I’m a service provider, looking for job</h2>
              </div>
            </div>
          </div>
          <div>
            {selectedOption && selectedOption !== "notselected" && (
              <Button>
                Join as a{" "}
                {selectedOption
                  ? selectedOption.charAt(0).toUpperCase() +
                    selectedOption.slice(1)
                  : "..."}
              </Button>
            )}
            {selectedOption === "notselected" && (
              <Button disabled className="cursor-not-allowed">
                Create Account
              </Button>
            )}
          </div>
          {/* last div */}
          <div>
            <p>
              Already have an account?{" "}
              <a
                href="/login"
                className="text-greencolor underline text-lg font-bold"
              >
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseJob;

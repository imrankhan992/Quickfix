import React, { useEffect, useState } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";


import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema, registration } from "@/Schemas";
import { useDispatch, useSelector } from "react-redux";

import { Loader2 } from "lucide-react";
import { loadUserData, loginAction } from "../Actions/Registration";
import { showtoast } from "@/Toast/Toast";
import { AlertDestructive } from "../Alerts/ErrorAlert";
import { Input } from "../ui/input";
import { Button } from "@material-tailwind/react";
import { ComplexNavbar } from "../Navbar/Navbar";
import loginpageimage from "../../assets/loginpageimage.jpg"
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, success, setup, loading, error } = useSelector(
    (state) => state.user
  );

  const {
    values,
    handleBlur,
    handleChange,
    handleClick,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(loginAction(values));
    },
  });
  useEffect(() => {
    dispatch(loadUserData)
    if (user?.role === "serviceprovider") {
      if (setup && user?.job !== undefined && user?.phoneNumber !== undefined) {
        navigate(`/${user?.role}/dashboard/My profile`);
      }
      if (setup && user?.job === undefined && user?.phoneNumber === undefined) {
        navigate("/setup");
      }
    } else if (user?.role === "admin") {
      navigate(`/${user?.role}/dashboard/My profile`);
    }
    else if (user?.role === "user") {
      navigate(`/${user?.role}/dashboard/My profile`);
    } else {

    }
  }, [setup, user,dispatch]);

  return (
    <>
     
      {/* form */}
      <div className="grid grid-cols-3 bg-cardbg rounded-3xl ">
      <div className="w-full p-14">
        <div className="w-full  flex flex-col justify-center    ">
          <h2 className="arimo text-4xl font-bold text-start pb-8">QuickFix</h2>
          <h1 className="  text-hoverblack arimo text-2xl font-semibold px-2 py-5 text-center">
          Log in to your account
          </h1>
          {/* error show */}

          {error === "Invalid Email or Password" ? AlertDestructive(error) : ""}

          {/* <AlertDestructive/> */}

          <form className="w-full   " onSubmit={handleSubmit}>
            {/* email */}
            <div className=" ">
              <Label
                htmlFor="email"
                className="font-normal text-hoverblack arimo text-lg"
              >
                Email
              </Label>
              <Input
                // autoComplete="off"
                className={`arimo bg-primarycolor text-[16px]  focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl ${
                  errors?.email && touched?.email
                    ? "border-errorcolor border"
                    : ""
                }`}
                onBlur={handleBlur}
                onChange={handleChange}
                name="email"
                type="email"
                id="email"
                placeholder=""
              />
              {/* error */}
              <div className="flex gap-2 items-center ">
                {errors?.email && touched?.email ? (
                  <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem] arimo">
                    <MdOutlineErrorOutline className="text-xl" />
                    {errors?.email}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* password */}
            <div className="">
              <Label
                htmlFor="hellopassword"
                className="font-normal text-[16px] arimo text-hoverblack"
              >
                Password
              </Label>
              <Input
                // autoComplete="off"

                className={` arimo bg-primarycolor focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl ${
                  errors?.password && touched?.password
                    ? "border-errorcolor border"
                    : ""
                }`}
                onBlur={handleBlur}
                type="password"
                onChange={handleChange}
                value={values?.password}
                id="hellopassword"
                name="password"
                placeholder=""
              />
              {/* error */}
              <div className="flex gap-2 items-center arimo">
                {errors?.password && touched?.password ? (
                  <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem] arimo">
                    <MdOutlineErrorOutline className="text-xl" />
                    {errors?.password}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* submit buttons */}
            <div className="py-5 w-full items-center flex justify-center ">
              {!loading && (
                <Button
                  className="bg-hoverblack hover:bg-bl w-full arimo text-[16px]"
                  type="submit"
                >
                  Login
                </Button>
              )}
              {loading && (
                <Button disabled className="w-full flex arimo gap-3 items-center justify-center text-[16px]">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              )}
            </div>
          </form>
        </div>
        <div className="">
          <div className="flex flex-row gap-2  justify-center items-center text-hoverblack  w-full">
            <hr className="w-20" />
            <p className="text-center text-sm text-muted text-hoverblack arimo">
              
              Don't have an Quickfix account?
            </p>
            <hr className="w-20" />
          </div>
          <div className=" flex mt-10 items-center justify-center w-full">
            <Link to={"/signup"}>
              <Button className="px-12 rounded-xl bg-buttoncolor  text-hoverblack  hover:text-hoverblack hover:bg-hovercolor outline outline-primarycolor">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
        <div className="col-span-2">
          <img src={loginpageimage} className="w-full h-[100vh]" alt="" />
        </div>
       
      </div>
    </>
  );
};

export default Login;

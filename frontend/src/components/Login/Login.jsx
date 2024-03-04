import React, { useEffect, useState } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { TextInput } from "@tremor/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema, registration } from "@/Schemas";
import { useDispatch, useSelector } from "react-redux";

import { Loader2 } from "lucide-react";
import { loadUserData, loginAction } from "../Actions/Registration";
import { showtoast } from "@/Toast/Toast";
import { AlertDestructive } from "../Alerts/ErrorAlert";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, success, setup, loading ,error} = useSelector((state) => state.user);

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
    if (setup && user?.job !== undefined && user?.phoneNumber !== undefined) {
      navigate(`/${user?.role}/dashboard/home`);
    }
    if (setup && user?.job === undefined && user?.phoneNumber === undefined) {
      navigate("/setup");
    }
   
  }, [setup]);
  
  return (
    <>
      {/* header */}
      <div className="w-full h-full ">
        <div className="max-w-[1750px] mx-auto">
          <div className="flex py-4 px-8  justify-between items-center  text-white">
            <div>QuickFix</div>
          </div>
        </div>
      </div>
      {/* form */}
      <div className=" w-full md:max-w-[1750px] mx-auto h-[100vh] ">
        <div className="md:w-[80%]  flex flex-col justify-center  mx-auto items-center px-5 ">
          <h1 className=" text-primarycolor text-3xl font-semibold px-2 py-5 text-center">
            Log in to QuickFix
          </h1>
      {/* error show */}
      
      {
        error==="Invalid email and password" ? (AlertDestructive(error)):""
       
      }
      
        {/* <AlertDestructive/> */}
    

          <form className="  py-5" onSubmit={handleSubmit}>
            {/* email */}
            <div className=" w-80">
              <Label
                htmlFor="email"
                className="font-normal text-primarycolor text-lg"
              >
                Email
              </Label>
              <TextInput
                // autoComplete="off"
                className={`max-w-sm rounded-lg border border-bordercolor ${
                  errors?.email && touched?.email
                    ? "border-errorcolor border-2"
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
                  <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
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
                className="font-normal text-primarycolor text-lg"
              >
                Password
              </Label>
              <TextInput
                // autoComplete="off"

                className={`max-w-sm rounded-lg border border-bordercolor ${
                  errors?.password && touched?.password
                    ? "border-errorcolor border-2"
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
              <div className="flex gap-2 items-center ">
                {errors?.password && touched?.password ? (
                  <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                    <MdOutlineErrorOutline className="text-xl" />
                    {errors?.password}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* submit buttons */}
            <div className="py-5 items-center flex justify-center ">
              {!loading && (
                <Button
                  className="bg-buttoncolor outline outline-buttonborder"
                  type="submit"
                >
                  Login
                </Button>
              )}
              {loading && (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              )}
            </div>
          </form>
        </div>
        <div className="w-[70%] mx-auto">
          <div className="flex flex-row gap-2  justify-center items-center text-primarycolor  w-full">
            <hr className="w-20" />
            <div className="text-center text-sm text-muted">
              {" "}
              Don't have an Quickfix account?{" "}
            </div>
            <hr className="w-20" />
          </div>
          <div className=" flex mt-10 items-center justify-center w-full">
            <Link to={"/signup"}>
              <Button className="px-12 rounded-xl bg-thirdcolor text-primarycolor  hover:text-hoverblack hover:bg-hovercolor outline outline-primarycolor">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

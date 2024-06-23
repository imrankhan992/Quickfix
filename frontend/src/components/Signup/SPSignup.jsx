import React, { useEffect, useState } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import { Label } from "@/components/ui/label";


import logo from "../../assets/quicfixlogo.png"
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registration } from "@/Schemas";
import { useDispatch, useSelector } from "react-redux";
import { Registration } from "./../Actions/Registration";
import { Loader2 } from "lucide-react";
import { datasaveAction } from "../Actions/DataSave";
import { AlertDestructive } from "../Alerts/ErrorAlert";
import { Input } from "../ui/input";
import { Button } from "@material-tailwind/react";
const SPSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, success, loading,error } = useSelector((state) => state.user);
  const { data } = useSelector((state) => state.data);
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
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      checked: false,
    },
    validationSchema: registration,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(Registration(values));
    },
  });
  useEffect(() => {
    
    if (data!=="serviceprovider") {
      navigate("/signup")
    }
    if (success) {
      navigate("/verifyemail");
      localStorage.setItem('userEmail', user?.email);
     
    
    }
  }, [success]);

  return (
    <>
      {/* header */}
      <div className="w-full h-full ">
        <div className="max-w-[1750px] mx-auto">
          <div className="flex py-2 px-8  justify-between items-center  text-white">
           <img src={logo} alt="quickFixLogo" className=""/>
            <div className="md:hidden text-hoverblack">Login</div>
            <div className="ms-auto md:flex justify-end gap-4 items-center hidden">
              <div>
                <p className="text-hoverblack font-bold">Here to hire talent?</p>
              </div>
              <div>
                <Link to={"/signup"} className="text-hoverblack font-bold">Join as a Client</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* form */}
      <div className=" w-full md:max-w-[1750px] mx-auto h-[100vh] ">
        <div className="md:w-[40%] mx-auto flex flex-col  items-center px-5 ">
          
          <h1 className=" text-hoverblack text-3xl font-semibold px-2 py-5 text-center ">
            Sign up to find work you love
          </h1>
          {
        error!=="Please log in to access this resource" ? (AlertDestructive(error)):""
       
      }
          <form
            className="md:grid md:grid-cols-2 flex flex-col gap-3 w-full py-5"
            onSubmit={handleSubmit}
          >
            {/* first name  */}
            <div>
              <Label
                htmlFor="name"
                className="font-normal text-hoverblack text-lg"
              >
                First name
              </Label>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name="firstname"
                value={values?.firstname}
                placeholder=""
                id="name"
                className={` arimo bg-hoverlatext-hoverblack  focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl ${
                  errors?.firstname && touched?.firstname
                    ? "border-errorcolor border-2"
                    : ""
                }`}
               
              />
              {/* error */}
              <div className="flex gap-2 items-center">
                {errors?.firstname && touched?.firstname ? (
                  <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                    <MdOutlineErrorOutline className="text-xl" />
                    {errors?.firstname}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* last name */}
            <div>
              <Label
                htmlFor="lastname"
                className="font-normal text-hoverblack text-lg"
              >
                Last name
              </Label>
              <Input
                className={` arimo bg-hoverla text-hoverblack focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl ${
                  errors?.lastname && touched?.lastname
                    ? "border-errorcolor border-2"
                    : ""
                }`}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values?.lastname}
                type="text"
                id="lastname"
                name="lastname"
                placeholder=""
              />
              {/* error */}
              <div className="flex gap-2 items-center">
                {errors?.lastname && touched?.lastname ? (
                  <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                    <MdOutlineErrorOutline className="text-xl" />
                    {errors?.lastname}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* email */}
            <div className="col-span-2">
              <Label
                htmlFor="email"
                className="font-normal text-hoverblack text-lg"
              >
                Email
              </Label>
              <Input
                className={`arimo bg-hoverlatext-hoverblack focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl ${
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
            <div className="col-span-2">
              <Label
                htmlFor="hellopassword"
                className="font-normal text-hoverblack text-lg"
              >
                Password
              </Label>
              <Input
                className={`arimo bg-hoverlatext-hoverblack focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl ${
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
            {/* confirm password */}
            <div className="col-span-2">
              <Label
                htmlFor="confirmPassword"
                className="font-normal text-hoverblack text-lg"
              >
                Confirm Password
              </Label>
              <Input
                className={`arimo bg-hoverlatext-hoverblack focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl ${
                  errors?.confirmPassword && touched?.confirmPassword
                    ? "border-errorcolor border-2"
                    : ""
                }`}
                onBlur={handleBlur}
                onChange={handleChange}
                name="confirmPassword"
                value={values?.confirmPassword}
                type="password"
                id="confirmPassword"
                placeholder=""
              />
              {/* error */}
              <div className="flex gap-2 items-center ">
                {errors?.confirmPassword && touched?.confirmPassword ? (
                  <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                    <MdOutlineErrorOutline className="text-xl" />
                    {errors?.confirmPassword}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* accept terms and conditons */}
            <div className="flex items-top  space-x-2 col-span-2">
             
              <input
                type="checkbox"
                onChange={handleChange}
                name="checked"
                className="rounded-md bg-buttoncolor border border-bordercolor focus:ring-0 "
              />

              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium text-hoverblack leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
                <p className="text-sm text-muted-foreground">
                  You agree to our Terms of Service and Privacy Policy.
                </p>
                {/* error */}
                <div className="flex gap-2 items-center ">
                  {errors?.checked && touched?.checked ? (
                    <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                      <MdOutlineErrorOutline className="text-xl" />
                      {errors?.checked}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="py-5 items-center flex justify-center col-span-2">
              {!loading && (
                <Button className="bg-buttoncolor w-full text-hoverblack capitalize text-[16px] rounded-xl border-b-2 hover:border-t-2 hover:border-b-0 border-hoverblack" type="submit">
                  Create my account
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
      </div>
    </>
  );
};

export default SPSignup;

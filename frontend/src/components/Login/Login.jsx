import React, { useEffect, useState } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { TextInput } from "@tremor/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registration } from "@/Schemas";
import { useDispatch, useSelector } from "react-redux";
import { Registration } from "./../Actions/Registration";
import { Loader2 } from "lucide-react";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, success, loading } = useSelector((state) => state.user);

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
      //   dispatch(Registration(values));
    },
  });
  useEffect(() => {
    if (success) {
      navigate("/verifyemail");
      localStorage.setItem("userEmail", user?.email);
    }
  }, [success]);

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
        <div className="md:w-[40%] mx-auto flex flex-col justify-center  items-center px-5 ">
          <h1 className=" text-primarycolor text-3xl font-semibold px-2 py-5 text-center">
            Log in to QuickFix
          </h1>
          <form
            className="md:grid md:grid-cols-2 flex flex-col gap-3 w-full py-5"
            onSubmit={handleSubmit}
          >
            {/* email */}
            <div className="col-span-2">
              <Label
                htmlFor="email"
                className="font-normal text-primarycolor text-lg"
              >
                Email
              </Label>
              <TextInput
                className={` rounded-lg border border-bordercolor ${
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
                className="font-normal text-primarycolor text-lg"
              >
                Password
              </Label>
              <TextInput
                className={` rounded-lg border border-bordercolor ${
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
            <div className="py-5 items-center flex justify-center col-span-2">
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
          <div className="w-full">
            <div className="grid grid-cols-3 gap-3 justify-center items-center text-primarycolor  w-full">
              <hr className="border" />
              <div className="text-center text-sm ">
                {" "}
                Don't have an Quickfix account?{" "}
              </div>
              <hr />
            </div>
            <div className=" flex mt-10 items-center justify-center w-full">
             <Link to={"/signup"}>
             <Button className="px-8 rounded-xl bg-thirdcolor text-primarycolor  hover:text-hoverblack hover:bg-hovercolor outline outline-primarycolor">
                Sign Up
              </Button>
             </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useEffect } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import { Label } from "@/components/ui/label";
import logo from "../../assets/quicfixlogo.png"
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registration } from "@/Schemas";
import { useDispatch, useSelector } from "react-redux";

import { Loader2 } from "lucide-react";
import { userRegisterAction } from './../Actions/UserAction';
import { AlertDestructive } from "../Alerts/ErrorAlert";
import { Input } from "../ui/input";
import { Button } from "@material-tailwind/react";
const UserSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, success, loading,error } = useSelector((state) => state.serviceProvider);
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
        dispatch(userRegisterAction(values));
    },
  });
  useEffect(() => {
  
    if (data !== "client") {
      navigate("/signup");
    }
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
          <div className="flex py-2 px-8  justify-between items-center  text-hoverblack">
          <Link to={"/"}>  <img src={logo} alt="quickFixLogo" /></Link>
            <div className="md:hidden">Login</div>
            <div className="ms-auto md:flex justify-end gap-4 items-center hidden">
              <div>
                <Link to={"/signup"}  className="font-bold">Here to hire talent?</Link>
              </div>
              <div>
                <Link to={"/signup"} className="font-bold">Join as a Client</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* form */}
      <div className=" w-full md:max-w-[1750px] mx-auto h-[100vh] ">
        <div className="md:w-[40%] mx-auto flex flex-col  items-center px-5 ">
             {/* error show */}
      
      {
        error ? (AlertDestructive(error)):""
      }
          <h1 className=" text-hoverblack text-3xl font-semibold px-2 py-5 text-center">
            Sign up to hire talent
          </h1>
          <form
            className="md:grid md:grid-cols-2 flex flex-col gap-3 w-full py-5"
            onSubmit={handleSubmit}
          >
            {/* first name  */}
            <div>
              <Label
                htmlFor="name"
                className="font-normal text-hoverblack arimo text-lg"
              >
                First name
              </Label>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name="firstname"
                value={values?.firstname}
                id="name"
                className={` arimo bg-primarycolor text-[16px]  focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl ${
                  errors?.firstname && touched?.firstname
                    ? "border-errorcolor border-2"
                    : ""
                }`}
                placeholder=""
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
                className="font-normal text-hoverblack arimo text-lg"
              >
                Last name
              </Label>
              <Input
                className={` arimo bg-primarycolor text-[16px]  focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl ${
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
                className="font-normal text-hoverblack arimo text-lg"
              >
                Email
              </Label>
              <Input
                className={`arimo bg-primarycolor text-[16px]  focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl ${
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
                className="font-normal text-hoverblack arimo text-lg"
              >
                Password
              </Label>
              <Input
                className={` arimo bg-primarycolor text-[16px]  focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl ${
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
                className="font-normal text-hoverblack arimo text-lg"
              >
                Confirm Password
              </Label>
              <Input
                className={` arimo bg-primarycolor text-[16px]  focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl${
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
              {/* <Checkbox id="checked" name="checked"   onClick={(e)=>{return setchecked(e.target.value==="on"?true:false)}} /> */}
              {/* <Checkbox id="checked" name="checked"   onCheckedChange={(e)=>{console.log(e.target.value==="on");}} /> */}

              <input
                type="checkbox"
                onChange={handleChange}
                name="checked"
                className="rounded-md bg-inputbg_color border border-bordercolor"
              />

              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="font-normal text-hoverblack arimo text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
            <div className="py-5 items-center flex justify-center col-span-2 w-full ">
              {!loading && (
                <Button
                  className="bg-buttoncolor arimo w-full text-hoverblack capitalize text-[16px] rounded-xl border-b-2 hover:border-t-2 hover:border-b-0 border-hoverblack "
                  type="submit"
                >
                  Create my account
                </Button>
              )}
              {loading && (
                <Button disabled className="bg-buttoncolor arimo w-full text-hoverblack capitalize text-[16px] rounded-xl border-b-2 hover:border-t-2 hover:border-b-0 border-hoverblack">
                  Please wait...
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserSignup;

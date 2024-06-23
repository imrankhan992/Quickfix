import React, { useEffect, useState } from "react";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";
import { loadUserData } from "@/components/Actions/Registration";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import ReactStars from "react-rating-stars-component";
import axiosInstance from "@/ulities/axios";
import { Filter } from "./Filter";
import { errorToast, showtoast } from "@/Toast/Toast";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "@material-tailwind/react";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { settingSchema } from "@/Schemas";
import { MdOutlineErrorOutline } from "react-icons/md";
import { Loader2 } from "lucide-react";

const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);
  const [profile, setprofile] = useState();
  const [avatarPreview, setavatarPreview] = useState();
  const handleFileChange = (e) => {
    setprofile(e.currentTarget.files[0]);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setavatarPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  const {
    values,
    handleBlur,
    handleChange,
    handleClick,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      avatar: null,
    },
    validationSchema: settingSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setloading(true)
        const { data } = await axiosInstance.put(
            "/api/v1//user/update-profile-setting",
            values,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (data?.success) {
            showtoast(data?.message)
            setloading(false)
          }
      } catch (error) {
        setloading(false)
        errorToast(error.response.data.message)
      }
    },
  });
  useEffect(() => {
    setFieldValue("avatar", profile);
    setFieldValue("firstname", user?.firstname);
    setFieldValue("lastname", user?.lastname);
  }, [profile,user]);

 
  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px] bg-cardbg">
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={5} />
        <main className="text-primarycolor w-full">
          <div>
            <Header user={user} />
          </div>

          <div className="px-8 py-6">
            <div className="flex items-center justify-start text-3xl">
              Settings
            </div>
            {/*input grid */}
            <div className="grid grid-cols-2">
              <div className="flex items-center justify-center flex-col relative  rounded-full mt-6">
                <img
                  src={profile ? avatarPreview : user?.avatar?.url}
                  className="w-32 flex bg-thirdcolor border border-bordercolor  p-2 rounded-full"
                  alt=""
                />
                <Input
                  id="picture"
                  name="avatar"
                  className="absolute h-full w-full cursor-pointer opacity-0"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  onBlur={handleBlur}
                />

                <div className="flex gap-1 items-center justify-center border border-buttonborder text-primarycolor hover:bg-thirdcolor py-1 px-3  bg-buttoncolor   mt-3 rounded-full mb-6">
                  {" "}
                  Upload Photo
                </div>
              </div>
              <form
                className="md:grid md:grid-cols-2 flex flex-col gap-3 w-full py-5"
                onSubmit={handleSubmit}
              >
                {/* first name  */}
                <div>
                  <Label
                    htmlFor="name"
                    className="font-normal text-primarycolor text-lg"
                  >
                    First name
                  </Label>
                  <Input
                    onChange={handleChange}
                    name="firstname"
                    defaultValue={user?.firstname}
                    id="name"
                    className={` rounded-lg border bg-inputbg_color focus-visible:ring-offset-0 border-bordercolor ${
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
                    className="font-normal text-primarycolor text-lg"
                  >
                    Last name
                  </Label>
                  <Input
                    className={` rounded-lg border bg-inputbg_color focus-visible:ring-offset-0 border-bordercolor ${
                      errors?.lastname && touched?.lastname
                        ? "border-errorcolor border-2"
                        : ""
                    }`}
                    onChange={handleChange}
                    defaultValue={user?.lastname}
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
                    className="font-normal text-primarycolor text-lg"
                  >
                    Email "Email cannot be changed"
                  </Label>
                  <Input
                    className={` rounded-lg bg-inputbg_color focus-visible:ring-offset-0 border border-bordercolor ${
                      errors?.email && touched?.email
                        ? "border-errorcolor border-2"
                        : ""
                    }`}
                    defaultValue={user?.email}
                    name="email"
                    type="email"
                    id="email"
                    placeholder=""
                    readOnly
                  />
                </div>

                <div className="py-5 items-center flex justify-center col-span-2">
                  {!loading && (
                    <Button
                      className="bg-buttoncolor outline outline-buttonborder "
                      type="submit"
                    >
                      Save
                    </Button>
                  )}
                  {loading && (
                    <Button disabled className="flex gap-3">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;

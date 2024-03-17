import { FaUserClock } from "react-icons/fa";

import logo from "../../assets/quickfix logo.png";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";
import Header from "./Header";
import { MdEdit, MdOutlineErrorOutline } from "react-icons/md";
import { AlertDialog } from "./AlertDialog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { spDataAction } from "../Actions/SpAction";
import Loader from "../Spinner/Spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./createProduct.css";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

import { useFormik } from "formik";
import { createProductSchema, editProductSchema } from "@/Schemas";

import { TextInput } from "@tremor/react";
import { Button } from "@material-tailwind/react";
import axiosInstance from "@/ulities/axios";
import { errorToast, showtoast } from "@/Toast/Toast";
import { Loader2 } from "lucide-react";

const TABLE_HEAD = ["Member", "Status", "Date", "View", "Quick Action"];

export function EditProduct() {
  const { id } = useParams();
  const [initialdata, setinitialdata] = useState({});
  const [success, setsuccess] = useState(false);
  const { title, price, description, category } = initialdata;
  const getSingleProductDetails = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/admin/single-product/${id}`
      );
      if (data?.success) {
        setinitialdata(data?.product);
        setsuccess(true);
      }
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
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
      title: "",
      picture: null,
      description: "",
      price: "",
      category: "",
    },
    validationSchema: editProductSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
        try {
          setloading(true);

          const { data } = await axiosInstance.put(
            `/api/v1/admin/update-product/${id}`,
            values,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          if (data?.success) {
            showtoast(data?.message);
            setloading(false);
            navigate("/admin/dashboard/all-products");
          }
        } catch (error) {
          setloading(false);
          errorToast(error.response.data.message);
        }
    },
  });

  const [coverpicture, setcoverpicture] = useState();
  const [picturePreview, setpicturePreview] = useState();
  const [categoryset, setcategoryset] = useState();
  const [allcategories, setallcategories] = useState(null);

  // get all categories
  const getallcategories = async (req, res) => {
    try {
      const { data } = await axiosInstance.get(
        "/api/v1/admin/get-all-categories"
      );
      if (data?.success) {
        setallcategories(data?.categories);
      }
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };

  const handleFileChange = (e) => {
    setcoverpicture(e.target.files[0]);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setpicturePreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (success) {
      setFieldValue("category", initialdata?.category?._id);
      setFieldValue("title", initialdata?.title);
      setFieldValue("description", initialdata?.description);
      setFieldValue("price", initialdata?.price);
    }
    setFieldValue("picture", coverpicture);
    if (categoryset) {
        setFieldValue("category", categoryset);
    }
    getallcategories();
    getSingleProductDetails();
  }, [coverpicture, categoryset, success]);

//   console.log(initialdata?.category?._id);
  console.log(values);
  return (
    <>
      <BurgerMenu />
      <div className="flex ">
        <Aside open={5} />

        <main className="lg:w-[100%] w-full  min-h-screen">
          <Header />
          <div className="w-full  min-h-screen p-4 flex flex-col gap-4">
            {/* heading */}

            <h3 className="text-primarycolor text-2xl">Add Product</h3>
            {/* product */}
            <div className=" grid md:grid-cols-4 gap-3 ">
              <div className="w-full  rounded-lg border-bordercolor flex flex-col  ">
                <div className="md:h-60 h-32 relative cursor-pointer  hover:bg-gray-700 border-2 border-dashed  rounded-lg hover:scale-105 hover:transition-all hover:animate-pulse">
                  <input
                    id="fileInput"
                    type="file"
                    className="w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                  {/* error */}
                  <div className="flex gap-2 items-center">
                    {errors.picture ? (
                      <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                        <MdOutlineErrorOutline className="text-xl" />
                        {errors.picture}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <label
                    htmlFor="fileInput"
                    className="w-full flex items-center"
                  >
                    <p className="text-center cursor-pointer text-mutedcolor absolute top-2 p-3 flex flex-col gap-3 items-center justify-center">
                      {picturePreview ? ( // Conditionally render the picture if available
                        <img
                          src={picturePreview}
                          alt="Cover Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          <img src={initialdata?.picture?.url} alt="" />
                        </>
                      )}
                    </p>
                  </label>
                </div>
              </div>
              <div className="col-span-2  ">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <Label htmlFor="title" className="text-primarycolor">
                    Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    value={values?.title}
                    placeholder="Title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="bg-inputbg_color border border-bordercolor text-primarycolor focus:outline-none focus-visible:ring-offset-0"
                  />
                  {/* error */}
                  <div className="flex gap-2 items-center">
                    {errors?.title && touched?.title ? (
                      <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                        <MdOutlineErrorOutline className="text-xl" />
                        {errors?.title}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <Label htmlFor="category" className="text-primarycolor">
                    Category
                  </Label>

                  <select
                    name="category"
                    value={values?.category}
                 className="bg-inputbg_color border border-bordercolor rounded-lg text-primarycolor"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    {allcategories?.map((cat) => {
                      return (
                        <option
                          key={cat?._id}
                          value={cat?._id}
                          className="cursor-pointer"
                        >
                          {cat?.category}
                        </option>
                      );
                    })}
                  </select>

                  {/* error */}
                  <div className="flex gap-2 items-center">
                    {errors?.category && touched?.category ? (
                      <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                        <MdOutlineErrorOutline className="text-xl" />
                        {errors?.category}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <Label htmlFor="description" className="text-primarycolor ">
                    Description
                  </Label>
                  <Textarea
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.description}
                    placeholder="Type your Description here."
                    id="description"
                    className="focus-visible:ring-offset-0 focus:outline-none bg-inputbg_color border border-bordercolor text-primarycolor"
                  />
                  {/* error */}

                  {errors?.description && touched.description ? (
                    <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                      <MdOutlineErrorOutline className="text-xl" />
                      {errors?.description}
                    </span>
                  ) : (
                    ""
                  )}

                  <Label htmlFor="price" className="text-primarycolor">
                    Price
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={values?.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="bg-inputbg_color border border-bordercolor text-primarycolor focus:outline-none focus-visible:ring-offset-0"
                  />
                  {/* error */}

                  {errors?.price && touched.price ? (
                    <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                      <MdOutlineErrorOutline className="text-xl" />
                      {errors?.price}
                    </span>
                  ) : (
                    ""
                  )}
                  {!loading && (
                    <Button
                      type="submit"
                      className="w-full capitalize text-sm bg-buttoncolor border border-buttonborder"
                    >
                      Create
                    </Button>
                  )}
                  {loading && (
                    <Button
                      disabled
                      className="flex justify-center items-center capitalize"
                    >
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  )}
                </form>
              </div>
              <div className="flex flex-col gap-3 ">
                <Label className="text-mutedcolor font-extralight ">
                  Product image
                </Label>
                <img
                  className="rounded-md h-40"
                  src={`${
                    picturePreview
                      ? picturePreview
                      : "https://5.imimg.com/data5/HY/TP/MY-13269795/alton-leo-single-lever-kitchen-sink-mixer-2f-kitchen-sink-tap-2f-360-degree-swivel-range-kitchen-taps-500x500.jpg"
                  }`}
                  alt=""
                />
                <Label className="text-mutedcolor font-extralight  ">
                  Category
                </Label>
                <p className="text-primarycolor ">
                  {values?.category ? values?.category : "Carpainter"}
                </p>
                <Label className="text-mutedcolor font-extralight  ">
                  Product Title
                </Label>
                <h3 className="text-primarycolor">
                  {values?.title
                    ? values.title
                    : "Mannat HD, Smart LED Fire TV"}
                </h3>
                <Label className="text-mutedcolor font-extralight  ">
                  Description
                </Label>
                <p className="text-primarycolor">
                  {values?.description
                    ? values?.description
                    : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}
                </p>
                <Label className="text-mutedcolor font-extralight  ">
                  Price
                </Label>
                <p className="text-primarycolor">
                  {values?.price ? values?.price : "1200"}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

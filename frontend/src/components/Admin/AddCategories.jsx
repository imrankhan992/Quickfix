import { FaUserClock } from "react-icons/fa";
import { AiOutlineProfile } from "react-icons/ai";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Chip,
  Avatar,
} from "@material-tailwind/react";
import logo from "../../assets/quickfix logo.png";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { spDataAction } from "../Actions/SpAction";
import Loader from "../Spinner/Spinner";
import { Button } from "@material-tailwind/react";
import { CiFilter } from "react-icons/ci";
import { CreateCategory } from "./CreateCategory";
import { errorToast, showtoast } from "@/Toast/Toast";
import axiosInstance from "@/ulities/axios";
const TABLE_HEAD = ["Name",  "Action"];
import { MdOutlineDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { DeleteCategory } from "./DeleteCategory";
import { EditCategory } from "./EditCategory";

export function AddCategories() {
  const [service, setservices] = useState("");
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [categores, setcategores] = useState([]);
  const [categorys, setcategory] = useState("");
  // create category
  const createService = async () => {
    try {
      setloading(true);
      const { data } = await axiosInstance.post(
        "/api/v1/admin/create-services",
        { service },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data?.success) {
        setloading(false);
        setsuccess(true);
        showtoast(data?.message);
        setservices("");
        getallCategories();
      }
      if (!data?.success) {
        setloading(false);
        errorToast(data?.message);
        setservices("");
      }
    } catch (error) {
      setloading(false);
      errorToast(error.response.data.message);
      setservices("");
    }
  };
  const dispatch = useDispatch();
  const { SPuser, SPloading, SPsuccess, SPerror } = useSelector(
    (state) => state.spData
  );

  const getallCategories = async () => {
    const { data } = await axiosInstance.get(
      "/api/v1/admin/get-all-categories"
    );
    if (data?.success) {
      setcategores(data?.categories);
    }
  };
  //   delete category
  const deleteCategory = async (id) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/v1/admin/delete-category/${id}`
      );
      if (data?.success) {
        showtoast(data?.message);
        getallCategories();
      }
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };
  // update category
  const updateCategory = async (id) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/v1/admin/update-category/${id}`,
        { category: categorys },
        { headers: { "Content-Type": "application/json" } }
      );
      if (data?.success) {
        showtoast(data?.message);
        getallCategories();
      }
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };
  useEffect(() => {
    dispatch(spDataAction());
    getallCategories();
  }, [dispatch]);
 
  return (
    <>
      <BurgerMenu />
      <div className="flex ">
        <Aside open={2} />

        <main className="lg:w-[100%] w-full  h-full bg-cardbg">
          <Header />
          <div className="w-full  min-h-screen p-4 flex flex-col gap-4">
            {/* heading */}

            <div className="flex justify-between">
              <h3 className="text-hoverblack text-3xl  font-bold arimo">Add Services</h3>

              <CreateCategory
                createService={createService}
                setservices={setservices}
                service={service}
                loading={loading}
                success={success}
              />
            </div>
            {/* table */}
            {!SPloading && (
              <Card className="h-full w-full rounded-2xl bg-thirdcolor z-1">
                <CardHeader
                  floated={false}
                  shadow={false}
                  className="rounded-none bg-thirdcolor"
                >
                  
                </CardHeader>
                <CardBody className="px-0 bg-thirdcolor text-hoverblack overflow-auto ">
                  <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head, index) => (
                          <th
                            key={head}
                            className="cursor-pointer border-y border-blue-gray-100 p-4 transition-colors  bg-sidebarbg"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="flex items-center justify-between gap-2 font-normal leading-none    text-primarycolor"
                            >
                              {head}{" "}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {categores?.map(({ category, _id }, index) => {
                        const isLast = index === categores?.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-bordercolor ";

                        return (
                          <tr key={index}>
                            <td className={classes}>
                              <div className="flex items-center gap-3 ">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal text-hoverblack"
                                >
                                  {category}
                                </Typography>
                              </div>
                            </td>

                            
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal text-hoverblack"
                              >
                                <div className="flex items-center  gap-3">
                                  <EditCategory
                                    setcategory={setcategory}
                                    category={categorys}
                                    currentCategory={category}
                                    updateCategory={updateCategory}
                                    _id={_id}
                                  />

                                  <DeleteCategory
                                    deleteCategory={deleteCategory}
                                    _id={_id}
                                  />
                                </div>
                              </Typography>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            )}

            {/* if sp data loading */}
            {SPloading && <Loader />}
          </div>
          {/* testing */}
        </main>
      </div>
    </>
  );
}

import { FaUserClock } from "react-icons/fa";
import {
  Card,
  CardHeader,
  Typography,
  Chip,
  CardBody,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";
import Header from "./Header";
import { AlertDialog } from "./AlertDialog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { spDataAction } from "../Actions/SpAction";
import Loader from "../Spinner/Spinner";
import { Link } from "react-router-dom";

const TABLE_HEAD = ["Member", "Status", "Date", "View", "Quick Action"];

const Tabs = ({ selectedTab, setSelectedTab }) => {
  const tabs = ["Pending", "Approved", "Deactivated", "Rejected", "Disabled"];

  return (
    <div className="flex items-center flex-wrap gap-3 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setSelectedTab(tab)}
          className={`px-4 py-2 font-bold text-[12px] md:text-sm ${
            selectedTab === tab ? "bg-buttoncolor text-white" : "bg-sidebarbg text-white"
          } rounded-md mr-2`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export function Users() {
  const dispatch = useDispatch();
  const { SPuser, SPloading } = useSelector((state) => state.spData);
  const [selectedTab, setSelectedTab] = useState("Pending");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(spDataAction());
  }, [dispatch]);

  const filteredSPuser = SPuser?.filter((user) => {
    const matchesTab =
      selectedTab === "Pending" && user.accountStatus === "pending" ||
      selectedTab === "Approved" && user.accountStatus === "approve" ||
      selectedTab === "Deactivated" && user.accountStatus === "deactivate" ||
      selectedTab === "Rejected" && user.accountStatus === "reject" ||
      selectedTab === "Disabled" && user.accountStatus === "disabled";
    
    const matchesSearch = user._id.includes(searchTerm);

    return matchesTab && matchesSearch;
  });

  return (
    <>
      <BurgerMenu />
      <div className="flex">
        <Aside open={3} />
        <main className="lg:w-[100%] w-full h-full bg-thirdcolor">
          <Header />
          <div className="w-full min-h-screen p-4 flex flex-col gap-4">
            <h3 className="text-hoverblack text-3xl font-bold">All Service Providers</h3>

            <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2  rounded-md w-full bg-cardbg text-hoverblack focus:ring-offset-1 focus:ring-offset-buttoncolor  border border-bordercolor"
              />
            </div>

            {!SPloading && (
              <Card className="h-full w-full rounded-none bg-thirdcolor z-1">
                <CardBody className="px-0 bg-thirdcolor text-hoverblack overflow-auto">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="cursor-pointer border-y border-blue-gray-100 bg-sidebarbg p-4 transition-colors"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="flex items-center justify-between gap-2 font-normal leading-none text-primarycolor"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSPuser?.map(
                        (
                          {
                            avatar,
                            firstname,
                            lastname,
                            email,
                            _id,
                            accountStatus,
                            date,
                          },
                          index
                        ) => {
                          const isLast = index === filteredSPuser?.length - 1;
                          const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50";

                          return (
                            <tr key={_id}>
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <Avatar src={avatar?.url} alt={firstname} size="sm" />
                                  <div className="flex flex-col">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal text-hoverblack"
                                    >
                                      {firstname + " " + lastname}
                                    </Typography>
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal opacity-70 text-hoverblack"
                                    >
                                      {email}
                                    </Typography>
                                  </div>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="w-max">
                                  <Chip
                                    className="text-hoverblack"
                                    variant="ghost"
                                    size="sm"
                                    value={accountStatus}
                                    color={
                                      accountStatus === "pending"
                                        ? "yellow"
                                        : accountStatus === "approve"
                                        ? "green"
                                        : accountStatus === "deactivate"
                                        ? "red"
                                        : accountStatus === "reject"
                                        ? "red"
                                        : accountStatus === "disabled"
                                        ? "gray"
                                        : "blue-gray"
                                    }
                                  />
                                </div>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal text-hoverblack"
                                >
                                  {date}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Link to={`/admin/dashboard/applicant/${_id}`}>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal text-hoverblack underline"
                                  >
                                    View Profile
                                  </Typography>
                                </Link>
                              </td>
                              <td className={classes}>
                                <Tooltip content="Quick Action">
                                  <AlertDialog id={_id} accountStatuss={accountStatus} />
                                </Tooltip>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            )}

            {SPloading && <Loader />}
          </div>
        </main>
      </div>
    </>
  );
}

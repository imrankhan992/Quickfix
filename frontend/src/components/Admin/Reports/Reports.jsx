import axiosInstance from "@/ulities/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BurgerMenu } from "../BurgerMenu";
import Aside from "../Aside";
import Header from "../Header";
import toast from "react-hot-toast";
import { useSocketContext } from "@/context/SocketContext";


const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const { pendingCounts, setPendingCounts} = useSocketContext()
  const getAllReports = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/api/v1/get-all-reports");

      if (data) {
        setReports(data?.reports);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   if(reports.length > 0){
    const pending = reports.filter(report => report.status === "pending")
    setPendingCounts(pending?.length)
   }
  }, [reports])
  
  const handleStatusChange = async (reportId, newStatus,serviceProviderId) => {
    try {
        const {data} = await axiosInstance.put(`/api/v1/update-report-status/${reportId}`, {status: newStatus, serviceProviderId});
        if(data?.success){
            getAllReports()
            setReports((prevReports) =>
                prevReports.map((report) =>
                  report._id === reportId ? { ...report, status: newStatus } : report
                )
              );
        }
     
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const filteredReports =
    filterStatus === "all"
      ? reports
      : reports.filter((report) => report.status === filterStatus);
  useEffect(() => {
    getAllReports();
  }, []);

  if (loading)
    return (
      <div>
        {" "}
        <Aside open={6} />{" "}
        <main className="clg:w-[100%] w-full  h-full bg-cardbg text-black">
          Loading...
        </main>{" "}
      </div>
    );
  return (
    <>
      <BurgerMenu />
      <div className="flex ">
        <Aside open={6} pendingCounts={pendingCounts}/>
        <main className="clg:w-[100%] w-full  h-full bg-cardbg px-6">
          <Header />

          <div className="w-full  min-h-screen p-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Reported Service Providers 
            </h2>
            <div className="mt-4 mb-4">
              <label className="mr-2">Filter by Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="overflow-auto">
              {filteredReports.length === 0 ? (
                <p>No reports found.</p>
              ) : (
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-buttoncolor">
                      <th className="py-2 px-4 border-b">
                        Service Provider _id
                      </th>
                      <th className="py-2 px-4 border-b">Reported By</th>
                      <th className="py-2 px-4 border-b">Reason</th>
                      
                      <th className="py-2 px-4 border-b">Reports Count</th>
                      <th className="py-2 px-4 border-b">Status</th>
                      <th className="py-2 px-4 border-b">Reported At</th>
                      <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report) => (
                      <tr key={report._id}>
                        <td className="py-2 px-4 border-b">
                          <Link to={`/admin/dashboard/reported_profile/${report?.serviceProvider?._id}`} className="hover:underline">
                            {report?.serviceProvider?._id}
                          </Link>
                        </td>
                        <td className="py-2 px-4 border-b">
                          {report?.user?.firstname}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {report?.serviceProvider?.reportCount}
                        </td>
                        <td className={`py-2 px-4 border-b `}>
                          {report?.reason}
                        </td>
                        <td
                          className={`py-2 px-4 border-b ${
                            report?.status === "pending"
                              ? "text-yellow-900"
                              : ""
                          } ${
                            report?.status === "approved" ? "text-red-900" : ""
                          } ${
                            report?.status === "rejected"
                              ? "text-green-900"
                              : ""
                          }`}
                        >
                          {report?.status}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {new Date(report.createdAt).toLocaleString()}
                        </td>
                        <td className="py-2 px-4 border-b">
                          <select
                            value={report.status}
                            onChange={(e) =>
                              handleStatusChange(report._id, e.target.value, report.serviceProvider._id)
                            }
                            className="border p-2 rounded"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Reports;

import React, { useEffect, useState } from "react";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";
import { useSelector } from "react-redux";
import Header from "./Header";
import axiosInstance from "@/ulities/axios";
import { errorToast } from "@/Toast/Toast";
import { Badge } from "@material-tailwind/react";
import { AcceptOfferCard } from "./AcceptedOfferCard";
import Loading from "@/Pages/Loading";
import { Input } from "@/components/ui/input";

const Tabs = ({ selectedTab, setSelectedTab }) => {
  const tabs = ["Pending", "Completed", "Search"];

  return (
    <div className="flex items-center flex-wrap gap-3 mb-8">
      {tabs.map((tab) =>
        tab === "Search" ? (
          ""
        ) : (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 font-bold text-[12px] md:text-sm ${
              selectedTab === tab ? "bg-buttoncolor text-white" : "bg-sidebarbg"
            } rounded-md mr-2`}
          >
            {tab}
          </button>
        )
      )}
    </div>
  );
};

const AcceptedOffers = () => {
  const { user } = useSelector((state) => state.user);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Pending");
  const [searchTerm, setSearchTerm] = useState("");

  const getAcceptedOffers = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        "api/v1/order/get-accepted_offers/service_provider"
      );
      if (data.success) {
        setOffers(data.orders);
      }
    } catch (error) {
      errorToast(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAcceptedOffers();
  }, []);

  const filteredOffers = offers.filter((offer) => {
    switch (selectedTab) {
      case "Completed":
        return offer.serviceProviderOrderStatus === "completed";
      case "Processing":
        return offer.serviceProviderOrderStatus === "processing";
      case "Pending":
        return offer.serviceProviderOrderStatus === "pending";
      case "Cancelled":
        return offer.serviceProviderOrderStatus === "Cancel";
      case "Search":
        const titleMatch = offer?.order?.serviceId?.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const idMatch = offer?._id
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        return titleMatch || idMatch;
      default:
        return true;
    }
  });

  return (
    <div className="w-full h-screen mx-auto max-w-[1750px] bg-cardbg">
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={3} />
        <main className="text-primarycolor w-full">
          <Header user={user} />

          <div className="px-8 py-6">
            <div className="flex items-center justify-start text-3xl text-hoverblack font-bold mb-7">
              Your Accepted Orders
            </div>
            <div>
              <Input
                autoComplete="off"
                className={`arimo max-w-96 mb-6  text-[16px] bg-sidebarbg  focus:border-black focus:bg-buttoncolor p-4 rounded-xl  placeholder:text-primarycolor outline-2  outline-black`}
                placeholder="Search by title or order id..."
                name="search"
                type="text"
                id="search"
                onChange={(e) => {
                  setSelectedTab("Search");
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
            <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <div className="flex gap-8 items-center flex-wrap">
              {!loading &&
                filteredOffers?.length > 0 &&
                filteredOffers?.map((order) => (
                  <Badge
                    key={order._id}
                    content={`${order?.serviceProviderOrderStatus}`}
                    className="text-[15px] armo bg-buttoncolor text-hoverblack font-bold select-none"
                  >
                    <AcceptOfferCard order={order} />
                  </Badge>
                ))}
            </div>
            {!loading && filteredOffers?.length === 0 && (
              <div className="text-center text-mutedcolor text-xl font-bold">
                No {selectedTab} Orders
              </div>
            )}
            {loading && (
              <div className="text-center text-mutedcolor text-xl font-bold">
                <Loading />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AcceptedOffers;

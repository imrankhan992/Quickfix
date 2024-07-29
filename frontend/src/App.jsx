import { useEffect } from "react";

import SPSignup from "./components/Signup/SPSignup";
import Congratulation from "./components/Signup/Congratulation";
import CheckEmail from "./components/Signup/CheckEmail";
import Profile from "./components/Signup/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SubmitProfile from "./components/Signup/SubmitProfile";

import SetUprofilePrivate from "./components/PrivateRoutes/SetupProfile";
import Login from "./components/Login/Login";
import AdminPrivate from "./components/PrivateRoutes/AdminPrivate";
import Dashboard from "./components/Admin/Dashboard";
import ServiceDashboard from "./components/User/ServiceProvider/Dashboard";
import ServiceProviderPrivate from "./components/PrivateRoutes/ServiceproviderPrivate";
import UserSignup from "./components/UserSignup/UserSignup";
import CongratsUser from "./components/UserSignup/CongratsUser";
import { Users } from "./components/Admin/Users";
import { SingleServiceProvider } from "./components/Admin/SingleServiceProvider";
import { AddCategories } from "./components/Admin/AddCategories";
import { CreateProduct } from "./components/Admin/CreateProduct";
import AllProducts from "./components/Admin/AllProducts";
import { EditProduct } from "./components/Admin/EditProduct";
import UserPrivate from "./components/PrivateRoutes/UserPrivate";
import UserDashboard from "./components/User/serviceConsumer/Dashboard";
import Services from "./components/User/serviceConsumer/Services";
import ServiceproviderServices from "./components/User/ServiceProvider/Services";
import Orders from "./components/User/serviceConsumer/Orders";
import PreviousOrders from "./components/User/serviceConsumer/PreviousOrders";
import store from "./Store";
import { loadUserData } from "./components/Actions/Registration";
import Settings from "./components/User/serviceConsumer/Settings";
import ServiceProviderOrders from "./components/User/ServiceProvider/ServiceProviderOrders";
import ServiceProviderPreviousOrders from "./components/User/ServiceProvider/ServiceProviderPreviousOrders";
import ServiceProviderProfile from "./components/User/ServiceProvider/Profile";
import SingleServices from "./components/SingleServices/SingleServices";
import FindServiceProviders from "./components/Services/FindServiceProviders";
import IdleTimerContainer from "./components/IdleTimerContainer";
import { useSelector } from "react-redux";

import LiveOrdreRecieve from "./Pages/LiveOrdreRecieve";


import RIdeRequestToast from "./Toast/RIdeRequestToast";
import { useSocketContext } from "./context/SocketContext";
import notification from "./assets/sounds/notification.mp3";
import useListenOrder from "./Hooks/useListenOrder";
import RequestOrder from "./components/User/ServiceProvider/RequestOrder";
import SingleOrder from './components/User/ServiceProvider/SingleOrder';
import useListenOffer from "./Hooks/useListenOffer";
import useListenOfferAccept from "./Hooks/useListenAcceptOffer";
import AcceptedOffers from "./components/User/serviceConsumer/AcceptedOffers";
import AcceptedOffersServiceProvider from "./components/User/ServiceProvider/AcceptedOffers";
import Chatting from "./components/User/serviceConsumer/Chatting";
import ChattingServiceProvider from "./components/User/ServiceProvider/Chatting";
import SingleAcceptedOrder from "./components/User/serviceConsumer/SingleAcceptedOrder";
import SingleAcceptedOrderServiceProvider from "./components/User/ServiceProvider/SingleAcceptedOrder";
import ChooseJob from "./components/Signup/ChooseJob";
import RegistrationPrivate from "./components/PrivateRoutes/RegistrationPrivate";
import RechargeAccount from "./components/User/ServiceProvider/RechargeAccount";


import ResetPassword from "./components/ResetPassword/ResetPassword";
import SetPassword from "./components/ResetPassword/SetPassword";
import UserProfile from "./components/User/serviceConsumer/UserProfile";
import Reports from "./components/Admin/Reports/Reports";
import ReportedProfile from "./components/Admin/Reports/ReportedProfile";

function App() {
const {newOrder} = useSocketContext()
  useListenOrder();
  useListenOffer();
  useListenOfferAccept()
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUserData());
  }, []);
 console.log(newOrder);
  return (
    <>
      <IdleTimerContainer>
        <Router>
          <Routes>
            
           {/* reset password */}
           <Route path="/reset-password" element={<ResetPassword />} />
          
          

           <Route path="/api/v1/email/account/reset-password/:token" element={<SetPassword />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={!user ? <ChooseJob /> : <Home />} />
            <Route
              path="/serviceprovider/createaccount"
              element={<SPSignup />}
            />
            <Route
              path="/finding-serviceproviders"
              element={<LiveOrdreRecieve />}
            />
            <Route path="/client/createaccount" element={<UserSignup />} />
            {
              <Route
                path="/service/find/serviceproviders/nearby/:id"
                element={user ? <FindServiceProviders /> : <Login />}
              />
            }

            {/* single service page */}
            <Route
              path="/single/services/:services/:id"
              element={<SingleServices />}
            />
            {/* verify email checking */}
            <Route
              path="/api/v1/email/"
             
            >
              <Route
                path="account/verify/:token"
                element={<Congratulation />}
              />
              <Route
                path="user/account/verify/:token"
                element={<CongratsUser />}
              />
            </Route>
           
            {/* user email verify */}
            <Route
              path="/api/v2/email/user/"
              element={
                <RegistrationPrivate route={"/api/v1/user/email/verify"} />
              }
            >
              <Route path="account/verify/:token" element={<CongratsUser />} />
            </Route>
            <Route path="/verifyemail" element={<CheckEmail />} />
            <Route path="/login" element={<Login />} />

            <Route element={<SetUprofilePrivate />}>
              <Route path="/setup" element={<Profile />} />
            </Route>
            <Route path="/submitprofile" element={<SubmitProfile />} />

            {/*user dashboard  */}
            <Route path="/user/dashboard/" element={<UserPrivate />}>
            <Route path="profile/:id" element={<UserProfile />} />
              <Route path="my profile" element={<UserDashboard />} />
              <Route path="services" element={<Services />} />
              <Route path="orders" element={<Orders />} />
              <Route path="accepted-orders" element={<AcceptedOffers />} />
              <Route path="accepted-orders/:id" element={<SingleAcceptedOrder />} />
              <Route path="chatting/:id" element={<Chatting />} />
              <Route path="previous-orders" element={<PreviousOrders />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            {/* admin dashboard */}
            <Route path="/admin/dashboard/" element={<AdminPrivate />}>
            <Route path="reports" element={<Reports />} />
            <Route path="reported_profile/:id" element={<ReportedProfile />} />
              <Route path="My Profile" element={<Dashboard />} />
              <Route path="customers" element={<Users />} />
              <Route path="applicant/:id" element={<SingleServiceProvider />} />
              <Route path="add/services" element={<AddCategories />} />
              <Route path="create-product" element={<CreateProduct />} />
              <Route path="all-products" element={<AllProducts />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
            </Route>

            {/* service provider dashboard */}
            <Route
              path="/serviceprovider/dashboard/"
              element={<ServiceProviderPrivate />}
            >
              <Route path="My Profile" element={<ServiceDashboard />} />
              <Route path="services" element={<ServiceproviderServices />} />
              <Route path="orders" element={<AcceptedOffersServiceProvider />} />
              <Route path="accepted-orders/:id" element={<SingleAcceptedOrderServiceProvider />} />
              <Route path="chatting/:id" element={<ChattingServiceProvider />} />
              <Route path="request/order" element={<RequestOrder />} />
              <Route path="single/order" element={<SingleOrder />} />
              <Route path="recharge-account" element={<RechargeAccount />} />
              <Route
                path="previous-orders"
                element={<ServiceProviderPreviousOrders />}
              />
              <Route
                path="yours/profile"
                element={<ServiceProviderProfile />}
              />
            </Route>
          </Routes>
        </Router>
      </IdleTimerContainer>
    </>
  );
}

export default App;

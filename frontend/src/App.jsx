import { useEffect, useState } from "react";
import ChooseJob from "./components/Signup/chooseJob";
import SPSignup from "./components/Signup/SPSignup";
import Congratulation from "./components/Signup/Congratulation";
import CheckEmail from "./components/Signup/CheckEmail";
import Profile from "./components/Signup/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SubmitProfile from "./components/Signup/SubmitProfile";
import RegistrationPrivate from "./components/PrivateRoutes/registrationPrivate";
import SetUprofilePrivate from "./components/PrivateRoutes/SetupProfile";
import Login from "./components/Login/Login";
import { Toaster } from "react-hot-toast";
import AdminPrivate from "./components/PrivateRoutes/AdminPrivate";
import Dashboard from "./components/Admin/Dashboard";
import ServiceDashboard from "./components/User/ServiceProvider/Dashboard";
import ServiceProviderPrivate from "./components/PrivateRoutes/ServiceproviderPrivate";
import UserSignup from "./components/UserSignup/UserSignup";
import CongratsUser from "./components/UserSignup/CongratsUser";
import { Users } from "./components/Admin/Users";
import { SingleServiceProvider } from "./components/Admin/SingleServiceProvider";
import { AddCategories } from "./components/Admin/AddCategories";
import {CreateProduct} from "./components/Admin/CreateProduct";
import AllProducts from "./components/Admin/AllProducts";
import { EditProduct } from "./components/Admin/EditProduct";
import UserPrivate from "./components/PrivateRoutes/UserPrivate";
import UserDashboard from './components/User/serviceConsumer/Dashboard';
import Services from "./components/User/serviceConsumer/Services";
import ServiceproviderServices from "./components/User/ServiceProvider/Services";
import Orders from "./components/User/serviceConsumer/Orders";
import PreviousOrders from "./components/User/serviceConsumer/PreviousOrders";
import store from "./Store";

import { loadUserData } from "./components/Actions/Registration";
import Settings from "./components/User/serviceConsumer/Settings";
import ServiceProviderOrders from "./components/User/ServiceProvider/ServiceProviderOrders";
import ServiceProviderPreviousOrders from "./components/User/ServiceProvider/ServiceProviderPreviousOrders";
import ServiceProviderProfile from './components/User/ServiceProvider/Profile';
import SingleServices from "./components/SingleServices/SingleServices";

function App() {
  
  useEffect(() => {
    store.dispatch(loadUserData());
  
  }, []);
  return (
    <>
      <Toaster />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<ChooseJob />} />
          <Route path="/serviceprovider/createaccount" element={<SPSignup />} />
          <Route path="/client/createaccount" element={<UserSignup />} />
          {/* single service page */}
          <Route path="/single/services/:services/:id" element={<SingleServices />} />
          {/* verify email checking */}
          <Route
            path="/api/v1/email/"
            element={<RegistrationPrivate route={"/api/v1/verify"} />}
          >
            <Route path="account/verify/:token" element={<Congratulation />} />
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
          <Route path="/user/dashboard/"  element={<UserPrivate/>}>
            <Route path="my profile" element={<UserDashboard />} />
            <Route path="services" element={<Services />} />
            <Route path="orders" element={<Orders />} />
            <Route path="previous-orders" element={< PreviousOrders/>} />
            <Route path="settings" element={< Settings/>} />
          </Route>
          {/* admin dashboard */}
          <Route path="/admin/dashboard/" element={<AdminPrivate/>}>
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
            <Route path="orders" element={<ServiceProviderOrders />} />
            <Route path="previous-orders" element={<ServiceProviderPreviousOrders />} />
            <Route path="yours/profile" element={<ServiceProviderProfile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

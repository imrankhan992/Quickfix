import { useEffect, useState } from "react";
import ChooseJob from "./components/Signup/chooseJob";
import SPSignup from "./components/Signup/SPSignup";
import Congratulation from "./components/Signup/Congratulation";
import CheckEmail from "./components/Signup/CheckEmail";
import Profile from "./components/Signup/Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";
import Home from "./components/Home/Home";
import SubmitProfile from "./components/Signup/SubmitProfile";
import RegistrationPrivate from "./components/PrivateRoutes/registrationPrivate";
import SetUprofilePrivate from "./components/PrivateRoutes/SetupProfile";
import Login from "./components/Login/Login";
import  { Toaster } from 'react-hot-toast';
import AdminPrivate from "./components/PrivateRoutes/AdminPrivate";
import Dashboard from "./components/Admin/Dashboard";
import ServiceDashboard from './components/User/ServiceProvider/Dashboard';
import ServiceProviderPrivate from "./components/PrivateRoutes/ServiceproviderPrivate";
import UserSignup from './components/UserSignup/UserSignup';
import CongratsUser from "./components/UserSignup/CongratsUser";


function App() {
  return (
    <>
      <Toaster />
    
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<ChooseJob />} />
          <Route path="/serviceprovider/createaccount" element={<SPSignup />} />
          <Route path="/client/createaccount" element={<UserSignup />} />
          {/* verify email checking */}
          <Route
            path="/api/v1/email/"
            element={<RegistrationPrivate route={"/api/v1/verify"} />}
          >
            <Route path="account/verify/:token" element={<Congratulation />} />
            <Route path="user/account/verify/:token" element={<CongratsUser />} />
          </Route>
          {/* user email verify */}
          <Route
            path="/api/v2/email/user/"
            element={<RegistrationPrivate route={"/api/v1/user/email/verify"} />}
          >
           
            <Route path="account/verify/:token" element={<CongratsUser />} />
          </Route>
          <Route path="/verifyemail" element={<CheckEmail />} />
          <Route path="/login" element={<Login />} />

          <Route element={<SetUprofilePrivate />}>
            <Route path="/setup" element={<Profile />} />
          </Route>
          <Route path="/submitprofile" element={<SubmitProfile />} />
          {/* admin routes */}
          <Route path="/admin/" element={<AdminPrivate/>}>
            <Route path="dashboard" element={<Dashboard/>} />
          </Route>
          {/*user dashboard  */}
          <Route path="/user/dashboard/">
            <Route path="home" element={<ServiceDashboard/>} />
          </Route>
          {/* admin dashboard */}
          <Route path="/admin/dashboard/">
            <Route path="My Profile" element={<Dashboard/>} />
          </Route>

          {/* service provider dashboard */}
          <Route path="/serviceprovider/dashboard/" element={<ServiceProviderPrivate/>}>
            <Route path="My Profile" element={<ServiceDashboard/>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

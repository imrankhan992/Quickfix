import { useState } from "react";
import ChooseJob from "./components/Signup/chooseJob";
import SPSignup from "./components/Signup/SPSignup";
import Congratulation from "./components/Signup/Congratulation";
import CheckEmail from "./components/Signup/CheckEmail";
import Profile from "./components/Signup/Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
import SubmitProfile from "./components/Signup/SubmitProfile";
import RegistrationPrivate from "./components/PrivateRoutes/registrationPrivate";
import SetUprofilePrivate from './components/PrivateRoutes/SetupProfile';

function App() {
  return (
    <>
      {/* <ChooseJob/> */}
      {/* <SPSignup/> */}
      {/* <Congratulation/> */}
      {/* <CheckEmail/> */}
      {/* <Profile/> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<ChooseJob />} />
          <Route path="/createaccount" element={<SPSignup />} />
          {/* verify email checking */}
          <Route path="/api/v1/email/" element={<RegistrationPrivate route={"/api/v1/verify"}/>}>
            <Route path="account/verify/:token" element={<Congratulation />} />
          </Route>
          <Route path="verifyemail" element={<CheckEmail />} />

        
          <Route  element={<SetUprofilePrivate />}>
          <Route path="/setup" element={<Profile />} />
          </Route>
          <Route path="/submitprofile" element={<SubmitProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

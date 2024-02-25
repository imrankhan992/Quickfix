import { useState } from "react";
import ChooseJob from "./components/Signup/chooseJob";
import SPSignup from "./components/Signup/SPSignup";
import Congratulation from "./components/Signup/Congratulation";
import CheckEmail from "./components/Signup/CheckEmail";
import Profile from "./components/Signup/Profile";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import SubmitProfile from "./components/Signup/SubmitProfile";

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
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<ChooseJob/>}/>
      <Route path="/createaccount" element={<SPSignup/>}/>
      <Route path="/verifyemail" element={<CheckEmail/>}/>
      <Route path="/congrats" element={<Congratulation/>}/>
      <Route path="/setup" element={<Profile/>}/>
      <Route path="/submitprofile" element={<SubmitProfile/>}/>
      </Routes>
     
     </Router>
    </>
  );
}

export default App;

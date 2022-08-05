import React from "react";
import Sidebar from "../components/Profile/Sidebar";
import Navbar from "../components/Navbar";
import ProfileUser from "../components/Profile/ProfileUser";
import ProfileUserUpdate from "../components/Profile/ProfileUserUpdate";
import ProfileCurParty from "../components/Profile/ProfileCurParty";
import ProfilePastParty from "../components/Profile/ProfilePastParty";
import ProfileMyReview from "../components/Profile/ProfileMyReview";
import ProfileMyWalk from "../components/Profile/ProfileMyWalk";
import { Route, Routes } from "react-router-dom";

const Profile = () => {
  const user = {
    userServiceId: "theresjahn",
    userPoint: 36.5,
  };

  return (
    <>
      <Navbar />
      <div className="w-per75 m-auto flex">
        <Sidebar user={user}></Sidebar>
        <div className="bg-centerDiv-blue w-full">
          <Routes>
            <Route path="" element={<ProfileUser />} />
            <Route path="userupdate" element={<ProfileUserUpdate />} />
            <Route path="curparty" element={<ProfileCurParty />} />
            <Route path="pastparty" element={<ProfilePastParty />} />
            <Route path="myreview" element={<ProfileMyReview />} />
            <Route path="mywalkthrough" element={<ProfileMyWalk />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Profile;

import Header from "../../components/Header";
import Profile from "../../components/Profile";
import React from "react";

export default function ProfilePage() {
  return (
    <div>
      <Header />
      <div style={{ maxWidth: "90%", margin: "auto", paddingTop: "80px" }}>
        <Profile></Profile>
      </div>
    </div>
  );
}

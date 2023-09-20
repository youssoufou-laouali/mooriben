import React from "react";
import EditProfile from "../../components/EditProfile";
import UserHeader from "../../components/UserHeader";
import UserLayout from "../../components/UserLayout";

const Profile = () => {
  return (
    <div>
      <UserHeader />
      <UserLayout>
        {/* Modifier son profile */}
        <EditProfile />
      </UserLayout>
    </div>
  );
};

export default Profile;

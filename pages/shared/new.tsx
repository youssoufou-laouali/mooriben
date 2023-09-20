import React from "react";
import SendFile from "../../components/SendFile";
import UserHeader from "../../components/UserHeader";
import UserLayout from "../../components/UserLayout";

const ShareNewFile = () => {
  return (
    <div>
      <UserHeader />
      <UserLayout>
        {/* url file, who access, description to tell why the file's sharing,  */}

        <SendFile />
      </UserLayout>
    </div>
  );
};

export default ShareNewFile;

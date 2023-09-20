import React, { useEffect } from "react";
import ArticleModify from "../../../components/ArticleModify";
import UserHeader from "../../../components/UserHeader";
import UserLayout from "../../../components/UserLayout";

const NewArticle = () => {
  return (
    <div>
      <UserHeader />
      <UserLayout>
        <ArticleModify />
      </UserLayout>
    </div>
  );
};

export default NewArticle;

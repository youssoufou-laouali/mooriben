import axios from "axios";
import React, { useEffect } from "react";
import Info from "../../components/Info";
import News from "../../components/News";
import TableSharedFile from "../../components/TableSharedFile";
import UserHeader from "../../components/UserHeader";
import UserLayout from "../../components/UserLayout";
import { url_api } from "../../constant";
import Layout from "../_layout";

const Dashboard = () => {
  return (
    <div>
      <UserHeader />
      <UserLayout>
        <News />
        <div className="my-5 border border-gray-100 rounded-lg">
          <TableSharedFile />
        </div>
        <div className="p-5 my-5 border border-gray-100 rounded-lg">
          <p className="p-5 text-sm font-bold leading-normal text-gray-800 focus:outline-none md:text-lg ">
            Fichier public
          </p>
          <div className="flex overflow-auto flex-nowrap max-w-7xl">
            <Info isInfo={false} />
            <Info isInfo={false} />
            <Info isInfo={false} />
            <Info isInfo={false} />
          </div>
        </div>
        <div className="p-5 my-5 border border-gray-100 rounded-lg">
          <p className="p-5 text-sm font-bold leading-normal text-gray-800 focus:outline-none md:text-lg ">
            Informations utiles
          </p>
          <div className="flex my-5 overflow-auto flex-nowrap max-w-7xl">
            <Info isInfo={true} />
            <Info isInfo={true} />
            <Info isInfo={true} />
            <Info isInfo={true} />
          </div>
        </div>
      </UserLayout>
    </div>
  );
};

export default Dashboard;

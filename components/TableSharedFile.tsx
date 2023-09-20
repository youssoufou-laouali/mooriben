import { FolderIcon, Bars3CenterLeftIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { url_api } from "../constant";
import Accordion from "./Accordion";
import TableFooter from "./TableFooter";

const SharedStatus = {
  all: "all",
  iShared: "iShared",
  sharedWithMe: "sharedWithMe",
};

const Disposition = {
  block: "block",
  inline: "inline",
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const TableSharedFile = () => {
  const [files, setFiles] = useState([]);
  const [skip, setSkip] = useState(0);
  const [totals, setTotals] = useState(0);
  const [order, setOrder] = useState<"desc" | "asc">("desc");

  useEffect(() => {
    getFiles();
  }, [skip]);

  const getFiles = () => {
    const token: any = localStorage.getItem("access_token");
    axios({
      method: "get",
      url: url_api + "/file?skip=" + skip + "&order=" + order,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        // toast.success("Fichier partagé avec success!");
        console.log(res);
        setTotals(res.data.totals);
        const data: any = [];
        res.data.files?.map((file: any) => {
          let donne = { ...file };
          delete donne?.fichiers;
          const fichiers = JSON.parse(file?.fichiers);
          fichiers?.map((fichier: any) => {
            data.push({
              ...donne,
              ...fichier,
            });
          });
        });

        setFiles(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const router = useRouter();
  const { SHAREDSTATUS, DISPOSITION } = router.query;
  const [sharedStatus, setSharedStatus] = useState<string>(
    (SHAREDSTATUS as string) ?? SharedStatus.all
  );
  const [alignment, setAlignment] = useState<string>(Disposition.block);
  const shangeQuery = () => {
    setSharedStatus((SHAREDSTATUS as string) ?? SharedStatus.all);
  };
  useEffect(() => {
    shangeQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <div>
      <div className="w-full text-sm sm:px-6">
        <div className="px-4 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold leading-normal text-gray-800 focus:outline-none md:text-lg ">
              Fichier partagées
              <span className="block">
                <Bars3CenterLeftIcon
                  onClick={() => setAlignment(Disposition.block)}
                  className={classNames(
                    "h-8 cursor-pointer hover:scale-110  inline-block p-1 rounded-md mr-2  ",
                    alignment == Disposition.block
                      ? "bg-green-700 text-white"
                      : "text-gray-400 hover:text-gray-700"
                  )}
                />
                <FolderIcon
                  onClick={() => setAlignment(Disposition.inline)}
                  className={classNames(
                    "h-8 inline-block hover:scale-110  cursor-pointer p-1 rounded-md ",
                    alignment == Disposition.inline
                      ? "bg-green-700 text-white"
                      : "text-gray-400 hover:text-gray-700"
                  )}
                />
              </span>
            </p>
            <div className="flex items-center p-2 text-sm font-medium leading-none text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300">
              <p>Trié par:</p>
              <select
                aria-label="select"
                className="py-0 ml-1 bg-transparent border-none outline-none ring-0 focus:text-green-600 focus:outline-none"
              >
                <option className="text-sm text-green-800">Recent</option>
                <option className="text-sm text-green-800">Anciens</option>
              </select>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 bg-white md:py-7 md:px-8 xl:px-10">
          <div className="items-center justify-between sm:flex">
            <div className="flex flex-col items-center md:flex-row">
              <div
                className="rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:bg-green-50 focus:ring-green-800"
                onClick={() => router.push("/dashboard?SHAREDSTATUS=all")}
              >
                <div
                  className={classNames(
                    sharedStatus == SharedStatus.all
                      ? "text-green-700 bg-green-100"
                      : "hover:text-green-700 text-gray-500 hover:bg-green-100 ",
                    "px-8 py-2  rounded-full"
                  )}
                >
                  <p>Tous</p>
                </div>
              </div>
              <div
                className="ml-4 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:bg-green-50 focus:ring-green-800 sm:ml-5"
                onClick={() =>
                  router.push("/dashboard?SHAREDSTATUS=sharedWithMe")
                }
              >
                <div
                  className={classNames(
                    sharedStatus == SharedStatus.sharedWithMe
                      ? "text-green-700 bg-green-100"
                      : "hover:text-green-700 text-gray-500 hover:bg-green-100 ",
                    "px-8 py-2  rounded-full"
                  )}
                >
                  <p>Partagé avec moi</p>
                </div>
              </div>
              <div
                className="ml-4 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:bg-green-50 focus:ring-green-800 sm:ml-5"
                onClick={() => router.push("/dashboard?SHAREDSTATUS=iShared")}
              >
                <div
                  className={classNames(
                    sharedStatus == SharedStatus.iShared
                      ? "text-green-700 bg-green-100"
                      : "hover:text-green-700 hover:bg-green-100 text-gray-500",
                    "px-8 py-2  rounded-full"
                  )}
                >
                  <p>Ce que j{"'"}ai partagé</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push("/shared/new")}
              className="inline-flex items-start justify-start px-6 py-3 mt-4 bg-green-700 rounded focus:ring-2 focus:ring-offset-2 focus:ring-green-600 sm:mt-0 hover:bg-green-600 focus:outline-none"
            >
              <p className="text-sm font-medium leading-none text-white">
                Partager un fichier
              </p>
            </button>
          </div>
          <div className="overflow-x-auto mt-7">
            <div className="w-full">
              {files?.map((file: any) => (
                <Accordion
                  key={file?.id}
                  description={file?.description}
                  users={file?.users}
                  title={file?.title}
                  url={file?.url}
                  id={file?.id}
                  name={file?.name}
                />
              ))}
            </div>

            <div className="w-full mt-3">
              {totals && (
                <TableFooter
                  totals={totals}
                  onChangePage={setSkip}
                  currentPage={1}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSharedFile;

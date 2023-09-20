import React, { useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { UserContext } from "./UserContext";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const UserLayout = ({ children }: any) => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const additionnalStyle = {
    isDashboard: router.route === "/dashboard",
    isProfile: router.route === "/dashboard/profile",
    isShared: router.route === "/shared/new",
    isUsers: router.route === "/users",
    isNewArticle: router.route === "/admin/articles/new",
  };
  return (
    <div>
      <Head>
        <title>Mooriben Niger</title>
        <meta name="description" content="Mooriben Niamey Niger" />
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/mooribenniger.appspot.com/o/LOGO-JPEG.jpg?alt=media&token=b73aabbf-9911-4f27-8bf5-a0dcf06a7db6"
        />
      </Head>

      <div className="flex items-center justify-center w-full ">
        <div className="relative hidden w-full max-w-xs md:flex ">
          <div className="fixed top-0 left-0">
            <nav className="flex flex-col w-64 h-screen px-4 bg-green-900 border border-green-900 tex-gray-900">
              <div className="mt-8 ">
                <div className="">
                  <img
                    src={user?.image}
                    className="w-20 h-20 mx-auto rounded-full"
                  />
                </div>
                <div className="mx-auto text-center">
                  <span className="font-semibold text-white">{user?.name}</span>
                </div>
              </div>
              <div className="mt-10 mb-4">
                <ul className="ml-4">
                  <li
                    className={classNames(
                      "flex cursor-pointer flex-row px-4 py-4 mb-2 text-gray-100 border-gray-300 rounded rounded-lg hover:text-black hover:bg-gray-300 hover:font-bold",
                      additionnalStyle.isDashboard
                        ? "text-black bg-gray-300 font-bold"
                        : ""
                    )}
                    onClick={() => router.push("/dashboard?SHAREDSTATUS=all")}
                  >
                    <span>
                      <svg
                        className="w-5 h-5 fill-current "
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6
                        4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6
                        4h4v-4h-4M4 8h4V4H4v4z"
                        ></path>
                      </svg>
                    </span>
                    <a href="#">
                      <span className="ml-2">Tableau de bord</span>
                    </a>
                  </li>
                  <li
                    className={classNames(
                      "flex cursor-pointer flex-row px-4 py-4 mb-2 text-gray-100 border-gray-300 rounded rounded-lg hover:text-black hover:bg-gray-300 hover:font-bold",
                      additionnalStyle.isProfile
                        ? "text-black bg-gray-300 font-bold"
                        : ""
                    )}
                    onClick={() => router.push("/dashboard/profile")}
                  >
                    <span>
                      <svg
                        className="w-5 h-5 fill-current "
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                          fill="currentColor"
                        />
                        <path
                          d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <a href="#">
                      <span className="ml-2">Profil</span>
                    </a>
                  </li>
                  <li
                    className={classNames(
                      "flex cursor-pointer flex-row px-4 py-4 mb-2 text-gray-100 border-gray-300 rounded rounded-lg hover:text-black hover:bg-gray-300 hover:font-bold",
                      additionnalStyle.isShared
                        ? "text-black bg-gray-300 font-bold"
                        : ""
                    )}
                    onClick={() => router.push("/shared/new")}
                  >
                    <span>
                      <svg
                        className="w-5 h-5 fill-current "
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2
                        2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0
                        00-2-2h-1V1m-1 11h-5v5h5v-5z"
                        ></path>
                      </svg>
                    </span>
                    <a href="#">
                      <span className="ml-2">Partager</span>
                    </a>
                  </li>
                  <li
                    className={classNames(
                      "flex cursor-pointer flex-row px-4 py-4 mb-2 text-gray-100 border-gray-300 rounded rounded-lg hover:text-black hover:bg-gray-300 hover:font-bold",
                      additionnalStyle.isNewArticle
                        ? "text-black bg-gray-300 font-bold"
                        : ""
                    )}
                    onClick={() => router.push("/admin/articles/new")}
                  >
                    <span>
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path
                          d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0
                        014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4
                        8-4z"
                        ></path>
                      </svg>
                    </span>
                    <a href="#">
                      <span className="ml-2">nouveau article</span>
                    </a>
                  </li>
                  <li
                    onClick={() => router.push("/")}
                    className="flex flex-row px-4 py-4 mb-2 text-gray-100 border-gray-300 rounded rounded-lg cursor-pointer hover:text-black hover:bg-gray-300 hover:font-bold"
                  >
                    <span>
                      <svg
                        className="w-5 h-5 fill-current "
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 13H7v5h5v2H5V10h2v1h5v2M8
                        4v2H4V4h4m2-2H2v6h8V2m10 9v2h-4v-2h4m2-2h-8v6h8V9m-2
                        9v2h-4v-2h4m2-2h-8v6h8v-6z"
                        ></path>
                      </svg>
                    </span>
                    <a href="#">
                      <span className="ml-2">Accueil</span>
                    </a>
                  </li>
                  <li
                    onClick={() => router.push("/")}
                    className="flex flex-row px-4 py-4 mt-10 mb-2 text-red-100 border border-red-300 rounded rounded-lg cursor-pointer hover:text-black hover:bg-red-300 hover:font-bold"
                  >
                    <span>
                      <svg
                        className="w-5 h-5 fill-current "
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7 3C8.86384 3 10.4299 4.27477 10.874 6H19V8H10.874C10.4299 9.72523 8.86384 11 7 11C4.79086 11 3 9.20914 3 7C3 4.79086 4.79086 3 7 3ZM7 9C8.10457 9 9 8.10457 9 7C9 5.89543 8.10457 5 7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9Z"
                          fill="currentColor"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17 20C15.1362 20 13.5701 18.7252 13.126 17H5V15H13.126C13.5701 13.2748 15.1362 12 17 12C19.2091 12 21 13.7909 21 16C21 18.2091 19.2091 20 17 20ZM17 18C18.1046 18 19 17.1046 19 16C19 14.8954 18.1046 14 17 14C15.8954 14 15 14.8954 15 16C15 17.1046 15.8954 18 17 18Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <div
                      onClick={() => {
                        localStorage.removeItem("access_token");
                        setUser(undefined);
                        router.push("/");
                      }}
                    >
                      <span className="ml-2">Déconnecter</span>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div className="flex-col items-center  justify-center w-full max-w-screen-lg ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;

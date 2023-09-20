import "../styles/globals.css";
import type { AppProps } from "next/app";
import "use-slider/lib/slider.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "../components/UserContext";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import axios from "axios";
import { url_api } from "../constant";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const getUser = async () => {
    const token: any = localStorage.getItem("access_token");

    axios({
      method: "get",
      url: url_api + "/users/me",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data?.role != "SUDO" && res.data?.role != "ADMIN") {
          toast.info("Vous n'avez pas suffisament de droit");
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
      });
  };
  const validToken = async () => {
    const adminAccess = ["/admin/articles/new"];
    const authAccess = [
      "/dashboard",
      "/dashboard/",
      "/dashboard/profile",
      "/dashboard/profile/",
      "/shared/new",
      "/shared/new/",
    ];
    if (authAccess.includes(router.pathname)) {
      const token: any = localStorage.getItem("access_token");
      if (!token) {
        toast.info("Veiller vous connecter");
        router.push("/auth/login");
        localStorage.clear();
        return;
      }
      const decoded: any = jwt_decode(token);
      if (Date.now() > decoded?.exp * 1000) {
        toast.info("Votre session est expiré");
        router.push("/auth/login");
        localStorage.clear();
        return;
      }
    }

    if (adminAccess.includes(router.pathname)) {
      getUser();
    }
  };

  useEffect(() => {
    validToken();
  }, [router?.pathname]);

  return (
    <div>
      <ToastContainer />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </div>
  );
}

export default MyApp;

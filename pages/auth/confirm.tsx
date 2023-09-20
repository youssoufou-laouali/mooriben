import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { url_api } from "../../constant";

const ConfirmAccount = () => {
  const router = useRouter();
  const { token } = router.query;

  const confirmEmail = () => {
    axios
      .post(url_api + `/auth/confirm?token=${token}`)
      .then((res) => {
        toast.success(res.data?.message);
        localStorage.setItem("access_token", res.data?.access_token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data?.access_token}`;
        toast.success("Bienvenue");
        router.push("/dashboard");
      })
      .catch((err) => {
        toast.error(err?.message);
        router.push("/");
      });
  };

  useEffect(() => {
    if (token) confirmEmail();
  }, [token]);

  return (
    <div
      className="flex items-center justify-center w-screen h-screen"
      style={{
        backgroundColor: "rgba(2,200,5,0.1)",
      }}
    >
      <div className="relative ">
        <div className="absolute w-24 h-24 border-4 border-gray-200 border-dashed rounded-full"></div>

        <div className="absolute w-24 h-24 border-4 border-green-500 border-dashed rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
};

export default ConfirmAccount;

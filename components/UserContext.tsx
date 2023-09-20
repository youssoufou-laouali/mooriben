import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { url_api } from "../constant";

export const UserContext = createContext<{
  user: any;
  setUser: any;
  isLoading: boolean;
  setIsLoading: any;
}>({
  user: undefined,
  setUser: undefined,
  isLoading: false,
  setIsLoading: undefined,
});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
        setUser(res.data);
      })
      .catch((err) => {
        localStorage.setItem("access_token", "");
        setUser(undefined);
      });
  };
  useEffect(() => {
    // setUser(JSON.parse(data));
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

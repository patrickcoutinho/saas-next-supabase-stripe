import { NextPage } from "next";
import { useEffect } from "react";
import { useUser } from "../context/users";

const Logout: NextPage = () => {
  const { logout } = useUser();

  useEffect(() => {
    logout();
  }, []);

  return <></>;
};

export default Logout;

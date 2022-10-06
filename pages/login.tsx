import { NextPage } from "next";
import { useEffect } from "react";
import { useUser } from "../context/users";

const Login: NextPage = () => {
  const { login } = useUser();

  useEffect(() => {
    login();
  }, []);

  return <></>;
};

export default Login;

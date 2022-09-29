import { NextPage } from "next";
import { useEffect } from "react";
import { supabase } from "../services/supabase";

const Login: NextPage = () => {
  useEffect(() => {
    supabase.auth.signIn({ provider: "github" });
  }, []);

  return <></>;
};

export default Login;

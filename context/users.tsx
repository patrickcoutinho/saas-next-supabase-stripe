import { supabase } from "../services/supabase";
import { useRouter } from "next/router";
import {
  createContext,
  ProviderProps,
  useContext,
  useEffect,
  useState,
} from "react";

const Context = createContext<any>(null);

const Provider = ({ children }: ProviderProps<any>) => {
  const [user, setUser] = useState(supabase.auth.user());
  const router = useRouter();

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();

      if (sessionUser) {
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("id", sessionUser.id)
          .single();

        setUser({ ...sessionUser, ...profile });
      }
    };

    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, []);

  const login = async () => {
    await supabase.auth.signIn({ provider: "github" });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);

    router.push("/");
  };

  const exposed = { user, login, logout };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;

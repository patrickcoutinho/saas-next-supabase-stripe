import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserProvider from "../context/users";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider value={undefined}>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;

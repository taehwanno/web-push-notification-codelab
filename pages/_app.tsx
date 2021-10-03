import { Global, css } from "@emotion/react";
import type { AppProps } from "next/app";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js");
    }
  }, []);

  return (
    <>
      <Global
        styles={css({
          "html, body": {
            padding: 0,
            margin: 0,
            fontFamily:
              "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
          },
          a: {
            color: "inherit",
            textDecoration: "none",
          },
          "*": {
            boxSizing: "border-box",
          },
        })}
      />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;

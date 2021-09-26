import { Global, css } from "@emotion/react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
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

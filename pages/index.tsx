import { css } from "@emotion/css";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div
      className={css({
        minHeight: "100vh",
        padding: "0 0.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      })}
    >
      <Head>
        <title>PWA Notification Codelab</title>
        <meta
          name="description"
          content="PWA Notification Codelab for GDG DevFest Korea"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={css({
          padding: "5rem 0",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <h1
          className={css({
            margin: 0,
            lineHeight: 1.15,
            fontSize: "4rem",
            textAlign: "center",
          })}
        >
          <span
            className={css({
              cursor: "pointer",
              "&:hover, &:focus, &:active": {
                textDecoration: "underline",
              },
            })}
          >
            Subscribe to{" "}
            <span
              className={css({
                color: "#0070f3",
              })}
            >
              Notification!
            </span>
          </span>
        </h1>
      </main>
    </div>
  );
};

export default Home;

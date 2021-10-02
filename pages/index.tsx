import { css } from "@emotion/css";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const appServerPublicKey =
  "BDfCrAA1tNlsi7P0IVbfKqrgCQgb2iTNEEcCaVUkQ-U81_v_EHMGdUq8FJ79ZmXCXCABbF3ERMIrJFveQKsjzLg";

const Home: NextPage = () => {
  const [isPushSupported, setPushSupported] = useState(true);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  useEffect(() => {
    (async () => {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        const registration = await navigator.serviceWorker.register("sw.js");
        setRegistration(registration);
        const subscription = await registration.pushManager.getSubscription();
        setSubscription(subscription);
      } else {
        setPushSupported(false);
      }
    })();
  }, []);

  const handleButtonClick = () => {
    if (subscription) {
      unsubscribePushNotification();
    } else {
      subscribePushNotification();
    }
  };

  const subscribePushNotification = async () => {
    const appServerKey = urlBase64ToUint8Array(appServerPublicKey);
    if (registration) {
      try {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: appServerKey,
        });
        console.log("User is subscribed.");
        updateSubscriptionOnServer(subscription);
        setSubscription(subscription);
      } catch (error) {
        console.error("Failed to subscribe the user: ", error);
      }
    }
  };

  const unsubscribePushNotification = async () => {
    if (registration) {
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        try {
          subscription.unsubscribe();
        } catch (error) {
          console.log("Error unsubscribing", error);
        } finally {
          updateSubscriptionOnServer(null);
          console.log("User is unsubscribed.");
        }
      }
    }
  };

  const updateSubscriptionOnServer = (
    subscription: PushSubscription | null
  ) => {
    // TODO: Send subscription to application server
    setSubscription(subscription);
  };

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
        {isPushSupported ? (
          <button
            className={css({
              border: 0,
              background: "none",
              lineHeight: 1.15,
              fontSize: "64px",
              fontWeight: "bold",
              textAlign: "center",
              cursor: "pointer",
              "&:hover, &:focus, &:active": {
                textDecoration: "underline",
              },
            })}
            onClick={handleButtonClick}
          >
            {subscription ? "Unsubscribe" : "Subscribe"} to{" "}
            <span
              className={css({
                color: "#0070f3",
              })}
            >
              Push Notification!
            </span>
          </button>
        ) : (
          "Push not supported 😥"
        )}
        {subscription && (
          <p
            className={css({
              maxWidth: "760px",
              padding: "8px",
              marginTop: "32px",
              textAlign: "center",
              wordBreak: "break-all",
            })}
          >
            {JSON.stringify(subscription, null, 2)}
          </p>
        )}
      </main>
    </div>
  );
};

export default Home;

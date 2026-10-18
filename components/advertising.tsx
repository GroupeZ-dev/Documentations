"use client";

import Script from "next/script";

export function Advertising() {
  if (process.env.NEXT_PUBLIC_ENABLE_ADS !== "true") return null;
  return (
    <Script
      src="https://s.nitropay.com/ads-2396.js"
      data-cfasync="false"
      strategy="afterInteractive"
      onLoad={() => {
        const ads = (
          window as unknown as {
            nitroAds?: { createAd: (id: string, options: object) => void };
          }
        ).nitroAds;
        ads?.createAd("anchor", {
          format: "anchor-v2",
          anchor: "bottom",
          anchorBgColor: "rgb(0 0 0 / 80%)",
          anchorClose: true,
          anchorPersistClose: false,
          anchorStickyOffset: 0,
          mediaQuery: "(min-width: 0px)",
          report: {
            enabled: true,
            icon: true,
            wording: "Report Ad",
            position: "top-right",
          },
        });
      }}
    />
  );
}

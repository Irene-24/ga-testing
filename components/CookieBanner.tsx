"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import CursiveHeading from "@/components/ui/cursiveheading";

const enum Status {
  pending = "pending",
  resolved = "resolved",
  idle = "idle",
  rejected = "rejected",
}

declare global {
  interface Window {
    gtag?: Gtag.Gtag;
  }
}

const CookieBanner = () => {
  const [status, setStatus] = useState(Status.idle); // Track the status (idle, pending, resolved)

  const handleCookies = (value: "accepted" | "denied") => () => {
    localStorage.setItem("cookies", value);
    setStatus(value === "accepted" ? Status.resolved : Status.rejected);
    toast.dismiss();
  };

  useEffect(() => {
    const cookiesConsent = localStorage.getItem("cookies");

    if (cookiesConsent === "accepted") {
      setStatus(Status.resolved); // If user has accepted cookies, mark it as resolved

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("consent", "update", {
          ad_user_data: "granted",
          ad_personalization: "granted",
          ad_storage: "granted",
          analytics_storage: "granted",
        });
      }
    } else if (cookiesConsent === "denied") {
      setStatus(Status.rejected);
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("consent", "update", {
          ad_user_data: "denied",
          ad_personalization: "denied",
          ad_storage: "denied",
          analytics_storage: "denied",
        });
      }
    } else {
      setStatus(Status.pending); // Else, show the banner to accept cookies
    }
  }, []);

  useEffect(() => {
    if (status === Status.pending) {
      toast.custom(
        () => (
          <section className="bg-c1-850 px-[4%] pb-5 rounded-xl max-w-[570px] font-sans shadow-[0px_4px_8px_rgba(57,43,88,0.1)]">
            <header className="end gap-2 my-3">
              <CursiveHeading className="text-xl z-10 translate-x-[25%]">
                Cookies?
              </CursiveHeading>
            </header>

            <h1 className=" text-lg font-black ">OUR COOKIE POLICY</h1>

            <p className="text-xs">
              By clicking “I accept” you agree to the storing of cookies on your
              device to enhance site navigation, analyze site usage, and assist
              in our marketing efforts.
            </p>

            <div className="btwn gap-5 mt-4 text-xs">
              <button
                onClick={handleCookies("accepted")}
                className=" px-3 h-8 min-w-[30%] text-white bg-primary rounded-full"
              >
                I Accept
              </button>
              <button
                onClick={handleCookies("denied")}
                className=" px-3 h-8 min-w-[30%] text-primary border border-primary  rounded-full"
              >
                Cancel
              </button>
            </div>
          </section>
        ),
        {
          duration: Infinity,
          position: "bottom-right",
        }
      );
    }
  }, [status]);

  return <></>;
};

export default CookieBanner;

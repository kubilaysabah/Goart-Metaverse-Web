/* eslint-disable react-hooks/exhaustive-deps */
// Next
import { useTranslation } from "next-i18next";

// React
import type { FC, ReactElement } from "react";
import { memo, useState, useEffect, useRef } from "react";

// Interface
import ICountdown from "./index.d";

// Helpers
import { Timer, toDateTime } from "helpers";

// Tailwind CSS
const defaultTheme: any = require("tailwindcss/defaultTheme");

const Countdown: FC<ICountdown> = ({
  campaigns,
  session
}: ICountdown): ReactElement<ICountdown> => {
  const { t } = useTranslation();
  const interval = useRef<any>();
  const [countdown, setCountdown] = useState<ITimer>();
  const [mobile, setScreen] = useState<boolean>(false);

  const animateScroll = (): void => {
    const scrollElement = document.getElementById(session?.token ? "converter" : "campaigns");

    if (scrollElement) {
      scrollElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  };

  useEffect(() => {
    const checkScreen = (): void => {
      setScreen(window.matchMedia(`(max-width: ${defaultTheme.screens.lg})`).matches)
    };

    window.addEventListener("load", checkScreen)
    window.addEventListener("resize", checkScreen)

    return () => {
      window.removeEventListener("load", checkScreen)
      window.removeEventListener("resize", checkScreen)
    }
  }, []);

  useEffect(() => {
    if (campaigns && campaigns.data.length > 0) {
      interval.current = setInterval(() => {
        setCountdown(Timer(toDateTime(campaigns.data[0].endDate._seconds)))
      }, 1000);
    }

    if (countdown && countdown.distance < 0) {
      clearInterval(interval.current);
    }

    return () => clearInterval(interval.current);
  }, [campaigns]);

  return (
    <section
      className={`text-white border-t border-purple-600 px-6 pt-3 pb-[22px] relative shadow-lg bg-primary-gradient xl:pt-12 xl:pb-6`}>
      <div className="container mx-auto">
        {campaigns && campaigns.data.length > 0 && (
          <h3 className="xl:text-center font-nexa text-xs mb-3 xl:text-[46px] xl:mb-[72px] xl:font-black">{campaigns.data[0].campaignName.toUpperCase()}</h3>
        )}
        {countdown && (
          <nav className="text-center">
            <ul className="flex flex-wrap items-center justify-center">
              <li className="flex-1 mr-4 xl:mr-8 ">
                <div
                  className="flex items-center justify-center backdrop-blur-md rounded-xl bg-countdown-time h-[63px] xl:h-[230px] xl:mb-3">
                  <div className="font-nexa font-bold text-xl lg:text-9xl mb-2">{countdown.days}</div>
                </div>
                <small className="text-xs xl:text-2xl">{t("campaign:days")}</small>
              </li>
              <li className="flex-1 mr-4 xl:mr-8 ">
                <div
                  className="flex items-center justify-center backdrop-blur-md rounded-xl bg-countdown-time h-[63px] xl:h-[230px] xl:mb-3">
                  <div className="font-nexa font-bold text-xl lg:text-9xl mb-2">{countdown.hours}</div>
                </div>
                <small className="text-xs xl:text-2xl">{t("campaign:hours")}</small>
              </li>
              <li className="flex-1 mr-4 xl:mr-8 ">
                <div
                  className="flex items-center justify-center backdrop-blur-md rounded-xl bg-countdown-time h-[63px] xl:h-[230px] xl:mb-3">
                  <div className="font-nexa font-bold text-xl lg:text-9xl mb-2">{countdown.minutes}</div>
                </div>
                <small className="text-xs xl:text-2xl">{t("campaign:minutes")}</small>
              </li>
              <li className="flex-1">
                <div
                  className="flex items-center justify-center backdrop-blur-md rounded-xl bg-countdown-time h-[63px] xl:h-[230px] xl:mb-3">
                  <div className="font-nexa font-bold text-xl lg:text-9xl mb-2">{countdown.seconds}</div>
                </div>
                <small className="text-xs xl:text-2xl">{t("campaign:seconds")}</small>
              </li>
            </ul>
          </nav>
        )}
      </div>
      {!mobile && !session?.token && (
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-6 h-12 rounded-full border border-white cursor-pointer"
          onClick={animateScroll}>
          <div className="animate-scroll w-2.5 h-2.5 bg-white rounded-full left-1/2 -translate-x-1/2 absolute" />
        </div>
      )}
    </section>
  )
};

export default memo(Countdown);

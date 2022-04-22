/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
// Next
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { removeCookies } from 'cookies-next';

// React
import type { FC, ReactElement } from "react";
import { memo, Fragment, useState, useEffect } from "react";

// Interface
import IHeader from "./index.d";

// Firebase
import { signOut } from "firebase/auth";
import { FirebaseAuth } from "helpers";

// Helpers
import { Routes } from "helpers";

// Tailwind CSS
const defaultTheme: any = require("tailwindcss/defaultTheme");

const Header: FC<IHeader> = ({
  session,
  profile
}: IHeader): ReactElement<IHeader> => {
  const { t } = useTranslation();
  const { push, locales, route, pathname, query, asPath } = useRouter();
  const [mobile, setScreen] = useState<boolean>(false);

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

  const SignOut = async (): Promise<void> => {
    try {
      await signOut(FirebaseAuth);
      removeCookies("session");
      push(Routes.SignIn);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header
      className={`px-5 lg:px-0 bg-primary-gradient`}>
      <div className="container mx-auto">
        <div className="flex items-center flex-wrap justify-between py-5">
          <div>
            <Link href={Routes.Home} passHref>
              <a className="block relative">
                <img src={mobile ? "/mobile-logo.svg" : "/logo.svg"} height={mobile ? 32 : 42} width={mobile ? 43 : 157} alt="GoArt Metaverse" />
              </a>
            </Link>
          </div>
          <div className="xl:flex-1 xl:ml-56">
            <nav className="font-inter">
              <ul className="flex flex-wrap items-center justify-center lg:justify-start">
                <li key="campaign" className="lg:mr-10">
                  <Link href={Routes.Home} passHref>
                    <a className={`block py-2 px-3 text-xs lg:text-base rounded-md text-white ${route === Routes.Home ? "bg-purple-700" : `hover:bg-purple-700`}`}>
                      {t("common:navigation:campaign")}
                    </a>
                  </Link>
                </li>
                <li key="leaderboard" className="lg:mr-10">
                  <Link href={Routes.LeaderBoard} passHref>
                    <a className={`block py-2 px-3 text-xs lg:text-base rounded-md text-white ${route === Routes.LeaderBoard ? "bg-purple-700" : `hover:bg-purple-700`}`}>
                      {t("common:navigation:leaderboard")}
                    </a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <div className="flex items-center flex-wrap">
              <div className="mr-8">
                {session?.token ? (
                  <div className="flex items-center">
                    {profile && (
                      <div>
                        <Link href={Routes.Profile} passHref>
                          <a className="block text-white py-2.5 px-4 shadow-sm rounded font-medium">
                            {profile.username}
                          </a>
                        </Link>
                      </div>
                    )}
                    <div>
                      <button className="block text-white py-2.5 px-4 shadow-sm rounded font-medium" onClick={SignOut}>
                        {t("common:sign-out")}
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link href={Routes.SignIn} passHref>
                    <a className="block bg-white text-purple-600 py-2.5 px-4 shadow-sm rounded font-medium">{t("common:sign-in")}</a>
                  </Link>
                )}
              </div>
              <div>
                <ul className="flex items-center text-white">
                  {locales?.map((locale, index) => {
                    return (
                      <Fragment key={locale}>
                        <li>
                          <Link href={{ pathname, query }} as={asPath} locale={locale} passHref>
                            <a>{locale.toUpperCase()}</a>
                          </Link>
                        </li>
                        {index !== locales.length - 1 && (
                          <li className="px-4">|</li>
                        )}
                      </Fragment>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};


export default memo(Header);

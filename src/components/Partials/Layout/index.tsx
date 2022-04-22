// Next
import Link from "next/link";
import { useTranslation } from "next-i18next";

// React
import type { FC, ReactElement } from "react";
import {memo, Fragment } from "react";

// Interface
import LayoutProps from "./index.d";

// Helpers
import { Routes } from "helpers";

// Components
import { Header, Footer } from "components";

// Icons
import { AiOutlineArrowLeft } from "react-icons/ai";

const Layout: FC<LayoutProps> = ({
    WithoutPartials = false,
    width = "",
    children,
    session,
    profile
}: LayoutProps): ReactElement<LayoutProps> => {
    const { t } = useTranslation();

    return (
        <Fragment>
            {!WithoutPartials && <Header session={session} profile={profile} />}

            {WithoutPartials ? (
                <div className="container mx-auto">
                    <div className={`${WithoutPartials ? "h-screen" : ""} flex flex-col`}>
                        <div className="xl:mt-20">
                            <Link href={Routes.Home} passHref>
                                <a className="block text-gray-600 flex items-center hover:text-purple-600 transition duration-150 ease-out hover:ease-in">
                                    <AiOutlineArrowLeft />
                                    <span className="ml-4">{t("common:back_link")}</span>
                                </a>
                            </Link>
                        </div>
                        <div className="flex-1">
                            {width ? (
                                <div className="h-full flex items-center justify-center">
                                    <div className={width}>
                                        {children}
                                    </div>
                                </div>
                            ) : (
                                <div className="xl:mt-36">
                                    {children}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <main>
                    {children}
                </main>
            )}

            {!WithoutPartials && <Footer />}
        </Fragment>
    )
};

export default memo(Layout);

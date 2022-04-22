// Next
import { useTranslation } from "next-i18next";
import Link from "next/link";

// React
import type { FC, ReactElement } from "react";
import { memo } from "react";

// Interface
import ErrorProps from "./index.d";

// Helpers
import { Routes } from "helpers";

// Components
import { Socials } from "components";

const Error: FC<ErrorProps> = ({
    title,
    description,
    image
}: ErrorProps): ReactElement<ErrorProps> => {
    const { t } = useTranslation();

    return (
        <div className="h-screen grid grid-rows-layout">
            <div>
                <div className="text-center h-full flex justify-center items-center">
                    <div className="xl:w-[1015px]">
                        <div className="flex justify-center">
                            <object data={image} type="image/svg+xml"></object>
                        </div>
                        <h1 className="text-3xl font-semibold leading-9 text-black mt-[66px]">{title}</h1>
                        <p className="text-xl leading-7 mt-[24px]">{description}</p>
                        <Link href={Routes.Home} passHref>
                            <a className="bg-gradient-to-r from-purple-500 to-purple-400 text-white px-[42.5px] py-[15px] inline-block mt-[48px] shadow-md rounded-[4px]">{t("404:back_to_home")}</a>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <div className="container mx-auto mb-[34px]">
                    <div className="flex items-center flex-wrap">
                        <div className="flex-1">
                            <p className="text-gray-800">{t("common:copyright")}</p>
                        </div>
                        <div>
                            <Socials colors="text-gray-500 hover:text-gray-700" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default memo(Error);
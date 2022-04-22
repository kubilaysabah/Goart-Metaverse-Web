// Next
import { useTranslation } from "next-i18next";

// React
import type { FC, ReactElement } from "react";
import { memo } from "react";

// Components
import { Socials } from "components";

const Footer: FC = (): ReactElement => {
    const { t } = useTranslation();

    return (
        <footer className="bg-gray-800 py-12 mt-32 font-inter">
            <div className="container mx-auto">
                <Socials />
                <p className="text-gray-200 text-center mt-9">{t("common:copyright")}</p>
            </div>
        </footer>
    );
};


export default memo(Footer);
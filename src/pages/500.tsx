// Next
import type { NextPage, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

// React
import type { ReactElement } from "react";
import { memo } from "react";

// Components
import { Error } from "components";

const ServerError: NextPage = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <Error title={t("500:title")} description={t("500:description")} image="/500.svg" />
  );
};


export default memo(ServerError);

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, defaultLocale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ? locale : defaultLocale ? defaultLocale : "tr", ["common", "500"])),
    }
  }
}
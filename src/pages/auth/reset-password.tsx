// Next
import type { NextPage, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

// React
import type { ReactElement, FormEvent } from "react";
import { memo } from "react";

// Helpers
import { Classes, FirebaseAuth } from "helpers";

// Components
import { Layout } from "components";

// Firebase
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";

const ResetPassword: NextPage = (): ReactElement => {
  const { t } = useTranslation();

  const submitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    // Localize the UI to the selected language as determined by the lang
    // Verify the password reset code is valid.
    
    const actionCode = "";
    const newPassword = "";

    try {
      const email = await verifyPasswordResetCode(FirebaseAuth, actionCode);

      try {
        const response = await confirmPasswordReset(FirebaseAuth, actionCode, newPassword);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout width="w-full lg:w-1/4 xl:w-1/3" WithoutPartials>
      <form onSubmit={submitHandler} className="font-inter">
        <div className="flex justify-center">
          <object data="/amblem.svg" type="image/svg+xml" />
        </div>
        <div className="text-center mb-6">
          <h1 className="font-extrabold text-center my-6 xl:text-3xl">{t("reset-password:title")}</h1>
          <p className="text-sm text-gray-500 leading-5 font-medium">{t("reset-password:description")}</p>
        </div>
        <div className="bg-white px-10 py-8 shadow rounded-lg">
          <div className="mb-9">
            <label htmlFor="new_password" className="block mb-2 text-sm text-gray-700">{t("reset-password:new_password")}</label>
            <input type="password" className={Classes.Input} name="new_password" placeholder={t("reset-password:placeholder")} required />
          </div>
          <div className="mb-9">
            <label htmlFor="confirm_new_password" className="block mb-2 text-sm text-gray-700">{t("reset-password:confirm_new_password")}</label>
            <input type="password" name="confirm_new_password" className={Classes.Input} placeholder={t("reset-password:placeholder")} required />
          </div>
          <button type="submit" className={`${Classes.button.primary} w-full mt-9 py-[9px]`}>{t("reset-password:confirm")}</button>
        </div>
      </form>
    </Layout>
  );
};


export default memo(ResetPassword);

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, defaultLocale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ? locale : defaultLocale ? defaultLocale : "tr", ["common", "reset-password"])),
    }
  }
}

// Next
import type { NextPage, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

// React
import type { ReactElement, FormEvent } from "react";
import { memo, useState } from "react";

// Helpers
import { Endpoints, Classes } from "helpers";

// Components
import { Layout } from "components";

const ForgotPassword: NextPage = (): ReactElement => {
  const { t } = useTranslation();
  const [state, setState] = useState<{
    email: string;
    error: boolean
  }>({
    error: false,
    email: ""
  });

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(Endpoints.API_URL + Endpoints.forgotPassword(state.email), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-server.js-form-urlencoded;charset=UTF-8"
        },
        body: JSON.stringify({
          email: state.email
        })
      })

      const data: IForgotPasswordAPI = await response.json();

      if (data.status) {
        setState({
          error: false,
          email: ""
        })
      } else {
        setState({
          ...state,
          error: true
        })
      }

      setTimeout(() => {
        setState({
          ...state,
          error: false
        })
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout width="w-full lg:w-1/4 xl:w-1/3" WithoutPartials>
      <form onSubmit={submitHandler} className="font-inter">
        <div className="flex justify-center">
          <object data="/amblem.svg" type="image/svg+xml" />
        </div>
        <div className="text-center mb-6">
          <h1 className="font-extrabold text-center my-6 xl:text-3xl">{t("forgot-password:title")}</h1>
          <p className="text-sm text-gray-500 leading-5 font-medium">{t("forgot-password:description")}</p>
        </div>
        <div className="bg-white px-10 py-8 shadow rounded-lg">
          <div className="mb-2">
            <label htmlFor="email" className="block mb-2 text-sm text-gray-700">{t("forgot-password:email_address")}</label>
            <input type="email" className={`focus:outline-none w-full border ${state.error === null ? "border-gray-300" : state.error ? "border-red-500 text-red-500" : "border-green-500 text-green-500"} rounded-md py-2.5 px-3`} required value={state.email} onChange={(event: FormEvent<HTMLInputElement>) => setState({
              ...state,
              email: event.currentTarget.value
            })} />
            <button type="submit" className={`${Classes.button.primary} w-full mt-9 py-[9px]`}>{t("forgot-password:send_email")}</button>
          </div>
          {state.error !== null && (
            <div className={`text-sm ${state.error ? "text-red-500" : "text-green-500"}`}>{state.error ? t("forgot-password:error_message") : t("forgot-password:success_message")}</div>
          )}
        </div>
      </form>
    </Layout>
  );
};

export default memo(ForgotPassword);

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, defaultLocale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ? locale : defaultLocale ? defaultLocale : "tr", ["common", "forgot-password"])),
    }
  }
}

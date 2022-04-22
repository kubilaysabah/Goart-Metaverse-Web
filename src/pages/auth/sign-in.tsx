// Next
import type { GetStaticPropsResult, NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { getCookie, setCookies } from "cookies-next";

// React
import type { FormEvent, ReactElement } from "react";
import { memo, useState } from "react";

// Helpers
import { FirebaseAuth, Routes, Classes } from "helpers";

// Firebase
import { signInWithEmailAndPassword, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

// JWT
import JWTDecode from "jwt-decode";

// Components
import { Layout } from "components";

// Icons
import { BsApple, BsFacebook, BsGoogle } from "react-icons/bs";

interface FormDataProps {
  email: string;
  password: string;
  remember_me: boolean;
}

const SignIn: NextPage = (): ReactElement => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormDataProps>({
    email: "",
    password: "",
    remember_me: false
  });

  const LoginHandler = async (userCredential: any): Promise<void> => {
    const user = await userCredential.user;
    const token = await user.getIdToken();
    const decodedToken: IToken = JWTDecode(token);

    setCookies("session", {
      token,
      username: decodedToken.name,
      expire: decodedToken.exp,
      email: decodedToken.email,
      verify: decodedToken.email_verified,
      id: decodedToken.user_id
    });

    const cookie = getCookie("session");

    if (typeof cookie === "string") {
      const session = JSON.parse(cookie);

      if (session.token) {
        push(Routes.Home);
      }
    }
  };

  const LoginWithPassword = async (): Promise<void> => {
    try {
      const userCredential = await signInWithEmailAndPassword(FirebaseAuth, formData.email, formData.password);
      LoginHandler(userCredential);
    } catch (error: any) {
      const { code, message } = error;
      setError(t(`sign-in:${code}`))
    }
  }

  const LoginOAuthHandler = async (Provider: any): Promise<void> => {
    try {
      const userCredential = await signInWithPopup(FirebaseAuth, Provider);
      LoginHandler(userCredential);
    } catch (error: any) {
      const { code, message } = error;
      setError(t(`sign-in:${code}`))
    }
  }

  return (
    <Layout WithoutPartials width="w-full lg:w-1/4 xl:w-1/3">
      <form onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        LoginWithPassword()
      }} className="font-inter">
        <div className="flex justify-center">
          <object data="/emblem.svg" type="image/svg+xml" />
        </div>
        <h1 className="font-extrabold text-center mt-6 xl:text-3xl">{t("sign-in:sign_in_to_your_account")}</h1>
        <div className="mt-8 px-10 py-8 rounded shadow bg-white">
          <div className="mb-6">
            <label htmlFor="email" className="text-sm text-gray-700 block mb-2">{t("sign-in:email_address")}</label>
            <input className={Classes.Input} type="email" name="email" value={formData.email}
              onChange={(event: FormEvent<HTMLInputElement>) => setFormData({
                ...formData,
                email: event.currentTarget.value
              })} required />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="text-sm text-gray-700 block mb-2">{t("sign-in:password")}</label>
            <input className={Classes.Input} type="password" name="password" required value={formData.password}
              onChange={(event: FormEvent<HTMLInputElement>) => setFormData({
                ...formData,
                password: event.currentTarget.value
              })} />
          </div>
          {error &&
            <div className="mb-6">
              <small className="text-sm text-red-500">{error}</small>
            </div>
          }
          <div className="flex items-center flex-wrap mb-6">
            <div className="flex-1">
              <div className="flex items-center">
                <input name="remember_me" type="checkbox" checked={formData.remember_me}
                  onChange={(event: FormEvent<HTMLInputElement>) => setFormData({
                    ...formData,
                    remember_me: event.currentTarget.checked
                  })} className={Classes.Checkbox} />
                <label htmlFor="remember_me" className="ml-2" onClick={() => setFormData({
                  ...formData,
                  remember_me: !formData.remember_me
                })}>{t("sign-in:remember_me")}</label>
              </div>
            </div>
            <div>
              <Link href={Routes.ForgotPassword} passHref>
                <a className="block text-purple-600 font-medium text-sm">
                  {t("sign-in:forgot_password")}
                </a>
              </Link>
            </div>
          </div>
          <div className="mb-6 relative">
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-gray-500 text-sm">{t("sign-in:or_continue_with")}</span>
            <hr />
          </div>
          <div className="flex flex-wrap items-center mb-6">
            <div className="flex-1 mr-3">
              <button className={`${Classes.button.secondary} w-full py-2.5`}
                onClick={() => LoginOAuthHandler(new FacebookAuthProvider())}>
                <div className="inline-block mx-auto">
                  <BsFacebook size={20} />
                </div>
              </button>
            </div>
            <div className="flex-1 mr-3">
              <button className={`${Classes.button.secondary} w-full py-2.5`}
                onClick={() => LoginOAuthHandler(new GoogleAuthProvider())}>
                <div className="inline-block mx-auto">
                  <BsGoogle size={20} />
                </div>
              </button>
            </div>
            <div className="flex-1">
              <button className={`${Classes.button.secondary} w-full py-2.5`}
                onClick={() => LoginOAuthHandler(new OAuthProvider('apple.com'))}>
                <div className="inline-block mx-auto">
                  <BsApple size={20} />
                </div>
              </button>
            </div>
          </div>
          <button className={`${Classes.button.primary} w-full py-[9px]`}>{t("sign-in:sign_in")}</button>
        </div>
      </form>
    </Layout>
  );
};

export default memo(SignIn);

export const getServerSideProps: GetServerSideProps = async (context): Promise<GetStaticPropsResult<{ [key: string]: any; }>> => {
  const { locale, defaultLocale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ? locale : defaultLocale ? defaultLocale : "tr", ["common", "sign-in"])),
      // Will be passed to the page component as props
    },
  };
}

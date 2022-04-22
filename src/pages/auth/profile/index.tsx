/* eslint-disable react-hooks/exhaustive-deps */
// Next
import type { NextPage, GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

// React
import type { ReactElement, FormEvent } from "react";
import { memo, useState, useEffect, Fragment } from "react";
// Helpers
import { Classes, getCampaigns, getQuestions, setWallet, getCities, setQuestions, getWallet } from "helpers";

// Components
import { Layout } from "components";

// Headless UI
import { Switch } from "@headlessui/react";

// Icons
import { AiOutlineInfoCircle } from "react-icons/ai";

const Profile: NextPage = (props: any): ReactElement => {
  const { t } = useTranslation();
  const { session, campaigns, questions, walletAPI }: { session: ISession, campaigns: ICampaignsAPI, questions: ISurveyAPI[], walletAPI: IWalletAPI } = props;

  const [state, setState] = useState<{
    wallet?: string;
    survey?: ISurvey,
    countries?: {
      name: string;
      code: string;
    }[];
    cities?: string[],
    term?: boolean
  }>({
    cities: [],
    countries: [],
    wallet: walletAPI.message.walletAddress || "",
    survey: {
      age: "",
      gender: "",
      marital: "",
      location: "",
      city: "",
      education: "",
      countryToLive: "",
      vocation: "",
      cityToVisit: "",
      food: "",
      shopping: "",
      shoppingWay: "",
      interest: [],
      crypto: "No",
      hearAboutUs: []
    }
  });

  useEffect(() => {
    (async (): Promise<void> => {
      if (session?.token) {
        setState({
          ...state,
          countries: questions.filter(item => item.key === "countryList")[0].answers
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const submitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const { wallet } = state;

    if (session?.token && wallet && campaigns) {
      const response = await setWallet(session, campaigns, wallet);
      console.log(response);
    }
  };

  const checkboxHandler = ({
    answer,
    key,
  }: {
    answer: string;
    key: string;
  }): void => {
    // @ts-ignore
    let list: string[] = survey[key] || [];

    if (list.indexOf(answer) > -1) {
      list = list.filter((item: any) => item !== answer);
    } else {
      list.push(answer);
    }

    setState({
      ...state,
      survey: {
        ...state.survey,
        [key]: list
      }
    });
  };

  const isChecked = (key: string, answer: string): boolean => {
    // @ts-ignore
    return state.survey[key] ? state.survey[key].filter(item => item === answer).length > 0 : false
  }

  const onChangeHandler = (event: FormEvent<HTMLSelectElement>, key: string): void => {
    if (key === "countryLocation") {
      (async () => {
        const cities = await getCities(session, event.currentTarget.value);

        if (cities) {
          setState({
            ...state,
            cities
          })
        }
      })();
    } else {
      setState({
        ...state,
        survey: {
          ...state.survey,
          [key]: event.currentTarget.value
        }
      })
    }
  }

  useEffect(() => {
    (async () => {
      const { countries } = state;

      if (countries && countries.length > 0) {
        const cities = await getCities(session, countries[0].code);
        if (cities) {
          setState({
            ...state,
            cities
          })
        }
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.countries]);

  const postQuestions = async (): Promise<void> => {
    if (session && state.survey) {
      await setQuestions(session, state.survey)
    }
  };

  return (
    <Layout WithoutPartials>
      <form onSubmit={submitHandler}>
        <div className="xl:w-[1216px]">
          <h1 className="text-gray-900 font-extrabold mb-6 xl:text-4xl">{t("profile:profile")}</h1>
          <div className="flex flex-wrap items-center">
            <div className="lg:w-[230px] lg:h-[230px] rounded-full bg-gray-400"></div>
            {session && (
              <div className="flex-1 ml-[39px]">
                <h3 className="text-4xl text-gray-500 font-extrabold">{session.username}</h3>
                <span className="text-gray-500 text-2xl font-medium mt-[8px]">{session.email}</span>
              </div>
            )}
          </div>
          <div className="py-5 border-b border-gray-200">
            <label htmlFor="wallet_address" className="text-lg font-bold text-purple-500 mt-2 block lg:w-[389px]">{t("profile:wallet_address")}</label>
            <div className="flex items-center mt-[26px]">
              <div>
                <AiOutlineInfoCircle size={18} />
              </div>
              <div className="flex-1 ml-[15px]">
                <small className="text-sm text-gray-500 block">{t("profile:wallet_message")}</small>
              </div>
            </div>
            <div className="mt-[14px] lg:w-[959px]">
              <div className="flex">
                <div className="flex-1">
                  <input type="text" className={Classes.Input} placeholder={t("profile:wallet_placeholder")} value={state.wallet} onChange={(event: FormEvent<HTMLInputElement>) => setState({
                    ...state,
                    wallet: event.currentTarget.value
                  })} />
                </div>
                <div className="ml-2 lg:ml-[24px]">
                  <button type="submit" className={`${Classes.button.primary} h-full w-[120px]`}>{t("profile:save")}</button>
                </div>
              </div>
            </div>
          </div>
          {!session?.marketingSurveyCompleted && (
            <Fragment>
              <hr />
              <article className="py-10">
                <h2 className="text-purple-500 font-medium text-lg mb-2">{t("profile:title")}</h2>
                <p className="text-gray-500">{t("profile:description")}</p>
              </article>
              {questions && questions.length > 0 && (
                questions.map(item => (
                  <Fragment key={item.key}>
                    {item.order !== 99 && (
                      <Fragment>
                        <div className={`${!item.multiple ? "flex items-center flex-wrap" : ""} py-5 border-b border-gray-200`} >
                          <label htmlFor={item.key} className={`text-sm font-medium text-gray-700 block ${!item.multiple ? "lg:w-[389px]" : ""}`}>
                            {item.key === "countryList" ? t("profile:country") : item.question}
                            {item.multiple && (
                              <span className="text-sm font-normal text-gray-300 ml-2">({t("profile:multiple_selection")})</span>
                            )}
                          </label>
                          <div className={!item.multiple ? "ml-6 lg:w-[320px]" : ""}>
                            {item.multiple ? (
                              <Fragment>
                                {item.answers.map(answer => (
                                  <div className="flex items-center flex-wrap my-2" key={answer}>
                                    <input type="checkbox" className={Classes.Checkbox} name={item.key} checked={isChecked(item.key, answer)} onChange={() => checkboxHandler({
                                      answer,
                                      key: item.key,
                                    })} />
                                    <label htmlFor={item.key} className="ml-3 text-gray-300 block cursor-pointer font-normal" onClick={() => checkboxHandler({
                                      answer,
                                      key: item.key,
                                    })}>
                                      {answer}
                                    </label>
                                  </div>
                                ))}
                              </Fragment>
                            ) : (
                              // @ts-ignore
                              <select name={item.key} className={Classes.Select} onChange={(event: FormEvent<HTMLSelectElement>) => onChangeHandler(event, item.key)} value={state.survey[item.key]}>
                                {item.key === "cityLocation" ? (
                                  <Fragment>
                                    {state.cities?.map(city => (
                                      <option value={city} key={city}>
                                        {city}
                                      </option>
                                    ))}
                                  </Fragment>
                                ) : (
                                  <Fragment>
                                    {item.key === "countryLocation" || item.key === "countryToLive" || item.key === "countryToSee" ? (
                                      <Fragment>
                                        {state.countries?.map(country => (
                                          <option value={country.code} key={country.code}>
                                            {country.name}
                                          </option>
                                        ))}
                                      </Fragment>
                                    ) : (
                                      <Fragment>
                                        {item.answers.map(answer => (
                                          typeof answer === "string" ? (
                                            <option value={answer} key={answer}>
                                              {answer}
                                            </option>
                                          ) : (
                                            <option value={answer.code} key={answer.code}>
                                              {answer.name}
                                            </option>
                                          )
                                        ))}
                                      </Fragment>
                                    )}
                                  </Fragment>
                                )}
                              </select>
                            )}
                          </div>
                        </div>
                      </Fragment>
                    )}
                  </Fragment>
                ))
              )}
              <div className="flex items-center flex-wrap text-purple-400 lg:mt-[41px] lg:mb-[34px]">
                <AiOutlineInfoCircle size={18} />
                <label className="block text-sm text-purple-400 lg:ml-[27px]">{t("profile:profile_message")}</label>
              </div>
              <div className="flex flex-wrap items-center">
                <div>
                  <Switch checked={state.term ? state.term : false} onChange={() => setState({
                    ...state,
                    term: !state.term
                  })} className={`${state.term ? 'bg-purple-900' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-[24px] w-[60px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}>
                    <span className="sr-only">Use setting</span>
                    <span aria-hidden="true" className={`${state.term ? 'translate-x-9' : 'translate-x-0'} pointer-events-none inline-block h-[20px] w-[20px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`} />
                  </Switch>
                </div>
                <div className="ml-2.5">
                  <small className="text-base text-gray-700">{t("profile:policy_1")}</small>
                  <a className="text-purple-400 ml-2 underline" onClick={() => console.log("policy")}>{t("profile:policy_2")}</a>
                </div>
              </div>
              <div className="mt-16 text-right">
                <button type="button" className={`${Classes.button.primary} w-[120px] py-[9px]`} onClick={postQuestions}>{t("profile:save")}</button>
              </div>
            </Fragment>
          )}
        </div>
      </form>
    </Layout>
  );
};


export default memo(Profile);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale, defaultLocale } = context;
  const { cookies } = context.req;
  const translations = (await serverSideTranslations(locale ? locale : defaultLocale ? defaultLocale : "tr", ["common", "campaign"]));

  if (typeof cookies.session === "string") {
    const session = JSON.parse(cookies.session);

    return {
      props: {
        ...translations,
        campaigns: await getCampaigns(),
        questions: await getQuestions(session, locale === "tr" ? "tr-TR" : "en-US"),
        walletAPI: await getWallet(session),
        session
      }
    };
  }

  return {
    props: {
      ...translations,
      campaigns: await getCampaigns(),
    }
  };
}

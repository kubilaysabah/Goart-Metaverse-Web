// Next
import type { NextPage, GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

// React
import type { ReactElement } from "react";
import { memo, Fragment, useState } from "react";

// Helpers
import {Classes, getCampaigns, getLeaderboard, getProfile} from "helpers";

// Components
import { Layout } from "components";

const LeaderBoard: NextPage = (props: any): ReactElement => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"daily" | "general">("general");
  const { session, profile, campaigns }: { session: ISession, profile: IProfileAPI, campaigns: ICampaignsAPI } = props;

  return (
    <Layout session={session} profile={profile}>
      <section className="font-inter">
        {campaigns && campaigns.data.length > 0 && (
          <div className="flex justify-center bg-primary-gradient xl:pt-[50px] xl:pb-9">
            <h1 className="text-white font-inter text-center lg:text-left">
              <small className="font-bold xl:text-2xl text-white">{campaigns.data[0].campaignName.toLocaleUpperCase()}</small>
              <strong className="xl:text-6xl font-extrabold block text-white">{t("leaderboard:leaderboard").toLocaleUpperCase()}</strong>
            </h1>
          </div>
        )}
        <div className="lg:mt-32">
          <div className="container mx-auto">
            <Fragment>
              <ul className="flex flex-wrap lg:justify-end">
                {props.leaderboard?.daily?.length > 0 && (
                  <li className="w-ful mb-8 lg:mr-8 lg:mb-0 md:w-56">
                    <button className={`${Classes.button.primary} w-full py-[9px]`} onClick={() => setTab("daily")}>{t("leaderboard:daily")}</button>
                  </li>
                )}
                {props.leaderboard.general.length > 0 && (
                  <li className="w-ful md:w-56">
                    <button className={`${Classes.button.secondary} w-full py-[9px]`} onClick={() => setTab("general")}>{t("leaderboard:all_time")}</button>
                  </li>
                )}
              </ul>
              {props.leaderboard[tab].length > 0 && (
                <div className="mt-6 bg-white shadow rounded p-3">
                  <header className="border-b py-5">
                    <ul className="flex flex-wrap items-center">
                      <li className="text-gray-500 text-xl font-bold w-52">{t("leaderboard:ranking")}</li>
                      <li className="text-gray-500 text-xl font-bold flex-1">{t("leaderboard:name")}</li>
                      <li className="text-gray-500 text-xl font-bold w-52">{t("leaderboard:mte_points")}</li>
                    </ul>
                  </header>
                  <main>
                    <ul>
                      {props.leaderboard[tab].map((user: ILeaderBoardAPI) => (
                        <li className="flex items-center flex-wrap py-5 border-b" key={user.userId}>
                          <div className="w-52 text-xl font-bold text-purple-600">
                            {user.order}.
                          </div>
                          <div className="flex-1">
                            <div className="flex-1 text-xl font-bold text-purple-600 ml-4">
                              {user.userId}
                            </div>
                          </div>
                          <div className="w-52 text-gray-500 text-xl font-bold">
                            {user.rewardCount.mteCount}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </main>
                </div>
              )}
            </Fragment>
          </div>
        </div>
      </section>
    </Layout>
  );
};


export default memo(LeaderBoard);

export const getServerSideProps: GetServerSideProps = async context => {
  const { locale, defaultLocale } = context;
  const { cookies } = context.req;

  if (typeof cookies.session === "string") {
    const session = JSON.parse(cookies.session);

    return {
      props: {
        ...(await serverSideTranslations(locale ? locale : defaultLocale ? defaultLocale : "tr", ["common", "leaderboard"])),
        leaderboard: {
          daily: await getLeaderboard("daily"),
          general: await getLeaderboard("general"),
          profile: await getProfile(session),
          session
        },
        campaigns: await getCampaigns()
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ? locale : defaultLocale ? defaultLocale : "tr", ["common", "leaderboard"])),
      leaderboard: {
        daily: await getLeaderboard("daily"),
        general: await getLeaderboard("general"),
      },
      campaigns: await getCampaigns()
    }
  }
}

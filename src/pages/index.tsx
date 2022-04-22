/* eslint-disable react-hooks/exhaustive-deps */
// Next
import type { NextPage, GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// React
import type { ReactElement } from "react";
import { memo, Fragment } from "react";

// Helpers
import { getCampaigns, getProfile, getTransactions, getWaitingSwapMTE, getWithdrawalAmount, getWallet } from "helpers";

// Components
import { Layout, Countdown, Converter, Features, CampaignTotals, Transactions } from "components";

const Home: NextPage = (props: any): ReactElement => {
    const { 
        session, 
        profile, 
        swapMTE, 
        withdraw, 
        wallet 
    }: { 
        session: ISession,
        profile: IProfileAPI,
        swapMTE: ISwapAPI,
        withdraw: IWithdrawAPI,
        wallet: IWalletAPI
    } = props;
    return (
        <Layout session={session} profile={profile}>
            <Countdown campaigns={props.campaigns} session={props.session} />

            <div className="container mx-auto px-6 xl:px-0">
                {props.session?.token ? (
                    <Fragment>
                        <div className="mt-9 xl:mt-32">
                            <CampaignTotals campaigns={props.campaigns} session={props.session} swapMTE={swapMTE} withdraw={withdraw} wallet={wallet} />
                        </div>
                        <div className="mt-[60px] xl:mt-32">
                            <Transactions campaigns={props.campaigns} transactions={props.transactions} />
                        </div>
                        <div className="mt-[60px] xl:mt-32">
                            <Features />
                        </div>
                        <div className="xl:mt-32">
                            <Converter campaigns={props.campaigns} session={props.session} />
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div className="mt-9 xl:mt-[132px]">
                            <Converter session={props.session} campaigns={props.campaigns} />
                        </div>
                        <div className="mt-[60px] xl:mt-32">
                            <Features />
                        </div>
                        <div className="mt-[60px] xl:mt-32">
                            <CampaignTotals campaigns={props.campaigns} session={props.session} />
                        </div>
                    </Fragment>
                )}
            </div>
        </Layout>
    );
};

export default memo(Home);

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale, defaultLocale } = context;
    const { cookies } = context.req;
    const translations = (await serverSideTranslations(locale ? locale : defaultLocale ? defaultLocale : "tr", ["common", "campaign"]));

    if (typeof cookies.session === "string") {
        const session: ISession = JSON.parse(cookies.session);

        return {
            props: {
                ...translations,
                campaigns: await getCampaigns(),
                transactions: await getTransactions(session, 3, 0),
                profile: await getProfile(session),
                swapMTE: await getWaitingSwapMTE(session),
                withdraw: session.id ? await getWithdrawalAmount(session, session.id) : null,
                wallet: await getWallet(session),
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

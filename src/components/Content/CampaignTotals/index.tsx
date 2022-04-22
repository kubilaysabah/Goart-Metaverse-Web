/* eslint-disable react-hooks/exhaustive-deps */
// Next
import { useTranslation } from "next-i18next";

// React
import type { FC, FormEvent, ReactElement } from "react";
import { Fragment, memo, useState } from "react";

// Interface
import ICampaignsTotals from "./index.d";

// Helpers
import { SwapMTE } from "helpers";

// Helpers
import { Classes } from "helpers";

const CampaignTotals: FC<ICampaignsTotals> = ({
    campaigns,
    wallet,
    session,
    swapMTE,
    withdraw
}: ICampaignsTotals): ReactElement<ICampaignsTotals> => {
    const { t } = useTranslation();
    const [state, setState] = useState<string>("");

    const SwapMTEToMatic = async (): Promise<void> => {
        if (campaigns && session) {
            const response = await SwapMTE(session, {
                campaignId: campaigns.data[0].uid,
                swapAmount: state
            })

            if (response?.status) {
                // todo success swap mte
            }
        }
    }

    return campaigns ? (
        <section className="text-center font-inter" id="campaigns">
            {campaigns.data.length > 0 && (
                <Fragment>
                    <h2 className="drop-shadow text-gray-900 text-xl leading-10 font-bold mb-4 lg:font-extrabold lg:mb-12 lg:text-4xl">{campaigns.data[0].campaignName}</h2>
                    <nav>
                        <ul className="flex flex-wrap items-center">
                            <li className={`w-full xl:flex-1 mb-[30px] lg:mb-0 lg:mr-[30px]`}>
                                {session?.token ? (
                                    <article className="relative bg-white rounded shadow-md p-6 font-inter">
                                        <div className="border-b border-gray-300 pb-2.5 mb-[37px]">
                                            <div className="flex flex-wrap items-center justify-center mb-[22px]">
                                                <object data="/mte-point.svg" type="image/svg+xml" />
                                                <span className="text-lg font-bold text-black block ml-3">{t("campaign:total_collected_mte")}</span>
                                            </div>
                                            <strong
                                                className="text-5xl xl:text-3xl lg:text-5xl text-center block mb-8">{campaigns.data[0].totalCollectibleItemAmount}</strong>
                                            {swapMTE && (
                                                <Fragment>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="text-sm xl:text-lg text-gray-600">{t("campaign:total_swapped_mte")}</span>
                                                        <div>
                                                            <div className="flex items-center">
                                                                <object data="/mte-point.svg" type="image/svg+xml" />
                                                                <span className="text-xl text-gray-600 ml-2">{swapMTE.message.collectedItemAmount || 0}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between mb-6">
                                                        <span className="text-sm xl:text-lg text-gray-800">{t("campaign:waiting_to_swap")}</span>
                                                        <div>
                                                            <div className="flex items-center">
                                                                <object data="/mte-point.svg" type="image/svg+xml" />
                                                                <span className="text-xl text-gray-800 ml-2">{swapMTE.message.swappedAmount || 0}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            )}
                                            <div className="flex">
                                                <div className="flex-1">
                                                    <div className="flex">
                                                        <div className="flex-1">
                                                            <input type="text" placeholder={t("campaign:swap_mte_to_matic")}
                                                                className="focus:outline-none bg-white indent-[13px] pr-[13px] w-full shadow-sm h-[38px]" value={state} onChange={(event: FormEvent<HTMLInputElement>) => setState(event.currentTarget.value)} />
                                                        </div>
                                                        <div className="bg-purple-500 text-white h-[38px] flex items-center text-sm font-medium px-3 rounded-r-md">
                                                            Max.
                                                        </div>
                                                        <button className={`${Classes.button.primary} py-[9px] px-[35px] ml-[18px]`} onClick={SwapMTEToMatic}>Swap</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between flex-wrap">
                                            <div>
                                                <div className="flex items-center mb-4">
                                                    <object data="/mte-point.svg" type="image/svg+xml" />
                                                    <h4 className="text-black text-lg font-bold ml-2.5">{t("campaign:total_mte_points")}</h4>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-lg">{campaigns.data[0].totalCollectibleItemAmount}</span>
                                            </div>
                                        </div>
                                        <div className="mb-8">
                                            {/* Progress Bar */}
                                            <div className="flex">
                                                <div className={`h-2 relative rounded-xl bg-purple-500`}>
                                                    <div className="block absolute right-0 -top-2">
                                                        <span className="w-6 h-6 rounded-full bg-white shadow-lg block ml-auto relative left-2" />
                                                        <span className="text-lg leading-6 font-medium text-purple-600 mt-1 block relative left-4">0%</span>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-300 h-2 rounded-xl flex-1"></div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap justify-between">
                                            <div className="text-left">
                                                <span
                                                    className="block text-sm text-gray-900 font-medium">{campaigns.data[0].totalCollectibleItemAmount - campaigns.data[0].remainingMaticAmount}</span>
                                                <small className="block text-gray-500 font-medium">{t("campaign:collected_mte_points")}</small>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-sm text-gray-900 font-medium">{campaigns.data[0].remainingMaticAmount}</span>
                                                <small className="block text-gray-500 font-medium">{t("campaign:remain_mte_matic")}</small>
                                            </div>
                                        </div>
                                    </article>
                                ) : (
                                    <article className="relative bg-white rounded shadow-md p-6 font-inter">
                                        <div className="flex items-center justify-center mb-4">
                                            <object data="/total-mte.svg" type="image/svg+xml" />
                                            <h4 className="text-black text-lg font-bold ml-2.5">{t("campaign:total_mte_points")}</h4>
                                        </div>

                                        <strong className="text-3xl lg:text-5xl text-center block mb-8">{campaigns.data[0].totalCollectibleItemAmount}</strong>

                                        <div className="mb-8">
                                            {/* Progress Bar */}
                                            <div className="flex">
                                                <div className={`h-2 relative rounded-xl bg-purple-500`}>
                                                    <div className="block absolute right-0 -top-2">
                                                        <span className="w-6 h-6 rounded-full bg-white shadow-lg block ml-auto relative left-2" />
                                                        <span className="text-lg leading-6 font-medium text-purple-600 mt-1 block relative left-4">0%</span>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-300 h-2 rounded-xl flex-1"></div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap justify-between">
                                            <div className="text-left">
                                                <span
                                                    className="block text-sm text-gray-900 font-medium">{campaigns.data[0].totalCollectibleItemAmount - campaigns.data[0].remainingMaticAmount}</span>
                                                <small className="block text-gray-500 font-medium">{t("campaign:collected_mte_points")}</small>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-sm text-gray-900 font-medium">{campaigns.data[0].remainingMaticAmount}</span>
                                                <small className="block text-gray-500 font-medium">{t("campaign:remain_mte_matic")}</small>
                                            </div>
                                        </div>
                                    </article>
                                )}
                            </li>
                            <li className={`w-full xl:flex-1 mb-8 lg:mb-0`}>
                                {session?.token ? (
                                    <article className="relative bg-white rounded shadow-md p-6 font-inter">
                                        <div className="border-b border-gray-300 mb-[37px] pb-2.5">
                                            <div className="flex items-center justify-center mb-4">
                                                <object data="/total-matic.svg" type="image/svg+xml" />
                                                <h4 className="text-black text-lg font-bold ml-2.5">{t("campaign:total_claimed_matic")}</h4>
                                            </div>

                                            <strong className="text-5xl xl:text-3xl lg:text-5xl text-center block mb-8">{campaigns.data[0].totalMaticAmount}</strong>

                                            {withdraw && (
                                                <div className="flex mb-[18px]">
                                                    <div className="flex-1">
                                                        <div className="flex items-center">
                                                            <span className="text-xs xl:text-lg text-gray-600">
                                                                {t("campaign:claimable_matic")}
                                                            </span>
                                                            <div className="ml-4 xl:ml-11">
                                                                <div className="flex items-center">
                                                                    <object data="/total-matic.svg" type="image/svg+xml" />
                                                                    <span className="text-lg text-gray-600 ml-2">{withdraw.message.withdrawalAmount}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button className={`${Classes.button.primary} py-1.5 px-[38.5px]`}>{t("campaign:claim")}</button>
                                                    </div>
                                                </div>
                                            )}

                                            {wallet && (
                                                <div>
                                                    <div className="text-left px-[13px] py-[9px] border border-gray-300 bg-white shadow-sm rounded-md text-sm text-gray-500 h-[38px]">
                                                        {wallet.message.walletAddress}
                                                    </div>
                                                    <small className="text-gray-500 text-sm block text-left mt-3">{t("campaign:minimum_claimable_amount")} = 1 {t("campaign:matic")}</small>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="flex items-center mb-4">
                                                    <object data="/total-matic.svg" type="image/svg+xml" />
                                                    <h4 className="text-black text-lg font-bold ml-2.5">{t("campaign:total_matic")}</h4>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-lg text-black">10000</span>
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            {/* Progress Bar */}
                                            <div className="flex">
                                                <div className={`h-2 relative rounded-xl bg-purple-500`}>
                                                    <div className="block absolute right-0 -top-2">
                                                        <span className="w-6 h-6 rounded-full bg-white shadow-lg block ml-auto relative left-2" />
                                                        <span className="text-lg leading-6 font-medium text-purple-600 mt-1 block relative left-4">0%</span>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-300 h-2 rounded-xl flex-1"></div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap justify-between">
                                            <div className="text-left">
                                                <span className="block text-sm text-gray-900 font-medium">{campaigns.data[0].totalMaticAmount - campaigns.data[0].remainingMaticAmount}</span>
                                                <small className="block text-gray-500 font-medium">{t("campaign:distributed_matic")}</small>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-sm text-gray-900 font-medium">{campaigns.data[0].remainingMaticAmount}</span>
                                                <small className="block text-gray-500 font-medium">{t("campaign:remain_matic")}</small>
                                            </div>
                                        </div>
                                    </article>
                                ) : (
                                    <article className="relative bg-white rounded shadow-md p-6 font-inter">
                                        <div className="flex items-center justify-center mb-4">
                                            <object data="/total-matic.svg" type="image/svg+xml" />
                                            <h4 className="text-black text-lg font-bold ml-2.5">{t("campaign:total_matic")}</h4>
                                        </div>

                                        <strong className="text-3xl lg:text-5xl text-center block mb-8">{campaigns.data[0].totalMaticAmount}</strong>

                                        <div className="mb-8">
                                            {/* Progress Bar */}
                                            <div className="flex">
                                                <div className={`h-2 relative rounded-xl bg-purple-500`}>
                                                    <div className="block absolute right-0 -top-2">
                                                        <span className="w-6 h-6 rounded-full bg-white shadow-lg block ml-auto relative left-2" />
                                                        <span className="text-lg leading-6 font-medium text-purple-600 mt-1 block relative left-4">0%</span>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-300 h-2 rounded-xl flex-1"></div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap justify-between">
                                            <div className="text-left">
                                                <span className="block text-sm text-gray-900 font-medium">{campaigns.data[0].totalMaticAmount - campaigns.data[0].remainingMaticAmount}</span>
                                                <small className="block text-gray-500 font-medium">{t("campaign:distributed_matic")}</small>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-sm text-gray-900 font-medium">{campaigns.data[0].remainingMaticAmount}</span>
                                                <small className="block text-gray-500 font-medium">{t("campaign:remain_matic")}</small>
                                            </div>
                                        </div>
                                    </article>
                                )}
                            </li>
                        </ul>
                    </nav>
                </Fragment>
            )}
        </section>
    ) : <Fragment />
};


export default memo(CampaignTotals);
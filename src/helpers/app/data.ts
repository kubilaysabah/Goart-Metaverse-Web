import { Endpoints } from "helpers";

const SerializeData = (data: any): string => {
    let serializedData = [];

    for (let key in data) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(data[key]);
        serializedData.push(encodedKey + "=" + encodedValue);
    }
    return serializedData.join("&");
}

const getCampaigns = async (): Promise<ICampaignsAPI | null> => {
    try {
        const response = await fetch(Endpoints.PORTAL_API_URL + Endpoints.campaign, {
            mode: "no-cors"
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }

    return null;
};

const getArticles = async (): Promise<IArticlesAPI | null> => {
    try {
        const response = await fetch(Endpoints.articles);
        return await response.json();
    } catch (error) {
        console.error(error);
    }

    return null;
};

const getTransactions = async (session: ISession, limit: number, page: number): Promise<ITransactionsAPI | null> => {
    if (session) {
        try {
            const response = await fetch(Endpoints.PORTAL_API_URL + Endpoints.transactions(limit, page), {
                mode: "no-cors",
                headers: {
                    "Authorization": `Bearer ${session.token}`,
                    "connection": "keep-alive"
                }
            });

            return await response.json()

        } catch (error) {
            console.error(error);
        }
    }

    return null;
};

const getQuestions = async (session: ISession, locale: "tr-TR" | "en-US"): Promise<ISurveyAPI | null> => {
    try {
        const response = await fetch(Endpoints.PORTAL_API_URL + Endpoints.questions, {
            mode: "no-cors",
            headers: {
                "Accept-Language": locale,
                "Authorization": `Bearer ${session.token}`,
            },
        });

        return await response.json();
    } catch (error) {
        console.error(error);
    }

    return null;
};

const getCities = async (session: ISession, countryCode: string): Promise<string[] | null> => {
    try {
        const response = await fetch(Endpoints.PORTAL_API_URL + Endpoints.getCityByCountryCode(countryCode), {
            mode: "no-cors",
            headers: {
                "Authorization": `Bearer ${session.token}`,
            }
        });
        return await response.json();

    } catch (error) {
        console.error(error);
    }

    return null
};

const getProfile = async (session: ISession): Promise<IProfileAPI | null> => {
    try {
        const response = await fetch(Endpoints.PORTAL_API_URL + Endpoints.profile, {
            mode: "no-cors",
            headers: {
                "Authorization": `Bearer ${session?.token}`,
                "connection": "keep-alive"
            }
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }

    return null;
}

const getLeaderboard = async (type: "general" | "daily"): Promise<ILeaderBoardAPI | null> => {
    try {
        const response = await fetch(Endpoints.PORTAL_API_URL + Endpoints.leaderboard(type), {
            mode: "no-cors"
        });
        const Leaderboard: ILeaderBoardAPI = await response.json();
        return Leaderboard;

    } catch (error) {
        console.error(error);
    }

    return null;
};

const getWaitingSwapMTE = async (session: ISession): Promise<ISwapAPI | null> => {
    try {
        const response = await fetch(Endpoints.PORTAL_API_URL + Endpoints.swap, {
            mode: "no-cors",
            headers: {
                "Authorization": `Bearer ${session.token}`,
            },
        });

        return await response.json();
    } catch (error) {
        console.error(error);
    }

    return null;
};

const getWithdrawalAmount = async (session: ISession, uid: string): Promise<IWithdrawAPI | null> => {
    try {
        const response = await fetch(Endpoints.PORTAL_API_URL + Endpoints.withdraw(uid), {
            mode: "no-cors",
            headers: {
                "Authorization": `Bearer ${session.token}`,
            },
        });

        return await response.json();
    } catch (error) {
        console.error(error);
    }

    return null;
}

const getWallet = async (session: ISession): Promise<IWalletAPI | null> => {
    try {
        const response = await fetch(Endpoints.PORTAL_API_URL + Endpoints.wallet, {
            mode: "no-cors",
            headers: {
                "Authorization": `Bearer ${session.token}`,
            },
        });

        return await response.json();
    } catch (error) {
        console.error(error);
    }

    return null;
}

const setWallet = async (session: ISession, campaigns: ICampaignsAPI, walletAddress: string): Promise<any> => {
    try {
        const response = await fetch(Endpoints.PORTAL_API_URL + Endpoints.wallet, {
            method: "PUT",
            mode: "no-cors",
            headers: {
                "Authorization": `Bearer ${session.token}`,
                "Content-Type": "application/x-server.js-form-urlencoded;charset=UTF-8"
            },
            body: JSON.stringify({
                campaignId: campaigns.data[0].uid,
                walletAddress
            })
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }

    return null;
};

const setQuestions = async (session: ISession, survey: ISurvey): Promise<any> => {
    try {
        const response = await fetch(Endpoints.PORTAL_API_URL + Endpoints.saveUserMarketingQuestionSurvey, {
            mode: "no-cors",
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(survey)
        });
        return await response.json();

    } catch (error) {
        console.error(error);
    }

    return null;
};

const SwapMTE = async (session: ISession, body: {
    campaignId: string;
    swapAmount: string;
}): Promise<ISwapMTEAPI | null> => {
    try {
        const response = await fetch(Endpoints.PORTAL_API_URL + Endpoints.swap, {
            mode: "no-cors",
            method: "POST",
            headers: {
                "Authorization": `Bearer ${session.token}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: SerializeData(body)
        });
        return response;

    } catch (error) {
        console.error(error);
    }

    return null;
}

export {
    SerializeData,
    getCampaigns,
    getArticles,
    getTransactions,
    getQuestions,
    getProfile,
    getCities,
    getWaitingSwapMTE,
    getWithdrawalAmount,
    getLeaderboard,
    getWallet,
    setWallet,
    setQuestions,
    SwapMTE
}


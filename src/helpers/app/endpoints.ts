const Endpoints = {
    API_URL:process.env.NEXT_PUBLIC_API_URL,
    PORTAL_API_URL: process.env.NEXT_PUBLIC_PORTAL_API_URL,
    campaign: "/admin/campaign",
    transactions: (limit: number, page: number): string => `/campaign/transactions?limit=${limit}&page=${page}`,
    profile: "/user/profile",
    articles: "/api/articles",
    navigation: "/api/navigation",
    questions: "/marketing-questions",
    getCityByCountryCode: (countryCode: string): string => `/country/${countryCode}/cities`,
    saveUserMarketingQuestionSurvey: "/marketing-questions/save",
    swap: "/campaign/swap",
    withdraw: (uid: string): string => `/campaign/withdraw?uid=${uid}`,
    forgotPassword: (email: string) => `/auth/send-reset-password-email?email=${email}`,
    leaderboard: (type: "daily" | "general") => `/leaderboard?type=${type}`,
    wallet: "/campaign/wallet"
};

export default Endpoints;

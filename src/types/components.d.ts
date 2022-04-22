interface ISession {
    token?: string;
    username?: string;
    expire?: number;
    email?: string;
    verify?: boolean;
    id?: string;
    avatar?: string;
    marketingSurveyCompleted?: boolean;
}

interface ITimer {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    distance: number;
}

interface ISurvey {
    age?: string;
    gender?: string;
    marital?: string;
    location?: string;
    city?: string;
    education?: string;
    countryToLive?: string;
    vocation?: string;
    cityToVisit?: string;
    food?: string;
    shopping?: string;
    shoppingWay?: string;
    interest?: string[];
    crypto?: "Yes" | "No";
    hearAboutUs?: string[]
}
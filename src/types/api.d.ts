interface ICampaignsAPI {
    status: number
    data: {
        uid: string
        campaignName: string
        endDate: {
            _seconds: number
            _nanoseconds: number
        },
        transactionCount: number,
        remainingCollectibleItemAmount: number
        totalCollectibleItemAmount: number
        remainingMaticAmount: number
        startDate: {
            _seconds: number,
            _nanoseconds: number
        },
        totalMaticAmount: number
    }[]
}

interface IArticlesAPI {
    tr: {
        title: string;
        content: {
            id: number;
            icon: string;
            title: string;
            description: string;
        }[];
    };
    en: {
        title: string;
        content: {
            id: number;
            icon: string;
            title: string;
            description: string;
        }[];
    }
}

interface ILeaderBoardAPI {
    order: number;
    rewardCount: {
        mteCount: number;
    };
    userId: string;
}

interface ITransactionsAPI {
    data: {
        blockHash: string
        blockNumber: number
        collectibleItemAmount: number
        createdAt: {
            _nanoseconds: number;
            _seconds: number;
        }
        cumulativeGasUsed: number;
        effectiveGasPrice: number;
        from: string
        gasUsed: number;
        logsBloom: string;
        maticAmount: string;
        status: boolean
        to: string;
        transactionHash: string;
        transactionId: string;
        transactionIndex: number;
        transactionType: string;
    }[]
    status: number;
    transactionCount: number;
}

interface IForgotPasswordAPI {
    status: number;
    message: string;
}

interface IToken {
    name: string;
    exp: number;
    email: string;
    email_verified: boolean;
    user_id: string;
}

interface ISurveyAPI {
    answers: any[];
    key: string;
    multiple: boolean;
    order: number;
    question: string;
}

interface IProfileAPI {
    avatarUrl: string;
    email: string;
    marketingSurveyCompleted: boolean;
    username: string;
}

interface ISwapAPI {
    status: number;
    message: {
        uid: string
        email: string
        participantIndex: string
        collectedItemAmount?: string
        swappedAmount?: string
    }
}

interface ISwapMTEAPI {
    status: number;
    message: {
        _firestore: {
            projectId: string;
        },
        _path: {
            segments: string[]
        },
        _converter: {}
    }
}

interface IWithdrawAPI {
    status: number,
    message: {
        uid: string;
        email: string
        participantIndex: string
        withdrawalAmount: string
    }
}

interface IWalletAPI {
    status: number;
    message: {
        uid: string;
        email: string;
        participantIndex: string;
        walletAddress: string;
    }
}
// Next
import type { NextApiRequest, NextApiResponse } from "next";

const Response = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({
        en: {
            title: "How to claim your Matic?",
            content: [
                {
                    id: 1,
                    icon: "/sign-in.svg",
                    title: "Download GoArt App",
                    description: "Download GoArt app in App Store or Google Play & Create your account"
                },
                {
                    id: 2,
                    icon: "/wallet.svg",
                    title: "Sign in with GoArt account",
                    description: "Sign in with GoArt account in web page which you created in GoArt app."
                },
                {
                    id: 3,
                    icon: "/claim.svg",
                    title: "Create your wallet",
                    description: "Create your own Polygon address in Metamask or any other exchanges and save your wallet address in web page."
                },
                {
                    id: 4,
                    icon: "/matic.svg",
                    title: "Claim your Matic coin",
                    description: "Swap MTE to Matic & Click the claim button and get your Matic coin to your saved address."
                }
            ],
        },
        tr: {
            id: 2,
            title: "Matic'lerinizi nasıl çekebilirsiniz?",
            content: [
                {
                    id: 5,
                    icon: "/sign-in.svg",
                    title: "GoArt Uygulamasını indir",
                    description: "GoArt uygulamasını App Store ya da Google Play'den indir & kendi hesabını oluştur"
                },
                {
                    id: 6,
                    icon: "/wallet.svg",
                    title: "GoArt Hesabın İle Giriş Yap",
                    description: "GoArt uygulamasında oluşturduğun hesabın ile web sayfasında giriş yap."
                },
                {
                    id: 7,
                    icon: "/claim.svg",
                    title: "Cüzdanını Oluştur",
                    description: "Metamask ya da başka bir kripto borsada Polygon cüzdanı oluştur &  Cüzdan adresini web sayfasında kaydet"
                },
                {
                    id: 8,
                    icon: "/matic.svg",
                    title: "Matic Coin'lerini Çek",
                    description: "MTE'lerini Matic'e dönüştür & Claim butonunu seç ve Matic coinlerini kayıtlı adresine çek"
                }
            ]
        }
    })
}

export default Response;
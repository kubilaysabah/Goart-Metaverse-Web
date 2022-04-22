// Next
import { useRouter } from "next/router";

// React
import type { FC, ReactElement } from "react";
import { memo, Fragment, useState, useEffect } from "react";

// Helpers
import { getArticles } from "helpers";

const Features: FC = (): ReactElement => {
    const { locale } = useRouter();
    const [articles, setArticles] = useState<IArticlesAPI | null>(null);

    useEffect(() => {
        (async() => {
            const response: IArticlesAPI | null = await getArticles();
            setArticles(response);
        })()
    }, []);

    return articles ? (
        <section className="text-center font-inter">
            <h2 className="drop-shadow text-purple-600 text-xl font-bold mb-16 lg:text-4xl lg:font-extrabold lg:text-gray-900 lg:mb-20">{locale === "tr" ? articles.tr.title : articles.en.title}</h2>
            <nav>
                <ul className="flex flex-wrap">
                    {
                        articles[locale === "tr" ? "tr" : "en"].content.map((article, index) => (
                            <li key={article.id} className={`w-full lg:flex-1 ${index !== articles.en.content.length - 1 ? "mb-16 lg:mb-0 lg:mr-8" : ""}`}>
                                <article className="relative bg-white rounded shadow-md p-6 font-inter lg:h-full">
                                    <div className="absolute left-1/2 -top-8 -translate-x-2/4 z-10">
                                        <object data={article.icon} type="image/svg+xml" />
                                    </div>
                                    <div className="pt-8 pb-2">
                                        <h4 className="text-lg font-medium mb-5 text-gray-900">{article.title}</h4>
                                        <p className="text-base text-gray-500">{article.description}</p>
                                    </div>
                                </article>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </section>
    ) : <Fragment />;
};


export default memo(Features);
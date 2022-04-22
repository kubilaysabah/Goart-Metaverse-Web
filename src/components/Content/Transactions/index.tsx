/* eslint-disable react-hooks/exhaustive-deps */
// Next
import { useTranslation } from "next-i18next";

// React
import { FC, ReactElement, useEffect } from "react";
import { memo, useState, Fragment } from "react";

// Interface
import ITransactions, { IPage } from "./index.d";

// Helpers
import { toDateTime, ConvertDate, Classes } from "helpers";

const Transactions: FC<ITransactions> = ({
  transactions,
  campaigns
}: ITransactions): ReactElement<ITransactions> => {
  const { t } = useTranslation();
  const [date, setDate] = useState<string>("");
  const [page, setPage] = useState<IPage>({
    length: 0,
    now: 0,
    total: 0,
    limit: 3
  });

  const prevPageHandler = (): void => {
    if (page.now > 0) {
      setPage({
        ...page,
        now: page.now--
      })
    }
  };

  const nextPageHandler = (): void => {
    if (page.now < page.limit) {
      setPage({
        ...page,
        now: page.now++
      })
    }
  }

  const calcPageLimit = (length: number): void => {
    const remaining = page.length % page.limit;
    const limit = Number((page.length / page.limit).toFixed());

    setPage({
      ...page,
      length: length,
      limit: remaining > 0 ? limit + 1 : limit
    })
  }

  useEffect(() => {
    if (campaigns) {
      setDate(ConvertDate(toDateTime(campaigns.data[0].endDate._seconds)))
    }
  }, [campaigns]);

  return transactions ? (
    <section>
      <header className="flex flex-wrap mb-6">
        <div className="w-full mb-6 lg:mb-0 lg:flex-1">
          <ul className="text-sm leading-5 text-gray-500">
            {campaigns && campaigns.data.length > 0 && (
              <li className="font-medium text-base">{t("campaign:end_date")} {date}</li>
            )}
            <li>1 {t("campaign:matic_coin")} = 10 {t("campaign:mte_points")}</li>
            <li>{t("campaign:minimum_claim_amount")} = 1 {t}</li>
          </ul>
        </div>
        <div>
          <div className="flex flex-wrap items-center">
            <div className="mr-6 ">
              <button className={`${Classes.button.secondary} py-[9px] md:px-[38px]`}>{t("campaign:rewards")}</button>
            </div>
            <div>
              <button className={`${Classes.button.primary} py-[9px] md:px-[38px]`}>{t("campaign:transaction")}</button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="font-inter overflow-hidden">
          <main className="w-full overflow-x-auto">
            <table className="w-full text-left ">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">
                    <span className="text-xs font-medium leading-4 text-gray-500">{t("campaign:day")}</span>
                  </th>
                  <th className="py-3 px-4">
                    <span className="text-xs font-medium leading-4 text-gray-500">{t("campaign:mte_points")}</span>
                  </th>
                  <th className="py-3 px-4">
                    <span className="text-xs font-medium leading-4 text-gray-500">{t("campaign:matic")}</span>
                  </th>
                  <th className="py-3 px-4">
                    <span className="text-xs font-medium leading-4 text-gray-500">{t("campaign:fee")}</span>
                  </th>
                  <th className="py-3 px-4">
                    <span
                      className="text-xs font-medium leading-4 text-gray-500">{t("campaign:to").toLocaleUpperCase()}</span>
                  </th>
                  <th className="py-3 px-4">
                    <span
                      className="text-xs font-medium leading-4 text-gray-500">{t("campaign:transaction_hash")}</span>
                  </th>
                </tr>
              </thead>
              {transactions?.data?.length > 0 && (
                <tbody>
                  {transactions.data.map(item => (
                    <tr key={item.transactionId}>
                      <td className="border-b py-3 px-4">
                        {ConvertDate(toDateTime(item.createdAt._seconds))}
                      </td>
                      <td className="border-b py-3 px-4">
                        {item.collectibleItemAmount}
                      </td>
                      <td className="border-b py-3 px-4">
                        {item.maticAmount}
                      </td>
                      <td className="border-b py-3 px-4">
                        0.1
                      </td>
                      <td className="border-b py-3 px-4">
                        {/* @ts-ignore */}
                        {`${item.to.substr("", 4)} ... ${item.to.substring(item.to.length - 3)}`}
                      </td>
                      <td className="border-b py-3 px-4">
                        <a href={`https://mumbai.polygonscan.com/tx/${item.transactionHash}`}
                          className="block text-purple-600 whitespace-nowrap" target="_blank" rel="_ noreferrer"
                          title={t("campaign:view_on_polygon_scan")}>
                          {t("campaign:view_on_polygon_scan")}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </main>
          <footer className={`border-t border-gray-200 mt-6 flex flex-wrap items-center justify-between pt-3`}>
            <div>
              <small className="text-sm leading-5 text-gray-700">
                {t("campaign:result", {
                  now: page.now + 1,
                  length: page.length,
                  limit: page.limit
                })}
              </small>
            </div>
            <div>
              <div className="flex items-center flex-wrap">
                <div className="mr-3">
                  <button className={`${Classes.button.secondary} py-[9px] px-[17px] shadow-sm`} onClick={prevPageHandler}>{t("campaign:prev")}</button>
                </div>
                <div>
                  <button className={`${Classes.button.secondary} py-[9px] px-[17px] shadow-sm`} onClick={() => nextPageHandler()}>{t("campaign:next")}</button>
                </div>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </section>
  ) : <Fragment />;
};


export default memo(Transactions);

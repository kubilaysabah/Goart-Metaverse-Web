/* eslint-disable react-hooks/exhaustive-deps */
// Next
import { useTranslation } from "next-i18next";

// React
import type { FC, ReactElement, FormEvent } from "react";
import { memo, useState } from "react";

// Interface
import IConverter, { IFormData } from "./index.d";

// Helpers
import { Classes, setMatic } from "helpers";

const Converter: FC<IConverter> = ({
  campaigns,
  session
}: IConverter): ReactElement<IConverter> => {
  const { t } = useTranslation();
  const [state, setState] = useState<IFormData>({
    matic: "",
    mte: "",
    try: ""
  });

  const SwapMteToMatic = async () => {
    if (state) {
      if (campaigns && session?.token && state) {
        const data = await setMatic(session, campaigns, state.mte);
      }
    }
  };

  return (
    <section className="font-inter" id="converter">
      <h2 className="font-inter text-purple-600 font-bold text-xl text-center mb-4 lg:text-gray-900 lg:text-4xl lg:font-extrabold lg:mb-12">{t("campaign:title")}</h2>
      <nav>
        <ul className="flex flex-wrap">
          <li className="w-full mb-4 lg:flex-1 lg:mr-8">
            <label htmlFor="converter" className="text-sm text-gray-700 block mb-2">{t("campaign:mte")}</label>
            <div className={`flex items-center ${Classes.InputWithIcon}`}>
              <div className="flex-1">
                <input
                  type="text"
                  name="mte"
                  className="focus:outline-none w-full bg-transparent text-center h-[66px] lg:text-5xl lg:font-extrabold"
                  onChange={(event: FormEvent<HTMLInputElement>) => setState({
                    ...state,
                    mte: event.currentTarget.value
                  })}
                  onBlur={SwapMteToMatic}
                  value={state.mte}
                />
              </div>
              <div>
                <object data="/mte-point.svg" type="image/svg+xml"></object>
              </div>
            </div>
          </li>
          <li className="w-full mb-4 lg:flex-1 lg:mr-8">
            <label htmlFor="matic" className="text-sm text-gray-700 block mb-2">{t("campaign:matic")}</label>
            <div className={`flex items-center ${Classes.InputWithIcon}`}>
              <div className="flex-1">
                <input
                  type="text"
                  name="matic"
                  className="focus:outline-none w-full bg-transparent text-center h-[66px] lg:text-5xl lg:font-extrabold"
                  onChange={(event: FormEvent<HTMLInputElement>) => setState({
                    ...state,
                    matic: event.currentTarget.value
                  })}
                  value={state.matic}
                  readOnly
                />
              </div>
              <div>
                <object data="/matic-coin.svg" type="image/svg+xml"></object>
              </div>
            </div>
          </li>
          <li className="w-full lg:flex-1">
            <label htmlFor="try" className="text-sm text-gray-700 block mb-2">{t("campaign:try")}</label>
            <div className={`flex items-center ${Classes.InputWithIcon}`}>
              <div className="flex-1">
                <input
                  type="text"
                  name="try"
                  className="focus:outline-none w-full bg-transparent text-center h-[66px] lg:text-5xl lg:font-extrabold"
                  onChange={(event: FormEvent<HTMLInputElement>) => setState({
                    ...state,
                    try: event.currentTarget.value
                  })}
                  value={state.try}
                  readOnly
                />
              </div>
              <div>
                <object data="/try.svg" type="image/svg+xml"></object>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </section>
  );
};


export default memo(Converter);

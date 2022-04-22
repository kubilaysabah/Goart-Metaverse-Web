// Next
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

// React
import type { FC, ReactElement } from "react";
import { memo } from "react";

// Tailwind CSS
import "styles/globals.scss";

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps): ReactElement<AppProps> => {
  return <Component {...pageProps} />
};

export default memo(appWithTranslation(MyApp));

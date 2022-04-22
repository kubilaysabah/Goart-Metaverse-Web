// Next
import Document, { Html, Head, Main, NextScript } from "next/document";
// import type { DocumentInitialProps, DocumentContext } from "next/document";

// React
import type { ReactElement } from "react";

export default class MyDocument extends Document {
  // static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {

  // }

  render(): ReactElement {
    return (
      <Html>
        <Head />
        <body className="bg-gray-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
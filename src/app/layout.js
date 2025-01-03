/* eslint-disable @next/next/no-page-custom-font */
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Provider } from "react-redux";
import store from "../store/store";
import App from "./app.js";
import CustomScript from "../shared/scripts/script.js";
import Script from "next/script";

// import Loading from '@/shared/components/Loading/index'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Somachar News || Bangla Newspaper",
  description:
    "Somachar News: Uncover the truth with insightful reporting and a commitment to authentic storytelling. Stay informed and engaged!",
  keywords:
    "Somachar News, Somachar TV, Somachar, somachar tv, bd news, BD News, bd newspaper, News of Bangladesh,  news, journalism, truth, insights, articles, unbiased reporting, current events, media",
  author: "Somachar News",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        <meta charSet="UTF-8" />
        <meta name="next-size-adjust" content="100%" />
        {/* Google Search console verification tag start --->>> */}
        <meta
          name="google-site-verification"
          content="y2czWfQhrwPPZlkT_4qzG_pv7KTggYkZy2mBubib-L0"
        />
        {/* <<<--- Google Search console verification tag End */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/android-chrome-192x192.png" sizes="192x192" />
        <link rel="icon" href="/android-chrome-512x512.png" sizes="512x512" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />

        {/* Google Tag Manager from Google analytics -- code start --*/}

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-59WNXYEQBZ" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-59WNXYEQBZ');
            `,
          }}
        />
        {/* Google Tag Manager from Google analytics -- code end --*/}

        <CustomScript />
      </head>

      <App>
        <body className={inter.className}>{children}</body>
      </App>
    </html>
  );
}

import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Provider } from "react-redux";
import store from "../store/store";
import App from "./app.js";
import Script from "./scripts/script.js";

// import Loading from '@/shared/components/Loading/index'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Somachar TV || Bangla Newspaper",
  description:
    "Somachar TV: Uncover the truth with insightful reporting and a commitment to authentic storytelling. Stay informed and engaged!",
  keywords:
    "Somachar TV, news, journalism, truth, insights, articles, unbiased reporting, current events, media",
  author: "Somachar TV"
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

        {/* Google tag (gtag.js) */}
        {/* <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TWJDNTRE97"
        ></script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7281991904831824"
          crossOrigin="anonymous"
        ></script>

        <script async src="https://cdn.jsdelivr.net/npm/jquery@3.6.0"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TWJDNTRE97');
            `,
          }}
        /> */}
        <Script />
      </head>

      <App>
        <body className={inter.className}>{children}</body>
      </App>
    </html>
  );
}

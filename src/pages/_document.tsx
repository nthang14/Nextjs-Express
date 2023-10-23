import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Nature NFT Hub へようこそ！</title>
        <meta property="og:title" content="Nature NFT Hub へようこそ！" />
        <meta
          property="og:description"
          content="私たちは、地球温暖化と闘う革新的なスタートアップやNGO、大学などの教育機関と、地球環境問題に貢献したいという情熱を持つ個人とを結びつけるための先駆的なNFTマーケットプレイスです。"
        />
        <meta
          property="og:image"
          content="https://naturehub.co.jp/_next/static/media/home-banner.43278885.png"
        />
        <meta name="twitter:card" content="summary"></meta>
        <meta property="twitter:title" content="Nature NFT Hub へようこそ！" />
        <meta
          property="twitter:description"
          content="私たちは、地球温暖化と闘う革新的なスタートアップやNGO、大学などの教育機関と、地球環境問題に貢献したいという情熱を持つ個人とを結びつけるための先駆的なNFTマーケットプレイスです。"
        />
        <meta
          property="twitter:image"
          content="https://naturehub.co.jp/_next/static/media/home-banner.43278885.png"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

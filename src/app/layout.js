"use client";
import Header from "@/components/Header";
import "./globals.css"; // Your global styles
import { Ropa_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import { Suspense } from "react";

const ropaSans = Ropa_Sans({
  subsets: ["latin"],
  weight: ["400"], // Ropa Sans has fewer weight options
  style: ["normal", "italic"],
  variable: "--font-ropa-sans", // Optional for CSS variable
});

export default function RootLayout({ children }) {
  
  return (
    <html lang="en" className={`${ropaSans.variable} bg-dark-purple-100`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <title>adioogle</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){
            w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
            j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TRZSNGGH');
        `,
          }}
        ></script>

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8RG9NY419T"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-8RG9NY419T');`,
          }}
        ></script>

        <meta property="og:title" content="Adioogle" />
        <meta property="og:description" content="everything you'll ever need" />
        <meta property="og:image" content="/Banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:type" content="image/png"/>
        <meta name="twitter:title" content="Adioogle" />
        <meta name="twitter:description" content="my g*ogle" />
      </head>
      <body className="flex flex-col min-h-screen relative">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TRZSNGGH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Suspense fallback={<div>Loading Header...</div>}>
          <Header />
        </Suspense>

        <main className="flex-grow flex">
          <div className="w-full">
            <Suspense fallback={<div>Loading Body...</div>}>
              {children}
            </Suspense>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

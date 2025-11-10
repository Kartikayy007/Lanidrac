import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const retniSans = localFont({
  src: [
    {
      path: "../retni-sans/RetniSans-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../retni-sans/RetniSans-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../retni-sans/RetniSans-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../retni-sans/RetniSans-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../retni-sans/RetniSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../retni-sans/RetniSans-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../retni-sans/RetniSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../retni-sans/RetniSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../retni-sans/RetniSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../retni-sans/RetniSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../retni-sans/RetniSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../retni-sans/RetniSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../retni-sans/RetniSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../retni-sans/RetniSans-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-retni-sans",
});

const gaisyr = localFont({
  src: [
    {
      path: "../Gaisyr Font Family/ABCGaisyr-Light-Trial.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../Gaisyr Font Family/ABCGaisyr-LightItalic-Trial.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../Gaisyr Font Family/ABCGaisyr-Book-Trial.otf",
      weight: "350",
      style: "normal",
    },
    {
      path: "../Gaisyr Font Family/ABCGaisyr-BookItalic-Trial.otf",
      weight: "350",
      style: "italic",
    },
    {
      path: "../Gaisyr Font Family/ABCGaisyr-Regular-Trial.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../Gaisyr Font Family/ABCGaisyr-RegularItalic-Trial.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../Gaisyr Font Family/ABCGaisyr-Medium-Trial.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../Gaisyr Font Family/ABCGaisyr-MediumItalic-Trial.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../Gaisyr Font Family/ABCGaisyr-Bold-Trial.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../Gaisyr Font Family/ABCGaisyr-BoldItalic-Trial.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../Gaisyr Font Family/ABCGaisyr-Black-Trial.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../Gaisyr Font Family/ABCGaisyr-BlackItalic-Trial.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-gaisyr",
});

export const metadata: Metadata = {
  title: "Lanidrac - Next-Gen Document Processing",
  description: "Structure-preserving document intelligence powered by advanced OCR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${retniSans.variable} ${gaisyr.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

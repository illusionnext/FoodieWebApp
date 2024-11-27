import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import MainHeader from "@/components/SSG-ServerSideGeneration/main-header/main-header";
import { getAMeal } from "@/lib/get-meals";
import { Meal } from "@/types/types";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Foodie Web App",
  description: "Discover delicious food from around the world",
  keywords: ["food", "recipes", "delicious", "global cuisine"],
  authors: [{ name: "Farid", url: "https://github.com/illusionnext" }],
  creator: "Illusion Foods",
  openGraph: {
    title: "Foodies Web App",
    description: "Discover delicious food from around the world",
    url: "https://foodieswebapp.com", //The canonical URL of the page.
    type: "website",
    images: [
      {
        url: "https://foodieswebapp.com/og-image.jpg",
        width: 800,
        height: 600,
        alt: "A delicious spread of world cuisines",
      },
    ], //The primary image displayed when shared on social media.
  }, //Adds Open Graph metadata for rich link previews.
  twitter: {
    card: "summary_large_image", //Sets the card type, like summary or summary_large_image
    title: "Foodies Web App",
    description: "Explore a world of flavor",
    images: ["https://foodieswebapp.com/twitter-image.jpg"],
    creator: "@yourtwitterhandle", //Specifies the Twitter handle of the content creator.
  },
};

// This is for dynamic metadata
export async function genericMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<{
  title: string;
  description: string;
  keywords: string[];
  authors: { name: string; url: string }[];
  creator: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: string;
    images: { url: string; width: number; height: number; alt: string }[];
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
    creator: string;
  };
}> {
  const { slug } = await params;
  const meal: Meal | null = await getAMeal(slug);
  if (!meal) {
    throw new Error("Meal not found");
  }
  const { title, image, summary, creator, creator_email } = meal;

  return {
    title: title,
    description: summary,
    keywords: ["food", "recipes", "delicious", "global cuisine"],
    authors: [{ name: creator, url: creator_email }],
    creator: creator,
    openGraph: {
      title: title,
      description: summary,
      url: "https://foodieswebapp.com",
      type: "website",
      images: [{ url: image, width: 800, height: 600, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: summary,
      images: [image],
      creator: creator_email,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-us">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        <MainHeader />
        {children}
      </body>
    </html>
  );
}

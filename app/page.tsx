import React from "react";
import Head from "next/head";

// Importing placeholders for the identified components as per your output
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Featured } from "@/components/Featured";
import FloatingButton from "@/components/FloatingButton";

const Page = () => {
  return (
    <>
      {/* Metadata for SEO */}
      <Head>
        <title>Mark Eisenberg</title>
        <meta name="description" content="A digital portfolio for an avid UXer" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
          type="image/x-icon"
          sizes="16x16"
        />
      </Head>

      {/* Main Layout */}
      <div className="relative z-10">
        <main>
          <Hero />
          <Skills />
          <Featured />
          <Contact />
        </main>
        <Footer />
        <FloatingButton />
      </div>
    </>
  );
};

export default Page;
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/layout/nav";
import { SiteFooter } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats";
import { Cases } from "@/components/sections/cases";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why";
import { LiveDiary } from "@/components/sections/diary";
import { Roi } from "@/components/sections/roi";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/cta";
import { BookDialog } from "@/components/sections/book-dialog";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [book, setBook] = useState(false);

  return (
    <div className="relative min-h-svh overflow-x-clip bg-bg text-fg">
      <div className="grain" aria-hidden="true" />
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-stone focus:px-3 focus:py-2 focus:text-stone-fg"
      >
        Skip to work
      </a>
      <SiteNav onBook={() => setBook(true)} />
      <main>
        <Hero onBook={() => setBook(true)} />
        <StatsBar />
        <Cases />
        <Services />
        <WhyUs />
        <LiveDiary />
        <Roi />
        <Testimonials />
        <Pricing onBook={() => setBook(true)} />
        <Faq />
        <FinalCta onBook={() => setBook(true)} />
      </main>
      <SiteFooter />
      <BookDialog open={book} onOpenChange={setBook} />
    </div>
  );
}

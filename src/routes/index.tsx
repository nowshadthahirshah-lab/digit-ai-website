import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/layout/nav";
import { SiteFooter } from "@/components/layout/footer";
import { CursorGlow } from "@/components/motion/cursor-glow";
import { Hero } from "@/components/sections/hero";
import { Capabilities } from "@/components/sections/capabilities";
import { Solutions } from "@/components/sections/solutions";
import { Pipeline } from "@/components/sections/pipeline";
import { Industries } from "@/components/sections/industries";
import { LiveDiary } from "@/components/sections/diary";
import { Results } from "@/components/sections/results";
import { Scenarios } from "@/components/sections/scenarios";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/cta";
import { BookDialog } from "@/components/sections/book-dialog";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [book, setBook] = useState(false);
  const openBook = () => setBook(true);

  return (
    <div className="relative min-h-svh overflow-x-clip bg-bg text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-stone focus:px-3 focus:py-2 focus:text-stone-fg"
      >
        Skip to content
      </a>
      <CursorGlow />
      <SiteNav onBook={openBook} />
      <main id="main">
        <Hero onBook={openBook} />
        <Capabilities />
        <Solutions />
        <Pipeline />
        <Industries />
        <LiveDiary />
        <Results />
        <Scenarios />
        <Pricing onBook={openBook} />
        <Faq />
        <FinalCta onBook={openBook} />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
      <BookDialog open={book} onOpenChange={setBook} />
    </div>
  );
}

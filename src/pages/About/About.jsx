import React from "react";
import AboutHero from "./AboutHero/AboutHero";
import StatsSection from "./Stats/StatsSection";
import styles from "./About.module.css";
import PrinciplesSection from "./PrinciplesSection/PrinciplesSection";
import TeamSection from "./TeamSection/TeamSection";
import CtaSection from "./CtaSection/CtaSection";
export default function About() {
  return (
    <main className={styles.aboutPage}>
      <AboutHero />
      <StatsSection />
      <PrinciplesSection />
      <TeamSection />
      <CtaSection />
 
    </main>
  );
}
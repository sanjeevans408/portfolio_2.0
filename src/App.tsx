import { Suspense } from "react";
import MainLayout from "./layouts/MainLayout";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Skills from "./components/skills/Skills";
import Projects from "./components/projects/Projects";
import Experience from "./components/experience/Experience";
import Certificates from "./components/certificates/Certificates";
import Achievements from "./components/achievements/Achievements";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import PortfolioAgent from "./components/assistant/PortfolioAgent";
import Loader from "./components/common/Loader";
import AnimatedSection from "./components/common/AnimatedSection";
import { useDynamicColors } from "./utils/useDynamicColors";

function App() {
  useDynamicColors();

  return (
    <Suspense fallback={<Loader />}>
      <MainLayout>
        <AnimatedSection><Hero /></AnimatedSection>
        <AnimatedSection><About /></AnimatedSection>
        <AnimatedSection><Skills /></AnimatedSection>
        <AnimatedSection><Projects /></AnimatedSection>
        <AnimatedSection><Experience /></AnimatedSection>
        <AnimatedSection><Achievements /></AnimatedSection>
        <AnimatedSection><Certificates /></AnimatedSection>
        <AnimatedSection><Services /></AnimatedSection>
        <AnimatedSection><Contact /></AnimatedSection>
      </MainLayout>
      <PortfolioAgent />
    </Suspense>
  );
}

export default App;

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Treatments from "@/components/Treatments";
import Doctors from "@/components/Doctors";
import About from "@/components/About";
import Results from "@/components/Results";
import Testimonials from "@/components/Testimonials";
import Instagram from "@/components/Instagram";
import Booking from "@/components/Booking";
import CTA from "@/components/CTA";
import ChatBot from "@/components/ChatBot";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Treatments />
        <Doctors />
        <About />
        <Results />
        <Instagram />
        <Testimonials />
        <Booking />
        <CTA />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}

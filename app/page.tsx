import AnnouncementBanner from "@/components/landing/AnnouncementBanner";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import UseCases from '../components/landing/UseCases';
import Verticals from '../components/landing/Verticals';
import Security from '../components/landing/Security';
import GetToKnow from '../components/landing/GetToKnow';
import AboutUs from '../components/landing/AboutUs';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#EDEBEB]">
      <AnnouncementBanner />
      <Navbar />
      <Hero />
      <UseCases />
      <Verticals />
      <Security />
      <GetToKnow />
      <AboutUs />
      <Footer />
    </div>
  );
}

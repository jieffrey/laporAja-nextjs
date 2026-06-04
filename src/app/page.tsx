"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "@/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsBar from "@/components/landing/StatsBar";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HitSection";
import MapSection from "@/components/landing/MapSection";
import LeaderboardSection from "@/components/landing/LeaderboardSection";
import TechStackSection from "@/components/landing/TechStackSection";
import CTASection from "@/components/landing/CTAsection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true, // animasi cuma sekali
      offset: 100, // trigger 100px sebelum element masuk viewport
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorksSection />
      <MapSection />
      <LeaderboardSection />
      <TechStackSection />
      <CTASection />
      <Footer />
    </div>
  );
}
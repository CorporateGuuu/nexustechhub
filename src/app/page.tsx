'use client';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import HeroSlider from '../components/HeroSlider';
import QualityTechSection from '../components/QualityTechSection';
import FeaturePills from '../components/FeaturePills';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      <HeroSlider />
      <QualityTechSection />
      <FeaturePills />
      <Footer />
    </div>
  );
}

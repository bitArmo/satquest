import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorks from '@/components/landing/HowItWorks';
import CallToAction from '@/components/landing/CallToAction';
import Footer from '@/components/landing/Footer';
import NavBar from '@/components/landing/NavBar';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </main>
  );
}

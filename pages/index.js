import Layout from '../nexus-techhub-fresh/components/Layout/Layout';
import Hero from '../nexus-techhub-fresh/components/Hero/Hero';
import WhatsAppButton from '../nexus-techhub-fresh/components/WhatsApp/WhatsAppButton';

export default function Home() {
  return (
    <Layout 
      title="Nexus TechHub - Professional Mobile Repair Parts UAE"
      description="Professional mobile device repair parts and services in UAE. Specializing in iPhone, Samsung, and iPad replacement parts with quality guarantee. Located in Ras Al Khaimah."
    >
      <Hero />
      <WhatsAppButton />
    </Layout>
  );
}

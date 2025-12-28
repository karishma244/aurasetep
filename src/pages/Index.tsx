import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";
import PromoSection from "@/components/PromoSection";
import TestimonialsSection from "@/components/TestimonialsSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>AuraStep - Premium Footwear for Modern Living</title>
        <meta name="description" content="Discover premium shoes designed for comfort, style, and performance. Shop men's, women's, sports, and casual footwear at AuraStep." />
      </Helmet>
      
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CategorySection />
        <PromoSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;

import { Link } from "react-router-dom";
import { ArrowRight, Truck, RefreshCw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-shoes.jpg";

const features = [
  { icon: Truck, text: "Free Shipping Over ₹2,499" },
  { icon: RefreshCw, text: "Easy 30-Day Returns" },
  { icon: Shield, text: "Secure Payments" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="AuraStep Premium Footwear"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <div className="opacity-0 animate-slide-up">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              New Collection 2024
            </span>
          </div>
          
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none mb-6 opacity-0 animate-slide-up stagger-1">
            ELEVATE YOUR
            <br />
            <span className="text-gradient-accent">EVERY STEP</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mb-8 opacity-0 animate-slide-up stagger-2">
            Discover premium footwear designed for comfort, style, and performance. 
            Walk with confidence, run with power.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-slide-up stagger-3">
            <Link to="/shop">
              <Button variant="heroAccent" size="xl" className="gap-2 group">
                Shop Now
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/shop?new=true">
              <Button variant="heroOutline" size="xl">
                View New Arrivals
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-6 mt-12 pt-12 border-t border-border/50 opacity-0 animate-slide-up stagger-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in stagger-5">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
}

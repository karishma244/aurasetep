import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PromoSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl hero-gradient p-8 sm:p-12 lg:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full mb-6">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-accent text-sm font-medium">Limited Time Offer</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground mb-4">
                NEW YEAR SALE
              </h2>
              <p className="text-primary-foreground/70 text-lg max-w-md mb-2">
                Get up to 40% off on selected styles. Use code:
              </p>
              <p className="font-display text-3xl text-accent mb-6">AURA2024</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="text-center">
                <p className="text-primary-foreground/70 text-sm mb-2">Offer ends in</p>
                <div className="flex gap-3">
                  {[
                    { value: "05", label: "Days" },
                    { value: "12", label: "Hours" },
                    { value: "34", label: "Mins" },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="h-16 w-16 rounded-lg bg-primary-foreground/10 flex items-center justify-center mb-1">
                        <span className="font-display text-2xl text-primary-foreground">
                          {item.value}
                        </span>
                      </div>
                      <span className="text-xs text-primary-foreground/50">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Link to="/shop?sale=true">
                <Button variant="accent" size="xl" className="gap-2 group mt-4">
                  Shop Sale
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Target, Award, Users, Leaf, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-shoes.jpg";

const values = [
  {
    icon: Target,
    title: "Performance Driven",
    description: "Every shoe is engineered for maximum comfort and durability, tested by athletes.",
  },
  {
    icon: Award,
    title: "Quality First",
    description: "Premium materials and meticulous craftsmanship in every pair we create.",
  },
  {
    icon: Users,
    title: "Customer Focused",
    description: "30-day returns, 1-year warranty, and dedicated support for every customer.",
  },
  {
    icon: Leaf,
    title: "Sustainable Future",
    description: "Committed to eco-friendly materials and responsible manufacturing practices.",
  },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "100+", label: "Shoe Styles" },
  { value: "4.8", label: "Average Rating" },
  { value: "15+", label: "Cities Served" },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | AuraStep - Premium Footwear Brand</title>
        <meta name="description" content="Learn about AuraStep's mission to create premium, comfortable, and stylish footwear for the modern generation." />
      </Helmet>

      <Navbar />
      
      <main className="pt-16 min-h-screen bg-background">
        {/* Hero */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="About AuraStep"
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link to="/" className="hover:text-foreground transition-smooth">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">About Us</span>
            </nav>

            <div className="max-w-3xl">
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mt-4 mb-6">
                STEPPING INTO THE FUTURE
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                AuraStep was born from a simple belief: everyone deserves footwear that combines exceptional comfort, 
                timeless style, and accessible pricing. We're on a mission to elevate every step you take.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 lg:py-24 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="text-accent font-medium text-sm uppercase tracking-wider">
                  Our Mission
                </span>
                <h2 className="font-display text-4xl sm:text-5xl mt-4 mb-6">
                  COMFORT MEETS STYLE
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  We believe that comfort shouldn't come at the expense of style, and great design shouldn't 
                  break the bank. That's why we've dedicated ourselves to creating footwear that excels in all three areas.
                </p>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  From urban streets to morning jogs, from campus walks to office commutes, AuraStep is designed 
                  for the dynamic lifestyle of India's young generation.
                </p>
                <Link to="/shop">
                  <Button variant="heroAccent" size="lg">
                    Explore Our Collection
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-2xl p-8 text-center shadow-soft"
                  >
                    <p className="font-display text-4xl text-accent mb-2">{stat.value}</p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                What Drives Us
              </span>
              <h2 className="font-display text-4xl sm:text-5xl mt-4">OUR VALUES</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-8 bg-card rounded-2xl border border-border hover:border-accent transition-smooth group"
                >
                  <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent transition-smooth">
                    <value.icon className="h-7 w-7 text-accent group-hover:text-accent-foreground transition-smooth" />
                  </div>
                  <h3 className="font-display text-xl mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="hero-gradient rounded-3xl p-12 lg:p-16 text-center">
              <h2 className="font-display text-4xl sm:text-5xl text-primary-foreground mb-6">
                READY TO TAKE THE FIRST STEP?
              </h2>
              <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-8">
                Join thousands of happy customers who have already discovered the AuraStep difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/shop">
                  <Button variant="accent" size="xl">
                    Shop Now
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="xl" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

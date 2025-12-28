import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The most comfortable shoes I've ever worn! The Cloud Runner lives up to its name. Perfect for my daily runs.",
    product: "Cloud Runner",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Delhi",
    rating: 5,
    text: "Stylish and durable. I've been wearing my Urban Classics daily for 6 months and they still look brand new.",
    product: "Urban Classic",
  },
  {
    id: 3,
    name: "Ananya Patel",
    location: "Bangalore",
    rating: 5,
    text: "Fast delivery and amazing quality. The Comfort Wave is now my go-to shoe for both work and weekends.",
    product: "Comfort Wave",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">
            Customer Love
          </span>
          <h2 className="font-display text-4xl sm:text-5xl mt-2">WHAT THEY SAY</h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative bg-card rounded-2xl p-8 shadow-soft opacity-0 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <Quote className="h-10 w-10 text-accent/20 mb-4" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
                <span className="text-xs text-accent font-medium px-3 py-1 bg-accent/10 rounded-full">
                  {testimonial.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

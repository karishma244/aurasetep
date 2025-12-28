import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";

const categories = [
  {
    id: "men",
    name: "Men",
    description: "Bold styles for the modern man",
    image: product4,
    count: 24,
  },
  {
    id: "women",
    name: "Women",
    description: "Elegant comfort for every occasion",
    image: product1,
    count: 31,
  },
  {
    id: "sports",
    name: "Sports",
    description: "Performance-driven athletic wear",
    image: product2,
    count: 18,
  },
  {
    id: "casual",
    name: "Casual",
    description: "Everyday comfort meets style",
    image: product5,
    count: 27,
  },
];

export default function CategorySection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">
            Explore Collections
          </span>
          <h2 className="font-display text-4xl sm:text-5xl mt-2">SHOP BY CATEGORY</h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl opacity-0 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-smooth group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-background mb-1">
                      {category.name}
                    </h3>
                    <p className="text-background/70 text-sm">
                      {category.count} products
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center group-hover:bg-accent transition-smooth">
                    <ArrowUpRight className="h-5 w-5 text-foreground group-hover:text-accent-foreground transition-smooth" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/products";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative">
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-smooth group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-accent text-accent-foreground">New</Badge>
            )}
            {product.isBestseller && (
              <Badge className="bg-foreground text-background">Bestseller</Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground">-{discount}%</Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-smooth">
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full shadow-soft"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Add */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-smooth">
            <Button variant="dark" className="w-full gap-2">
              <ShoppingBag className="h-4 w-4" />
              Quick Add
            </Button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-4 space-y-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-foreground hover:text-accent transition-smooth line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2">
          <span className="font-semibold">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Colors */}
        <div className="flex items-center gap-1 pt-1">
          {product.colors.slice(0, 3).map((color, index) => (
            <span
              key={index}
              className="text-xs text-muted-foreground"
            >
              {color}{index < Math.min(product.colors.length, 3) - 1 ? "," : ""}
            </span>
          ))}
          {product.colors.length > 3 && (
            <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
}

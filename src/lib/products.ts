import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "men" | "women" | "sports" | "casual";
  colors: string[];
  sizes: number[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "AuraStep Cloud Runner",
    price: 129.99,
    originalPrice: 159.99,
    image: product1,
    category: "sports",
    colors: ["White", "Gray", "Black"],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.8,
    reviews: 234,
    isNew: true,
    description: "Ultra-lightweight running shoes with cloud-like cushioning for maximum comfort on every stride.",
  },
  {
    id: "2",
    name: "AuraStep Blaze X",
    price: 149.99,
    image: product2,
    category: "sports",
    colors: ["Black/Orange", "Black/Blue", "Gray/Red"],
    sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.9,
    reviews: 412,
    isBestseller: true,
    description: "High-performance athletic shoes designed for intense training and maximum energy return.",
  },
  {
    id: "3",
    name: "AuraStep Comfort Wave",
    price: 89.99,
    originalPrice: 109.99,
    image: product3,
    category: "women",
    colors: ["Cream", "Blush", "White"],
    sizes: [5, 6, 7, 8, 9, 10],
    rating: 4.7,
    reviews: 189,
    description: "Elegant everyday sneakers combining style and all-day comfort for the modern woman.",
  },
  {
    id: "4",
    name: "AuraStep Urban Classic",
    price: 99.99,
    image: product4,
    category: "men",
    colors: ["Navy", "Black", "Olive"],
    sizes: [7, 8, 9, 10, 11, 12, 13],
    rating: 4.6,
    reviews: 156,
    description: "Timeless casual sneakers with premium materials for effortless street style.",
  },
  {
    id: "5",
    name: "AuraStep Shadow Elite",
    price: 169.99,
    image: product5,
    category: "casual",
    colors: ["Black", "Charcoal"],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.9,
    reviews: 287,
    isBestseller: true,
    description: "Bold chunky sneakers with premium construction for those who dare to stand out.",
  },
  {
    id: "6",
    name: "AuraStep Breeze Lite",
    price: 119.99,
    originalPrice: 139.99,
    image: product6,
    category: "women",
    colors: ["Mint", "Coral", "Lavender"],
    sizes: [5, 6, 7, 8, 9, 10],
    rating: 4.8,
    reviews: 203,
    isNew: true,
    description: "Breathable running shoes with responsive cushioning for the active lifestyle.",
  },
];

export const categories = [
  { id: "men", name: "Men", count: 24 },
  { id: "women", name: "Women", count: 31 },
  { id: "sports", name: "Sports", count: 18 },
  { id: "casual", name: "Casual", count: 27 },
];

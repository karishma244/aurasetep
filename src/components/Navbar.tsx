import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ShoppingBag, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Men", href: "/shop?category=men" },
  { name: "Women", href: "/shop?category=women" },
  { name: "Sports", href: "/shop?category=sports" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href.split("?")[0]);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl tracking-wider">AURASTEP</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-smooth underline-animation ${
                  isActive(item.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden sm:flex"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="py-4 border-t border-border animate-slide-down">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for shoes..."
                className="w-full h-12 pl-12 pr-4 bg-secondary rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-accent font-body"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-down">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-smooth ${
                    isActive(item.href)
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center gap-4 px-4 pt-4 mt-2 border-t border-border">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

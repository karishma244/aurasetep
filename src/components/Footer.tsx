import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  shop: [
    { name: "Men's Collection", href: "/shop?category=men" },
    { name: "Women's Collection", href: "/shop?category=women" },
    { name: "Sports", href: "/shop?category=sports" },
    { name: "Casual", href: "/shop?category=casual" },
    { name: "New Arrivals", href: "/shop?new=true" },
    { name: "Sale", href: "/shop?sale=true" },
  ],
  support: [
    { name: "Size Guide", href: "/size-guide" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns & Exchanges", href: "/returns" },
    { name: "Track Order", href: "/track-order" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact Us", href: "/contact" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Press", href: "/press" },
    { name: "Partners", href: "/partners" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Youtube", icon: Youtube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl mb-2">JOIN THE AURASTEP FAMILY</h3>
              <p className="text-primary-foreground/70">
                Subscribe for exclusive offers, new arrivals, and more.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 h-12 px-4 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent font-body"
              />
              <Button variant="accent" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display text-3xl tracking-wider">AURASTEP</span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Elevate your every step with premium footwear designed for comfort, style, and performance.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-smooth"
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display text-lg mb-4 tracking-wider">SHOP</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-smooth text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg mb-4 tracking-wider">SUPPORT</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-smooth text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-4 tracking-wider">CONTACT</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  123 Fashion Street, Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/70 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/70 text-sm">hello@aurastep.in</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
            <p>© 2024 AuraStep. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-primary-foreground transition-smooth">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary-foreground transition-smooth">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

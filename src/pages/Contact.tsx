import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["123 Fashion Street", "Mumbai, Maharashtra 400001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 98765 43210", "+91 98765 43211"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["hello@aurastep.in", "support@aurastep.in"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon - Sat: 10 AM - 8 PM", "Sunday: 11 AM - 6 PM"],
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | AuraStep</title>
        <meta name="description" content="Get in touch with AuraStep. We're here to help with orders, returns, and any questions about our footwear." />
      </Helmet>

      <Navbar />
      
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-smooth">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Contact</span>
          </nav>

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Get In Touch
            </span>
            <h1 className="font-display text-5xl sm:text-6xl mt-4 mb-6">
              WE'D LOVE TO HEAR FROM YOU
            </h1>
            <p className="text-muted-foreground text-lg">
              Have a question about our products, orders, or returns? Our team is here to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-card rounded-xl border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">{item.title}</h3>
                      {item.lines.map((line, i) => (
                        <p key={i} className="text-muted-foreground text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-2xl border border-border p-8"
              >
                <h2 className="font-display text-2xl mb-6">SEND US A MESSAGE</h2>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-12 px-4 bg-secondary rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-12 px-4 bg-secondary rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-12 px-4 bg-secondary rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-12 px-4 bg-secondary rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button variant="heroAccent" size="lg" type="submit" className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type OrderItem = {
  product: { id: string; name: string; image?: string; price: number };
  quantity: number;
  size?: string | number;
  color?: string;
};

type Order = {
  id: string;
  placedAt: string; // ISO
  items: OrderItem[];
  shipping: {
    fullName: string;
    phone?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  subtotal: number;
  shippingCost: number;
  discount?: number;
  trackingId?: string;
  deliveryPartner?: { name?: string; phone?: string };
  status?: string;
};

function formatCurrency(n = 0) {
  return `₹${n.toLocaleString()}`;
}

export default function OrderTracker() {
  const [order, setOrder] = useState<Order | null>(null);
  const [now] = useState(() => new Date());

  useEffect(() => {
    try {
      const raw = localStorage.getItem("lastOrder");
      if (raw) setOrder(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const loadExample = () => {
    const example: Order = {
      id: "ASORD-20251228-001",
      placedAt: new Date().toISOString(),
      items: [
        { product: { id: "p1", name: "AuraStep Pro Runner - Black Edition", price: 2999, image: "/assets/shoe-1.jpg" }, quantity: 1, size: "9" },
        { product: { id: "p2", name: "Urban Comfort Sneakers - White", price: 2999, image: "/assets/shoe-2.jpg" }, quantity: 1, size: "9" },
      ],
      shipping: {
        fullName: "Rajesh Kumar",
        phone: "+91 98765 43210",
        address1: "Flat 301, Green Valley Apartments",
        address2: "Sector 15, Rohini",
        city: "New Delhi",
        state: "DL",
        pincode: "110085",
      },
      subtotal: 5998,
      shippingCost: 0,
      discount: 0,
      trackingId: "SHIP20251228001",
      deliveryPartner: { name: "Amit Sharma", phone: "+91 88888 12345" },
      status: "Out for Delivery",
    };
    localStorage.setItem("lastOrder", JSON.stringify(example));
    setOrder(example);
  };

  const timeline = (placedAtISO?: string) => {
    const placed = placedAtISO ? new Date(placedAtISO) : new Date();
    const steps = [
      { key: "confirmed", label: "Order Confirmed", offset: 0 },
      { key: "processing", label: "Processing", offset: 1 },
      { key: "shipped", label: "Shipped", offset: 2 },
      { key: "out", label: "Out for Delivery", offset: 3 },
      { key: "delivered", label: "Delivered", offset: 4 },
    ];
    return steps.map((s) => {
      const d = new Date(placed);
      d.setDate(placed.getDate() + s.offset);
      return { ...s, date: d };
    });
  };

  const computeStatusIndex = (status?: string) => {
    if (!status) return 0;
    const order = ["Order Confirmed", "Processing", "Shipped", "Out for Delivery", "Delivered"];
    const idx = order.findIndex((o) => o.toLowerCase() === (status || "").toLowerCase());
    return idx === -1 ? 0 : idx;
  };

  const statusIndex = computeStatusIndex(order?.status);

  return (
    <>
      <Helmet>
        <title>Track Your Order | AuraStep</title>
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-lg font-display">Track Your Order</h1>
                  <div className="text-sm text-muted-foreground">Last checked: {now.toLocaleString()}</div>
                </div>

                {!order && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">No recent order found in this browser. You can load an example order to preview the tracker.</p>
                    <div className="flex gap-2">
                      <Button variant="default" onClick={loadExample}>Load Example Order</Button>
                      <Link to="/checkout">
                        <Button variant="ghost">Go to Checkout</Button>
                      </Link>
                    </div>
                  </div>
                )}

                {order && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="flex items-start gap-4 mb-6">
                        <div>
                          <div className="text-xs text-muted-foreground">Order ID</div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-xs text-muted-foreground">Placed on {new Date(order.placedAt).toLocaleString()}</div>
                        </div>
                        <div className="ml-auto text-right">
                          <div className="text-xs text-muted-foreground">Tracking</div>
                          <div className="font-medium">{order.trackingId || '—'}</div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-medium mb-2">Order Status Timeline</h3>
                        <div className="space-y-4">
                          {timeline(order.placedAt).map((t, i) => (
                            <div key={t.key} className="flex items-center gap-4">
                              <div className={`h-10 w-10 flex items-center justify-center rounded-full ${i <= statusIndex ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}>{i + 1}</div>
                              <div>
                                <div className="font-medium">{t.label}</div>
                                <div className="text-xs text-muted-foreground">{t.date.toLocaleDateString()} • {t.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Order Details</h3>
                        <div className="space-y-3">
                          {order.items.map((it) => (
                            <div key={it.product.id} className="flex items-center gap-3">
                              <div className="h-16 w-16 rounded-lg overflow-hidden bg-secondary flex items-center justify-center">
                                {it.product.image ? <img src={it.product.image} alt={it.product.name} className="h-full w-full object-cover" /> : <div className="text-xs">No image</div>}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{it.product.name}</div>
                                <div className="text-xs text-muted-foreground">Size: {it.size} • Qty: {it.quantity}</div>
                              </div>
                              <div className="font-medium">{formatCurrency(it.product.price * it.quantity)}</div>
                            </div>
                          ))}

                          <div className="border-t border-border pt-3">
                            <div className="flex justify-between text-sm">
                              <span>Subtotal</span>
                              <span>{formatCurrency(order.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-1">
                              <span>Delivery Charges</span>
                              <span>{order.shippingCost === 0 ? 'FREE' : formatCurrency(order.shippingCost)}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-1">
                              <span>Discount</span>
                              <span className="text-accent">-{formatCurrency(order.discount || 0)}</span>
                            </div>
                            <div className="flex justify-between text-base mt-3">
                              <span className="font-medium">Total</span>
                              <span className="font-display text-xl">{formatCurrency((order.subtotal || 0) + (order.shippingCost || 0) - (order.discount || 0))}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <aside className="space-y-4">
                      <div className="bg-secondary rounded-lg p-4">
                        <div className="text-xs text-muted-foreground">Delivery Information</div>
                        <div className="font-medium mt-1">{order.shipping.fullName}</div>
                        <div className="text-sm">{order.shipping.address1}</div>
                        <div className="text-sm">{order.shipping.address2}</div>
                        <div className="text-sm">{order.shipping.city}, {order.shipping.state} {order.shipping.pincode}</div>
                        <div className="text-xs text-muted-foreground mt-2">Contact: {order.shipping.phone}</div>
                      </div>

                      <div className="bg-card rounded-lg p-4 border border-border">
                        <div className="text-xs text-muted-foreground">Delivery Partner</div>
                        <div className="font-medium">{order.deliveryPartner?.name || '—'}</div>
                        <div className="text-sm">{order.deliveryPartner?.phone || '—'}</div>
                        <div className="mt-3 flex gap-2">
                          <Button variant="default">Call Delivery Partner</Button>
                          <Button variant="ghost">Send Message</Button>
                        </div>
                      </div>

                      <div className="bg-card rounded-lg p-4 border border-border">
                        <div className="text-xs text-muted-foreground">Live Tracking</div>
                        <div className="h-40 bg-secondary rounded-md flex items-center justify-center text-sm text-muted-foreground">Map preview unavailable in dev — placeholder</div>
                      </div>
                    </aside>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-medium mb-3">Need Help?</h3>
                <div className="text-sm text-muted-foreground mb-4">Contact customer support for questions about delivery, returns, or cancellations.</div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline">Chat with Support</Button>
                  <Button variant="default">Call Support: 1800-123-456</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

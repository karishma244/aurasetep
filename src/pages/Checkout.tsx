import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

type ShippingForm = {
  fullName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
};

export default function Checkout() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const shippingCost = totalPrice >= 2499 ? 0 : 99;
  const finalTotal = totalPrice + shippingCost - 500; // example discount

  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState<ShippingForm>({
    fullName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [method, setMethod] = useState<string>("card");
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvv: "" });

  useEffect(() => {}, []);

  const validateShipping = () => {
    if (
      !shipping.fullName ||
      !shipping.email ||
      !shipping.phone ||
      !shipping.address1 ||
      !shipping.city ||
      !shipping.state ||
      !shipping.pincode
    )
      return false;
    return true;
  };

  const goToPayment = () => {
    if (!validateShipping()) {
      alert("Please fill all required shipping fields.");
      return;
    }
    setStep(1);
  };

  const handlePay = async () => {
    setLoading(true);
    try {
      const server = (import.meta as any).env.VITE_PAYMENT_SERVER_URL || "http://localhost:4242";
      const res = await fetch(`${server}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalTotal, items, shipping }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create order");

      if (data.simulateUrl) {
        const popup = window.open(data.simulateUrl, "payment_simulator", "width=520,height=720");

        const handleMessage = (ev: MessageEvent) => {
          if (ev.data && ev.data.type === "SIMULATED_PAYMENT" && ev.data.status === "paid" && ev.data.orderId === data.id) {
            clearCart();
            window.removeEventListener("message", handleMessage);
            if (popup && !popup.closed) popup.close();
            setStep(2);
          }
        };

        window.addEventListener("message", handleMessage);
      } else {
        throw new Error("No simulate URL returned");
      }
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Secure Checkout | AuraStep</title>
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-display text-xl mb-4 flex items-center gap-2">🔒 Secure Checkout</h2>

                <div className="flex items-center gap-6 mb-6">
                  <div className={`px-4 py-2 rounded-full ${step === 0 ? "bg-accent text-accent-foreground" : "bg-secondary"}`}>Shipping</div>
                  <div className={`px-4 py-2 rounded-full ${step === 1 ? "bg-accent text-accent-foreground" : "bg-secondary"}`}>Payment</div>
                  <div className={`px-4 py-2 rounded-full ${step === 2 ? "bg-accent text-accent-foreground" : "bg-secondary"}`}>Review</div>
                </div>

                <div className="bg-secondary rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div>
                      <h3 className="font-medium">Continue as Guest</h3>
                      <p className="text-sm text-muted-foreground">You can checkout without creating an account. However, creating an account gives you access to order tracking, faster checkout, and exclusive offers.</p>
                    </div>
                  </div>
                </div>

                {step === 0 && (
                  <div>
                    <h3 className="font-medium mb-4">Shipping Address</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">Full Name *</label>
                        <input value={shipping.fullName} onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })} placeholder="Enter your full name" className="mt-1 block w-full h-10 px-3 rounded-lg border border-border bg-card" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Email Address *</label>
                        <input value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} placeholder="your.email@example.com" className="mt-1 block w-full h-10 px-3 rounded-lg border border-border bg-card" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Phone Number *</label>
                        <div className="flex gap-2">
                          <div className="inline-flex items-center px-3 rounded-l-lg bg-secondary border border-border">+91</div>
                          <input value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} placeholder="9876543210" className="mt-1 block w-full h-10 px-3 rounded-r-lg border border-border bg-card" />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium">Address Line 1 *</label>
                        <input value={shipping.address1} onChange={(e) => setShipping({ ...shipping, address1: e.target.value })} placeholder="House/Flat No., Building Name" className="mt-1 block w-full h-10 px-3 rounded-lg border border-border bg-card" />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium">Address Line 2</label>
                        <input value={shipping.address2} onChange={(e) => setShipping({ ...shipping, address2: e.target.value })} placeholder="Street, Locality, Landmark (Optional)" className="mt-1 block w-full h-10 px-3 rounded-lg border border-border bg-card" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">City *</label>
                        <input value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} placeholder="City" className="mt-1 block w-full h-10 px-3 rounded-lg border border-border bg-card" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">State *</label>
                        <select value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} className="mt-1 block w-full h-10 px-3 rounded-lg border border-border bg-card">
                          <option value="">Select State</option>
                          <option>MH</option>
                          <option>KA</option>
                          <option>DL</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Pincode *</label>
                        <input value={shipping.pincode} onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })} placeholder="400001" className="mt-1 block w-full h-10 px-3 rounded-lg border border-border bg-card" />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">SSL Encrypted • 256-bit security • PCI Compliant</div>
                      <Button variant="heroAccent" onClick={goToPayment}>Continue to Payment →</Button>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h3 className="font-medium mb-4">Payment</h3>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-card rounded-lg border border-border">
                        <label className="flex items-center gap-3">
                          <input type="radio" checked={method === 'card'} onChange={() => setMethod('card')} />
                          <span className="font-medium">Credit / Debit Card</span>
                        </label>

                        {method === 'card' && (
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} placeholder="Card number" className="h-10 px-3 rounded-lg border border-border bg-card" />
                            <input value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} placeholder="Name on card" className="h-10 px-3 rounded-lg border border-border bg-card" />
                            <input value={card.exp} onChange={(e) => setCard({ ...card, exp: e.target.value })} placeholder="MM/YY" className="h-10 px-3 rounded-lg border border-border bg-card" />
                            <input value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} placeholder="CVV" className="h-10 px-3 rounded-lg border border-border bg-card" />
                          </div>
                        )}
                      </div>

                      <div className="p-4 bg-card rounded-lg border border-border">
                        <label className="flex items-center gap-3">
                          <input type="radio" checked={method === 'upi'} onChange={() => setMethod('upi')} />
                          <span className="font-medium">UPI</span>
                        </label>
                        {method === 'upi' && <div className="mt-3 text-sm text-muted-foreground">We'll prompt for UPI ID on next step (simulated).</div>}
                      </div>

                      <div className="p-4 bg-card rounded-lg border border-border">
                        <label className="flex items-center gap-3">
                          <input type="radio" checked={method === 'netbanking'} onChange={() => setMethod('netbanking')} />
                          <span className="font-medium">Net Banking</span>
                        </label>
                        {method === 'netbanking' && <div className="mt-3 text-sm text-muted-foreground">Select your bank on the simulated gateway.</div>}
                      </div>

                      <div className="p-4 bg-card rounded-lg border border-border">
                        <label className="flex items-center gap-3">
                          <input type="radio" checked={method === 'cod'} onChange={() => setMethod('cod')} />
                          <span className="font-medium">Cash on Delivery</span>
                        </label>
                        {method === 'cod' && <div className="mt-3 text-sm text-muted-foreground">Pay with cash when the order is delivered.</div>}
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <Button variant="outline" onClick={() => setStep(0)}>← Edit Shipping</Button>
                        <Button variant="heroAccent" onClick={handlePay} disabled={loading}>{loading ? 'Processing...' : 'Pay Securely'}</Button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="text-center py-8">
                    <h3 className="font-display text-2xl mb-2">Payment Successful</h3>
                    <p className="text-muted-foreground">Thank you — your order has been placed. We've emailed your receipt and order details.</p>
                    <div className="mt-6">
                      <Link to="/">
                        <Button variant="outline">Continue Shopping</Button>
                      </Link>
                    </div>
                  </div>
                )}

                <p className="text-xs text-muted-foreground mt-6">By completing this purchase, you agree to our Terms of Service and Privacy Policy</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="h-fit">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-display text-xl mb-4">Order Summary</h2>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex items-center gap-3">
                      <div className="h-16 w-16 rounded-lg overflow-hidden bg-secondary">
                        <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <div className="text-sm font-medium">{item.product.name}</div>
                            <div className="text-xs text-muted-foreground">Size: UK {item.size} • Color: {item.color}</div>
                          </div>
                          <div className="text-sm font-medium">₹{(item.product.price * item.quantity).toLocaleString()}</div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</div>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>Delivery Charges</span>
                      <span className="font-medium">{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>Discount Applied</span>
                      <span className="text-accent">-₹500</span>
                    </div>

                    <div className="flex justify-between text-base mt-4">
                      <span className="font-medium">Total</span>
                      <span className="font-display text-xl">₹{finalTotal.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>
                  </div>

                  <div className="mt-4">
                    <Link to="/cart">
                      <Button variant="outline" size="sm">Edit Cart</Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-muted-foreground">Free delivery on orders above ₹999</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

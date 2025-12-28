import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  const shippingCost = totalPrice >= 2499 ? 0 : 99;
  const finalTotal = totalPrice + shippingCost;

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart | AuraStep</title>
        </Helmet>

        <Navbar />
        
        <main className="pt-24 pb-16 min-h-screen bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center py-24">
              <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="font-display text-4xl mb-4">YOUR CART IS EMPTY</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link to="/shop">
                <Button variant="heroAccent" size="xl" className="gap-2">
                  Start Shopping
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart ({totalItems} items) | AuraStep</title>
      </Helmet>

      <Navbar />
      
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-display text-4xl sm:text-5xl mb-8">YOUR CART</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4 sm:gap-6 p-4 bg-card rounded-xl border border-border"
                >
                  {/* Image */}
                  <Link to={`/product/${item.product.id}`} className="shrink-0">
                    <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg overflow-hidden bg-secondary">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="font-medium hover:text-accent transition-smooth line-clamp-1">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          Size: UK {item.size} | Color: {item.color}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                        className="text-muted-foreground hover:text-destructive transition-smooth"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="inline-flex items-center border border-border rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                          }
                          className="h-8 w-8 flex items-center justify-center hover:bg-secondary transition-smooth"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                          }
                          className="h-8 w-8 flex items-center justify-center hover:bg-secondary transition-smooth"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-semibold">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-display text-xl mb-6">ORDER SUMMARY</h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                    <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-accent">FREE</span>
                      ) : (
                        `₹${shippingCost}`
                      )}
                    </span>
                  </div>
                  {shippingCost > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add ₹{(2499 - totalPrice).toLocaleString()} more for free shipping
                    </p>
                  )}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-base">
                      <span className="font-medium">Total</span>
                      <span className="font-display text-xl">₹{finalTotal.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Including taxes
                    </p>
                  </div>
                </div>

                {/* Coupon */}
                <div className="mt-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="flex-1 h-10 px-4 bg-secondary rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    />
                    <Button variant="outline" size="sm" className="h-10">
                      Apply
                    </Button>
                  </div>
                </div>

                <Button variant="heroAccent" size="xl" className="w-full mt-6 gap-2">
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5" />
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Secure checkout powered by Razorpay
                </p>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span>🔒 Secure Payment</span>
                <span>•</span>
                <span>📦 Fast Delivery</span>
                <span>•</span>
                <span>↩️ Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

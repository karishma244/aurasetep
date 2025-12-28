import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronDown, SlidersHorizontal, X, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/lib/products";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const priceRanges = [
  { value: "0-100", label: "Under ₹100", min: 0, max: 100 },
  { value: "100-150", label: "₹100 - ₹150", min: 100, max: 150 },
  { value: "150-200", label: "₹150 - ₹200", min: 150, max: 200 },
  { value: "200+", label: "Over ₹200", min: 200, max: Infinity },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const categoryFilter = searchParams.get("category") || "";
  const priceFilter = searchParams.get("price") || "";
  const sortBy = searchParams.get("sort") || "featured";

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const activeFiltersCount = [categoryFilter, priceFilter].filter(Boolean).length;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Price filter
    if (priceFilter) {
      const range = priceRanges.find((r) => r.value === priceFilter);
      if (range) {
        result = result.filter((p) => p.price >= range.min && p.price < range.max);
      }
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [categoryFilter, priceFilter, sortBy]);

  return (
    <>
      <Helmet>
        <title>Shop All Shoes | AuraStep</title>
        <meta name="description" content="Browse our complete collection of premium footwear. Find the perfect shoes for men, women, sports, and casual wear." />
      </Helmet>

      <Navbar />
      
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-smooth">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Shop</span>
            {categoryFilter && (
              <>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground capitalize">{categoryFilter}</span>
              </>
            )}
          </nav>

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl">
                {categoryFilter ? categoryFilter.toUpperCase() : "ALL SHOES"}
              </h1>
              <p className="text-muted-foreground mt-2">
                {filteredProducts.length} products
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Filter Toggle (Mobile) */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

              {/* Sort Dropdown */}
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setSortOpen(!sortOpen)}
                  className="gap-2"
                >
                  {sortOptions.find((o) => o.value === sortBy)?.label || "Sort"}
                  <ChevronDown className={`h-4 w-4 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                </Button>

                {sortOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded-lg shadow-elevated border border-border z-20 animate-slide-down">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          updateFilter("sort", option.value);
                          setSortOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-secondary transition-smooth first:rounded-t-lg last:rounded-b-lg ${
                          sortBy === option.value ? "text-accent font-medium" : ""
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {categoryFilter && (
                <button
                  onClick={() => updateFilter("category", "")}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm hover:bg-secondary/80 transition-smooth"
                >
                  {categoryFilter}
                  <X className="h-3 w-3" />
                </button>
              )}
              {priceFilter && (
                <button
                  onClick={() => updateFilter("price", "")}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm hover:bg-secondary/80 transition-smooth"
                >
                  {priceRanges.find((r) => r.value === priceFilter)?.label}
                  <X className="h-3 w-3" />
                </button>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-accent hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          <div className="flex gap-8">
            {/* Sidebar Filters (Desktop) */}
            <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-64 shrink-0`}>
              <div className="sticky top-24 space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="font-display text-lg mb-4">CATEGORIES</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => updateFilter("category", "")}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-smooth ${
                        !categoryFilter ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => updateFilter("category", cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-smooth flex items-center justify-between ${
                          categoryFilter === cat.id ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat.name}
                        <span className="text-xs">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h3 className="font-display text-lg mb-4">PRICE</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => updateFilter("price", priceFilter === range.value ? "" : range.value)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-smooth ${
                          priceFilter === range.value ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="opacity-0 animate-slide-up"
                      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg mb-4">No products found matching your criteria.</p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

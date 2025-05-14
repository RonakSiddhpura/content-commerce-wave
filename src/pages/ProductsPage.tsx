
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Filter, SlidersHorizontal, Search, ChevronDown, ChevronUp, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";

// Mock data (would be fetched from API)
const allProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    slug: "wireless-headphones",
    category: "Electronics",
    rating: 4.5,
    isNew: true,
    salePrice: null,
  },
  {
    id: 2,
    name: "Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    slug: "cotton-t-shirt",
    category: "Clothing",
    rating: 4.2,
    isNew: false,
    salePrice: 19.99,
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1999&q=80",
    slug: "smart-watch",
    category: "Electronics",
    rating: 4.8,
    isNew: true,
    salePrice: null,
  },
  {
    id: 4,
    name: "Desk Lamp",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    slug: "desk-lamp",
    category: "Home & Garden",
    rating: 4.0,
    isNew: false,
    salePrice: 39.99,
  },
  {
    id: 5,
    name: "Face Moisturizer",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    slug: "face-moisturizer",
    category: "Beauty",
    rating: 4.7,
    isNew: true,
    salePrice: null,
  },
  {
    id: 6,
    name: "Denim Jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    slug: "denim-jacket",
    category: "Clothing",
    rating: 4.4,
    isNew: false,
    salePrice: null,
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    slug: "bluetooth-speaker",
    category: "Electronics",
    rating: 4.3,
    isNew: true,
    salePrice: null,
  },
  {
    id: 8,
    name: "Running Shoes",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    slug: "running-shoes",
    category: "Clothing",
    rating: 4.6,
    isNew: true,
    salePrice: null,
  },
  {
    id: 9,
    name: "Plant Pot",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    slug: "plant-pot",
    category: "Home & Garden",
    rating: 4.1,
    isNew: true,
    salePrice: null,
  },
  {
    id: 10,
    name: "Sunscreen",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1592185285645-5b9d3b8f909c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    slug: "sunscreen",
    category: "Beauty",
    rating: 4.9,
    isNew: true,
    salePrice: null,
  },
  {
    id: 11,
    name: "Wireless Mouse",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1947&q=80",
    slug: "wireless-mouse",
    category: "Electronics",
    rating: 4.2,
    isNew: false,
    salePrice: null,
  },
  {
    id: 12,
    name: "Jeans",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    slug: "jeans",
    category: "Clothing",
    rating: 4.5,
    isNew: false,
    salePrice: 49.99,
  },
];

const categories = [
  { id: 1, name: "Electronics", slug: "electronics", count: 4 },
  { id: 2, name: "Clothing", slug: "clothing", count: 3 },
  { id: 3, name: "Home & Garden", slug: "home-garden", count: 2 },
  { id: 4, name: "Beauty", slug: "beauty", count: 2 },
];

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Best Rating" },
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
    rating: true,
    availability: true,
  });
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState(allProducts);
  
  const categoryParam = searchParams.get("category");
  
  useEffect(() => {
    // Initialize filters from URL params
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    
    // Apply filters
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryParam]);
  
  const applyFilters = () => {
    let filtered = [...allProducts];
    
    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category.toLowerCase().replace(" & ", "-"))
      );
    }
    
    // Price range filter
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Sort
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting (relevance)
        break;
    }
    
    setDisplayedProducts(filtered);
  };
  
  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev => {
      if (checked) {
        return [...prev, category];
      } else {
        return prev.filter(c => c !== category);
      }
    });
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };
  
  const handleExpandSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 200]);
    setSearchQuery("");
    setSortBy("relevance");
    applyFilters();
  };
  
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, priceRange, sortBy]);
  
  return (
    <div className="container pt-6 pb-16">
      <div className="flex flex-col mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="flex items-center justify-between mt-6">
          <div className="lg:hidden">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
          <div className="hidden lg:block">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{displayedProducts.length}</span> products
            </p>
          </div>
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-[200px]"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </form>
            <Select 
              value={sortBy} 
              onValueChange={value => setSortBy(value)}
            >
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <SelectValue placeholder="Sort By" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Mobile search box */}
        <div className="mt-4 lg:hidden">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className={cn(
          "lg:w-60 lg:flex-shrink-0 overflow-auto transition-all duration-300 bg-background lg:bg-transparent",
          mobileFiltersOpen ? "fixed inset-0 z-40 p-4 lg:relative lg:p-0" : "hidden lg:block"
        )}>
          <div className="flex items-center justify-between pb-4 mb-4 border-b lg:hidden">
            <h3 className="font-semibold">Filters</h3>
            <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Filter Sections */}
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Categories</h3>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleExpandSection("categories")}
                >
                  {expandedSections.categories ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {expandedSections.categories && (
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox 
                        id={`category-${category.slug}`}
                        checked={selectedCategories.includes(category.slug)}
                        onCheckedChange={(checked) => handleCategoryChange(category.slug, checked === true)}
                      />
                      <label
                        htmlFor={`category-${category.slug}`}
                        className="ml-2 text-sm cursor-pointer flex-1"
                      >
                        {category.name}
                      </label>
                      <span className="text-xs text-muted-foreground">{category.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Price Range */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Price</h3>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleExpandSection("price")}
                >
                  {expandedSections.price ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {expandedSections.price && (
                <div className="space-y-4">
                  <Slider
                    defaultValue={priceRange}
                    min={0}
                    max={200}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm">${priceRange[0]}</span>
                    <span className="text-sm">${priceRange[1]}</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Button to clear filters */}
            <Button variant="outline" className="w-full" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </aside>
        
        {/* Overlay for mobile filters */}
        {mobileFiltersOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          />
        )}
        
        {/* Products Grid */}
        <div className="flex-1">
          {displayedProducts.length === 0 ? (
            <div className="py-20 text-center">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

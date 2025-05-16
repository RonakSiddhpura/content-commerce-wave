
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";

// Mock data
const saleProducts = [
  {
    id: 2,
    name: "Premium Leather Wallet",
    price: 79.99,
    salePrice: 59.99,
    image: "https://images.unsplash.com/photo-1627123909129-7f8863484dc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    slug: "premium-leather-wallet",
    category: "Accessories",
    rating: 4.7,
    isNew: false
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    price: 34.99,
    salePrice: 24.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    slug: "stainless-steel-water-bottle",
    category: "Kitchen",
    rating: 4.3,
    isNew: false
  },
  {
    id: 6,
    name: "Cotton T-Shirt",
    price: 29.99,
    salePrice: 19.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2880&q=80",
    slug: "cotton-t-shirt",
    category: "Clothing",
    rating: 4.5,
    isNew: false
  },
  {
    id: 8,
    name: "Ceramic Coffee Mug",
    price: 19.99,
    salePrice: 14.99,
    image: "https://images.unsplash.com/photo-1577937927133-66a86b20adb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2880&q=80",
    slug: "ceramic-coffee-mug",
    category: "Kitchen",
    rating: 4.2,
    isNew: false
  },
  {
    id: 10,
    name: "Running Shoes",
    price: 129.99,
    salePrice: 99.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    slug: "running-shoes",
    category: "Footwear",
    rating: 4.8,
    isNew: false
  },
  {
    id: 12,
    name: "Leather Belt",
    price: 49.99,
    salePrice: 39.99,
    image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2881&q=80",
    slug: "leather-belt",
    category: "Accessories",
    rating: 4.4,
    isNew: false
  },
  {
    id: 14,
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    salePrice: 69.99,
    image: "https://images.unsplash.com/photo-1589003511568-3431a989e4f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2264&q=80",
    slug: "portable-bluetooth-speaker",
    category: "Electronics",
    rating: 4.6,
    isNew: false
  },
  {
    id: 16,
    name: "Sunglasses",
    price: 149.99,
    salePrice: 119.99,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2880&q=80",
    slug: "sunglasses",
    category: "Accessories",
    rating: 4.3,
    isNew: false
  }
];

const categories = [
  "All Categories",
  "Electronics",
  "Accessories",
  "Kitchen",
  "Clothing",
  "Footwear"
];

const SalePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("popularity");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter and sort products
  let filteredProducts = [...saleProducts];
  
  if (selectedCategory !== "All Categories") {
    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
  }
  
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Sort products
  switch (sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      break;
    case "price-high":
      filteredProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      break;
    case "newest":
      filteredProducts.sort((a, b) => b.id - a.id);
      break;
    case "discount":
      filteredProducts.sort((a, b) => {
        const discountA = a.price - (a.salePrice || a.price);
        const discountB = b.price - (b.salePrice || b.price);
        return discountB - discountA;
      });
      break;
    default: // popularity
      // Already sorted by popularity
      break;
  }
  
  return (
    <div className="container py-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg p-8 mb-8 text-white text-center">
        <h1 className="text-4xl font-bold mb-2">Summer Sale</h1>
        <p className="text-xl mb-4">Up to 50% off on selected items</p>
        <Badge className="bg-white text-purple-600">Limited Time Offer</Badge>
      </div>
      
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <span className="font-medium">Sale</span>
      </nav>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input 
            placeholder="Search sale items..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="discount">Biggest Discount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold mb-2">No products found</h2>
          <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
          <Button onClick={() => {
            setSearchQuery("");
            setSelectedCategory("All Categories");
          }}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default SalePage;

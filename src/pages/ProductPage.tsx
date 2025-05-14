import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Heart,
  Truck,
  RefreshCcw,
  CheckCircle,
  ChevronRight
} from "lucide-react";
import ProductCard from "@/components/ProductCard";

// Mock data (would be fetched from API based on slug)
const products = [
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
    description: "High-quality wireless headphones with noise cancellation. Enjoy up to 30 hours of battery life and premium sound quality. Perfect for travel, work, or everyday use.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0 connectivity",
      "High-fidelity audio",
      "Built-in microphone for calls",
      "Comfortable over-ear design"
    ],
    specifications: {
      "Brand": "AudioTech",
      "Model": "WH-X3000",
      "Color Options": "Black, White, Blue",
      "Connectivity": "Bluetooth 5.0, 3.5mm jack",
      "Battery Life": "Up to 30 hours",
      "Charging Time": "2 hours",
      "Weight": "250g",
      "Dimensions": "7.5 x 6.7 x 3.2 inches"
    },
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2096&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    options: {
      colors: ["Black", "White", "Blue"],
      variants: ["Standard", "Pro"]
    }
  },
  // Other products as needed
];

const relatedProducts = [
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
    id: 1,
    name: "Wireless Earbuds",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    slug: "wireless-earbuds",
    category: "Electronics",
    rating: 4.6,
    isNew: false,
    salePrice: null,
  },
];

const ProductPage = () => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedVariant, setSelectedVariant] = useState("Standard");
  
  // In a real app, you would fetch the product based on slug
  const product = products.find(p => p.slug === slug);
  
  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-6">Sorry, the product you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }
  
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <Link to="/products" className="text-muted-foreground hover:text-foreground">Products</Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <Link to={`/products?category=${product.category.toLowerCase().replace(" & ", "-")}`} className="text-muted-foreground hover:text-foreground">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <span className="font-medium truncate max-w-[150px]">{product.name}</span>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden aspect-square bg-slate-50">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button 
                key={index}
                className={`border rounded-md overflow-hidden w-20 h-20 flex-shrink-0 ${
                  selectedImage === index ? "ring-2 ring-brand ring-offset-1" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} image ${index+1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <div className="mb-4">
            {product.isNew && <Badge className="mb-2 bg-brand border-0">New</Badge>}
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-2">
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5"
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">({product.rating.toFixed(1)})</span>
            </div>
            
            <div className="text-2xl font-bold mb-4">
              {product.salePrice ? (
                <div className="flex items-center">
                  <span className="text-brand mr-2">${product.salePrice.toFixed(2)}</span>
                  <span className="text-muted-foreground line-through text-lg">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span>${product.price.toFixed(2)}</span>
              )}
            </div>
            
            <p className="text-muted-foreground mb-6">{product.description}</p>
          </div>
          
          {/* Product Options */}
          <div className="space-y-6 mb-6">
            {/* Color Options */}
            {product.options.colors && (
              <div>
                <label className="block text-sm font-medium mb-2">Color: <span className="font-normal">{selectedColor}</span></label>
                <div className="flex space-x-3">
                  {product.options.colors.map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color ? "ring-2 ring-brand ring-offset-2" : ""
                      }`}
                      style={{ 
                        backgroundColor: color.toLowerCase() === "white" ? "#ffffff" : 
                                         color.toLowerCase() === "black" ? "#000000" :
                                         color.toLowerCase() === "blue" ? "#3B82F6" : 
                                         color.toLowerCase()
                      }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Variant Options */}
            {product.options.variants && (
              <div>
                <label className="block text-sm font-medium mb-2">Model</label>
                <div className="flex flex-wrap gap-2">
                  {product.options.variants.map(variant => (
                    <button
                      key={variant}
                      className={`px-4 py-2 border rounded-md ${
                        selectedVariant === variant ? "border-brand bg-brand/5" : ""
                      }`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity === 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="ml-4 text-sm text-muted-foreground">
                  {product.stock} items available
                </span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button size="lg" className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="secondary" className="flex-1">
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>
          
          {/* Product Info Pills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center p-3 border rounded-md">
              <Truck className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-sm">Free shipping over $50</span>
            </div>
            <div className="flex items-center p-3 border rounded-md">
              <RefreshCcw className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-sm">30-day returns</span>
            </div>
            <div className="flex items-center p-3 border rounded-md">
              <CheckCircle className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-sm">2-year warranty</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="details">
          <TabsList className="w-full grid grid-cols-3 mb-8">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="p-4 border rounded-md">
            <div className="space-y-4">
              <h3 className="font-semibold text-xl">Features</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="p-4 border rounded-md">
            <div className="space-y-4">
              <h3 className="font-semibold text-xl mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="py-2">
                    <span className="font-medium">{key}:</span> {value}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-4 border rounded-md">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-xl">Customer Reviews</h3>
                <Button variant="outline">Write a Review</Button>
              </div>
              <p className="text-muted-foreground">No reviews yet. Be the first to leave a review!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Related Products</h2>
          <Link to="/products" className="text-brand flex items-center hover:underline">
            View all
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

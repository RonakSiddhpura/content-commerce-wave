
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChevronRight } from "lucide-react";
import ProductCard from '@/components/ProductCard';
import { cn } from '@/lib/utils';

// Mock data (would be fetched from API in real app)
const banners = [
  {
    id: 1,
    title: "Summer Collection",
    description: "Discover our new summer collection",
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ctaText: "Shop Now",
    ctaLink: "/products/summer",
  },
  {
    id: 2,
    title: "Special Offer",
    description: "Get up to 50% off on selected items",
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ctaText: "View Offers",
    ctaLink: "/products/sale",
  },
  {
    id: 3,
    title: "New Arrivals",
    description: "Be the first to check out our newest products",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ctaText: "Explore",
    ctaLink: "/products/new",
  }
];

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80",
    slug: "electronics"
  },
  {
    id: 2,
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    slug: "clothing"
  },
  {
    id: 3,
    name: "Home & Garden",
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1987&q=80",
    slug: "home-garden"
  },
  {
    id: 4,
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    slug: "beauty"
  },
];

const featuredProducts = [
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
];

const newArrivals = [
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
];

const HomePage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    // Auto slide for banner
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(slideTimer);
    };
  }, []);

  return (
    <div className={cn(
      "transition-opacity duration-500",
      isLoaded ? "opacity-100" : "opacity-0"
    )}>
      {/* Hero Banner Carousel */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="h-full">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                index === activeSlide ? "opacity-100" : "opacity-0"
              )}
            >
              <div 
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url(${banner.image})` }}
              >
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <div className="relative h-full container flex items-center">
                <div className="max-w-lg text-white animate-slideUp">
                  <h1 className="text-4xl font-bold mb-2">{banner.title}</h1>
                  <p className="text-xl mb-6">{banner.description}</p>
                  <Button asChild size="lg">
                    <Link to={banner.ctaLink}>{banner.ctaText}</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === activeSlide ? "bg-white" : "bg-white/50"
              )}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container py-14">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link to="/products" className="text-brand flex items-center hover:underline">
            View all
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map((category) => (
            <Link 
              to={`/products?category=${category.slug}`} 
              key={category.id}
              className="group"
            >
              <div className="overflow-hidden rounded-lg aspect-square mb-3">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <h3 className="font-semibold text-center">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-slate-50 py-14">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link to="/products/featured" className="text-brand flex items-center hover:underline">
              View all
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Carousel */}
      <section className="container py-14">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <Link to="/products/new" className="text-brand flex items-center hover:underline">
            View all
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {newArrivals.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/3 lg:basis-1/4">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </section>

      {/* Featured Collections */}
      <section className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="overflow-hidden border-0 rounded-lg shadow-md">
            <CardContent className="p-0">
              <div className="relative h-[240px]">
                <img 
                  src="https://images.unsplash.com/photo-1513884923967-4b182ef167ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Summer Collection" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Summer Collection</h3>
                  <p className="text-white/90 mb-4">Light and breathable clothing for hot days</p>
                  <Button asChild variant="outline" className="bg-white/80 hover:bg-white">
                    <Link to="/products/summer">Shop Now</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-0 rounded-lg shadow-md">
            <CardContent className="p-0">
              <div className="relative h-[240px]">
                <img 
                  src="https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Smart Home" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Smart Home Collection</h3>
                  <p className="text-white/90 mb-4">Transform your home with smart technology</p>
                  <Button asChild variant="outline" className="bg-white/80 hover:bg-white">
                    <Link to="/products/smart-home">Discover</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

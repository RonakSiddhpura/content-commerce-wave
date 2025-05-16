import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// Mock collections data
const collections = [
  {
    id: 1,
    name: "Summer Essentials",
    description: "Beat the heat with our summer collection",
    image: "https://images.unsplash.com/photo-1566834356013-35619630c5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    slug: "summer-essentials",
    featured: true
  },
  {
    id: 2,
    name: "Work From Home",
    description: "Comfortable and productive workspace essentials",
    image: "https://images.unsplash.com/photo-1561883088-039e53fd2a96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    slug: "work-from-home",
    featured: true
  },
  {
    id: 3,
    name: "Minimalist Living",
    description: "Simple, clean designs for modern living",
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2125&q=80",
    slug: "minimalist-living",
    featured: false
  },
  {
    id: 4,
    name: "Outdoor Adventure",
    description: "Gear up for your next outdoor adventure",
    image: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    slug: "outdoor-adventure",
    featured: false
  },
  {
    id: 5,
    name: "Sustainable Products",
    description: "Eco-friendly products for a greener future",
    image: "https://images.unsplash.com/photo-1585168403603-06edd64e5a5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    slug: "sustainable-products",
    featured: true
  },
  {
    id: 6,
    name: "Smart Home",
    description: "Upgrade your living space with smart technology",
    image: "https://images.unsplash.com/photo-1558000143-a78ffb7e8e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    slug: "smart-home",
    featured: true
  },
  {
    id: 7,
    name: "Modern Workspace",
    description: "Create a productive and stylish workspace",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2748&q=80",
    slug: "modern-workspace",
    featured: false
  },
  {
    id: 8,
    name: "Travel Essentials",
    description: "Must-have items for your next journey",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2821&q=80",
    slug: "travel-essentials",
    featured: false
  }
];

const CollectionsPage = () => {
  const [hoveredCollection, setHoveredCollection] = useState<number | null>(null);
  
  const featuredCollections = collections.filter(collection => collection.featured);
  const otherCollections = collections.filter(collection => !collection.featured);
  
  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <span className="font-medium">Collections</span>
      </nav>
      
      <h1 className="text-3xl font-bold mb-8">Our Collections</h1>
      
      {/* Featured Collections */}
      <h2 className="text-2xl font-semibold mb-4">Featured Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {featuredCollections.map(collection => (
          <Link
            to={`/collections/${collection.slug}`}
            key={collection.id}
            className="block group"
            onMouseEnter={() => setHoveredCollection(collection.id)}
            onMouseLeave={() => setHoveredCollection(null)}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-lg relative">
              <img
                src={collection.image}
                alt={collection.name}
                className={`w-full h-full object-cover transition-transform duration-500 
                  ${hoveredCollection === collection.id ? 'scale-110' : 'scale-100'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                <p className="text-white/80">{collection.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Other Collections */}
      <h2 className="text-2xl font-semibold mb-4">All Collections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {otherCollections.map(collection => (
          <Link
            to={`/collections/${collection.slug}`}
            key={collection.id}
            className="block group"
            onMouseEnter={() => setHoveredCollection(collection.id)}
            onMouseLeave={() => setHoveredCollection(null)}
          >
            <div className="aspect-square overflow-hidden rounded-lg relative">
              <img
                src={collection.image}
                alt={collection.name}
                className={`w-full h-full object-cover transition-transform duration-500 
                  ${hoveredCollection === collection.id ? 'scale-110' : 'scale-100'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                <h3 className="text-lg font-bold">{collection.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionsPage;

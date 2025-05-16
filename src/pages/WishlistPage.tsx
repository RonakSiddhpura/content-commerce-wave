
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";

// Mock wishlist data - in a real app, this would be stored in a context/state management
const mockWishlistItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    slug: "wireless-headphones",
    category: "Electronics",
    salePrice: null
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1999&q=80",
    slug: "smart-watch",
    category: "Electronics",
    salePrice: null
  },
  {
    id: 6,
    name: "Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2880&q=80",
    slug: "cotton-t-shirt",
    category: "Clothing",
    salePrice: 19.99
  }
];

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Removed from wishlist",
      description: "The item has been removed from your wishlist.",
    });
  };
  
  const moveToCart = (item: typeof wishlistItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.salePrice || item.price,
      image: item.image,
      slug: item.slug
    });
    
    // Remove from wishlist
    removeFromWishlist(item.id);
  };
  
  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <span className="font-medium">Wishlist</span>
      </nav>
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        {wishlistItems.length > 0 && (
          <Button 
            variant="outline" 
            onClick={() => {
              wishlistItems.forEach(item => moveToCart(item));
              setWishlistItems([]);
              toast({
                title: "Added all to cart",
                description: "All items have been moved to your cart.",
              });
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add All to Cart
          </Button>
        )}
      </div>
      
      {wishlistItems.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-slate-50 p-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-4 text-right">Actions</div>
            </div>
          </div>
          
          {wishlistItems.map((item) => (
            <div key={item.id} className="p-4 border-t">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4">
                      <Link to={`/products/${item.slug}`} className="font-medium hover:underline">
                        {item.name}
                      </Link>
                      <div className="text-sm text-muted-foreground">
                        {item.category}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 text-center">
                  {item.salePrice ? (
                    <div>
                      <span className="font-semibold">${item.salePrice.toFixed(2)}</span>
                      <span className="text-muted-foreground line-through ml-2 text-sm">${item.price.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span className="font-semibold">${item.price.toFixed(2)}</span>
                  )}
                </div>
                
                <div className="col-span-4 flex justify-end">
                  <div className="flex space-x-2">
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => moveToCart(item)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <Heart className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Items added to your wishlist will be saved here
          </p>
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Minus, Plus, RefreshCcw, ShoppingCart, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

// Mock suggested products (would be from an API in a real app)
const suggestedProducts = [
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
];

const CartPage = () => {
  const { 
    cart, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    addToCart,
    subtotal,
    shipping,
    tax,
    total
  } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const { toast } = useToast();
  
  const handleApplyCoupon = () => {
    setIsApplyingCoupon(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsApplyingCoupon(false);
      
      if (couponCode.toLowerCase() === "save10") {
        toast({
          title: "Coupon applied!",
          description: "You saved 10% on your order.",
        });
      } else {
        toast({
          title: "Invalid coupon",
          description: "The coupon code is invalid or expired.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  const handleAddSuggestedToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    });
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      {cart.items.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-slate-50 p-4">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
              </div>
              
              {cart.items.map((item) => (
                <div key={item.id} className="p-4 border-t">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-6">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="ml-4">
                          <Link to={`/products/${item.slug}`} className="font-medium hover:underline">{item.name}</Link>
                          <div className="text-sm text-muted-foreground">
                            {item.color && <span>{item.color}</span>}
                            {item.variant && <span> / {item.variant}</span>}
                          </div>
                          <button 
                            className="text-sm text-brand hover:underline mt-1 hidden sm:block"
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-center">
                      ${item.price.toFixed(2)}
                    </div>
                    
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-center font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                  <button 
                    className="text-sm text-brand hover:underline mt-4 sm:hidden"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              <div className="p-4 border-t bg-slate-50 flex items-center justify-between">
                <Button variant="ghost" asChild>
                  <Link to="/products" className="flex items-center">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
                <Button variant="outline" onClick={clearCart}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <div className="rounded-lg border overflow-hidden">
              <div className="p-4 bg-slate-50">
                <h2 className="text-lg font-medium">Order Summary</h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <span>${shipping.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex items-center space-x-2 pt-4">
                  <Input 
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button 
                    variant="outline"
                    onClick={handleApplyCoupon}
                    disabled={!couponCode || isApplyingCoupon}
                  >
                    Apply
                  </Button>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button asChild size="lg" className="w-full">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
            
            {/* Payment methods */}
            <div className="mt-4 p-4 border rounded-lg">
              <h3 className="text-sm font-medium mb-2">We Accept</h3>
              <div className="flex gap-2">
                <div className="border rounded p-1 w-12 h-8"></div>
                <div className="border rounded p-1 w-12 h-8"></div>
                <div className="border rounded p-1 w-12 h-8"></div>
                <div className="border rounded p-1 w-12 h-8"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* You might also like */}
      {cart.items.length > 0 && (
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">You might also like</h2>
            <Link to="/products" className="text-brand flex items-center hover:underline">
              View more
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {suggestedProducts.map(product => (
              <div key={product.id} className="border rounded-lg overflow-hidden group">
                <div className="aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <Link to={`/products/${product.slug}`} className="font-medium hover:underline">
                    {product.name}
                  </Link>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold">${product.price.toFixed(2)}</span>
                    <Button size="sm" onClick={() => handleAddSuggestedToCart(product)}>Add to Cart</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

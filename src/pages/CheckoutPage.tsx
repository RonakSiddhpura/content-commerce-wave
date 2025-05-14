import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRight, Shield, CreditCard, ShoppingBag, Clock } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const { toast } = useToast();
  const { cart, subtotal, shipping, tax, total } = useCart();
  
  const handleContinue = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePlaceOrder = () => {
    setIsOrdering(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsOrdering(false);
      
      toast({
        title: "Order placed successfully!",
        description: "Check your email for the confirmation.",
      });
      
      // In a real app, you would redirect to a success page
      // and clear the cart here
    }, 2000);
  };
  
  return (
    <div className="container py-8">
      <nav className="flex text-sm mb-8">
        <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link to="/cart" className="text-muted-foreground hover:text-foreground">Cart</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="font-medium">Checkout</span>
      </nav>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Checkout Steps */}
          <div className="mb-8">
            <div className="flex justify-between mb-6">
              <button
                className={`flex flex-col items-center w-1/3 ${
                  activeStep >= 1 ? "text-brand" : "text-muted-foreground"
                }`}
                onClick={() => activeStep > 1 && setActiveStep(1)}
                disabled={activeStep < 1}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  activeStep >= 1 ? "bg-brand text-white" : "bg-muted"
                }`}>
                  1
                </div>
                <span className="text-sm hidden sm:block">Shipping</span>
              </button>
              
              <div className="w-full mx-4 mt-4 border-t hidden sm:block"></div>
              
              <button
                className={`flex flex-col items-center w-1/3 ${
                  activeStep >= 2 ? "text-brand" : "text-muted-foreground"
                }`}
                onClick={() => activeStep > 2 && setActiveStep(2)}
                disabled={activeStep < 2}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  activeStep >= 2 ? "bg-brand text-white" : "bg-muted"
                }`}>
                  2
                </div>
                <span className="text-sm hidden sm:block">Payment</span>
              </button>
              
              <div className="w-full mx-4 mt-4 border-t hidden sm:block"></div>
              
              <button
                className={`flex flex-col items-center w-1/3 ${
                  activeStep >= 3 ? "text-brand" : "text-muted-foreground"
                }`}
                disabled
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  activeStep >= 3 ? "bg-brand text-white" : "bg-muted"
                }`}>
                  3
                </div>
                <span className="text-sm hidden sm:block">Review</span>
              </button>
            </div>
          </div>
          
          {/* Step Content */}
          <div className="p-6 border rounded-lg">
            {/* Step 1: Shipping */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" className="mt-1" />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" className="mt-1" />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" className="mt-1" defaultValue="United States" />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" className="mt-1" />
                  </div>
                  
                  <div className="md:col-span-2 flex items-start space-x-2 pt-2">
                    <Checkbox id="saveAddress" />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="saveAddress"
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        Save this address for future orders
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button onClick={handleContinue}>
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 2: Payment */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod} 
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit / Debit Card
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="cursor-pointer">
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>
                
                {paymentMethod === "credit-card" && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" className="mt-1" />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" className="mt-1" placeholder="•••• •••• •••• ••••" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardExpiry">Expiry Date</Label>
                        <Input id="cardExpiry" className="mt-1" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cardCVC">CVC</Label>
                        <Input id="cardCVC" className="mt-1" placeholder="•••" />
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 pt-2">
                      <Checkbox id="savePayment" />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="savePayment"
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          Save this payment method for future orders
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleContinue}>
                    Continue to Review
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 3: Review */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Review Your Order</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Shipping Address</h3>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p>John Doe</p>
                      <p>123 Main Street</p>
                      <p>New York, NY 10001</p>
                      <p>United States</p>
                      <p>+1 234-567-8900</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit Card ending in •••• 1234
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {cart.items.map((item) => (
                        <div key={item.id} className="flex items-start">
                          <div className="w-16 h-16 rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="ml-4 flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.color} {item.variant && `/ ${item.variant}`} • Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox id="terms" />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm leading-none cursor-pointer"
                      >
                        I agree to the <Link to="/terms" className="text-brand hover:underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-brand hover:underline">Privacy Policy</Link>.
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handlePlaceOrder} disabled={isOrdering}>
                    {isOrdering ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          {/* Order Summary */}
          <div className="p-6 border rounded-lg sticky top-24">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex">
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                {shipping === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  <span>${shipping.toFixed(2)}</span>
                )}
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Delivery in 3-5 business days</span>
              </div>
              <div className="flex items-center">
                <ShoppingBag className="h-4 w-4 mr-2" />
                <span>Free returns within 30 days</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

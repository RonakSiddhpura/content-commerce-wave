
import React, { createContext, useReducer, useContext, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

// Types
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  slug: string;
  quantity: number;
  color?: string;
  variant?: string;
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number, quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  cart: CartState;
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

// Initial state
const initialState: CartState = {
  items: [],
  isLoading: false,
};

// Try to load cart from localStorage
const loadInitialState = (): CartState => {
  if (typeof window === 'undefined') return initialState;
  
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : initialState;
  } catch (error) {
    console.error('Failed to load cart from localStorage', error);
    return initialState;
  }
};

// Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => 
        item.id === action.payload.id && 
        item.color === action.payload.color && 
        item.variant === action.payload.variant
      );
      
      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + (action.payload.quantity || 1)
        };
        return { ...state, items: updatedItems };
      } else {
        // New item, add to cart
        return { 
          ...state, 
          items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }] 
        };
      }
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity < 1) return state;
      
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { ...state, items: updatedItems };
    }
    
    case 'REMOVE_ITEM': {
      return { 
        ...state, 
        items: state.items.filter(item => item.id !== action.payload) 
      };
    }
    
    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }
    
    default:
      return state;
  }
};

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState, loadInitialState);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Calculate cart totals
  const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;
  
  // Cart actions
  const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity: item.quantity || 1 } });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };
  
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    
    toast({
      title: "Item removed",
      description: "The item was removed from your cart.",
    });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };
  
  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      updateQuantity, 
      removeItem, 
      clearCart,
      subtotal,
      shipping,
      tax,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

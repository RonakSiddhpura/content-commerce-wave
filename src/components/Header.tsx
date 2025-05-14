
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import MegaMenu from "./MegaMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    { title: "Collections", path: "/collections" },
    { title: "Blog", path: "/blog" },
    { title: "About", path: "/page/about-us" },
  ];

  return (
    <header className="border-b sticky top-0 bg-background z-40">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-brand">
            E-Shop
          </Link>
          
          {/* Search */}
          <div className="hidden md:flex relative w-full max-w-sm mx-4">
            <Input 
              type="search" 
              placeholder="Search products..." 
              className="pr-8" 
            />
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-brand text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Desktop Navigation with MegaMenu */}
        <div className="hidden md:block pt-2">
          <MegaMenu />
        </div>
        
        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden absolute left-0 right-0 bg-background border-b transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-[500px] py-4" : "max-h-0"
        )}>
          <div className="container flex flex-col space-y-4">
            <div className="relative w-full">
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="pr-8" 
              />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className="text-foreground hover:text-brand transition-colors py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <Link 
                to="/account"
                className="text-foreground hover:text-brand transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                My Account
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

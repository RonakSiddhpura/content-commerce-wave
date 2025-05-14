
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t mt-16">
      {/* Newsletter */}
      <div className="container py-12">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h3>
          <p className="text-muted-foreground mb-4">Stay updated with our latest products and promotions</p>
          <div className="flex gap-2">
            <Input type="email" placeholder="Your email" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="border-t border-slate-200">
        <div className="container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/products" className="text-muted-foreground hover:text-brand">All Products</Link></li>
                <li><Link to="/products/featured" className="text-muted-foreground hover:text-brand">Featured</Link></li>
                <li><Link to="/products/new-arrivals" className="text-muted-foreground hover:text-brand">New Arrivals</Link></li>
                <li><Link to="/products/sale" className="text-muted-foreground hover:text-brand">Sale</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/page/contact" className="text-muted-foreground hover:text-brand">Contact Us</Link></li>
                <li><Link to="/page/shipping" className="text-muted-foreground hover:text-brand">Shipping & Returns</Link></li>
                <li><Link to="/page/faq" className="text-muted-foreground hover:text-brand">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/page/about-us" className="text-muted-foreground hover:text-brand">About Us</Link></li>
                <li><Link to="/blog" className="text-muted-foreground hover:text-brand">Blog</Link></li>
                <li><Link to="/careers" className="text-muted-foreground hover:text-brand">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-muted-foreground hover:text-brand">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-brand">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-brand">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <a href="mailto:info@eshop.com" className="text-muted-foreground hover:text-brand flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@eshop.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-slate-200">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} E-Shop. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link to="/page/privacy-policy" className="text-muted-foreground hover:text-brand">Privacy Policy</Link>
              <Link to="/page/terms" className="text-muted-foreground hover:text-brand">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

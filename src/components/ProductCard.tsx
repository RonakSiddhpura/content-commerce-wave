
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: string;
  rating: number;
  isNew?: boolean;
  salePrice?: number | null;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden border border-slate-200 rounded-md h-full group">
      <div className="relative">
        <Link to={`/products/${product.slug}`} className="block">
          <div className="aspect-square overflow-hidden bg-slate-100">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-brand border-0">New</Badge>
          )}
          {product.salePrice && (
            <Badge className="bg-sale border-0">Sale</Badge>
          )}
        </div>
        
        {/* Quick add button */}
        <div className="absolute bottom-0 left-0 right-0 p-2 transform translate-y-full transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
          <Button variant="default" className="w-full" size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      
      <CardContent className="pt-4 pb-2">
        <div className="mb-1">
          <span className="text-xs text-muted-foreground">{product.category}</span>
        </div>
        <Link to={`/products/${product.slug}`} className="block">
          <h3 className="font-medium leading-tight hover:underline line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-center mt-1">
          <div className="flex items-center text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3 w-3"
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">({product.rating.toFixed(1)})</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex items-center">
          {product.salePrice ? (
            <>
              <span className="font-semibold">${product.salePrice.toFixed(2)}</span>
              <span className="text-muted-foreground line-through ml-2 text-sm">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-semibold">${product.price.toFixed(2)}</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;


import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="container py-16 max-w-md mx-auto text-center">
      <div className="mb-6 flex justify-center">
        <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center">
          <ShoppingBag className="h-12 w-12 text-brand" />
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Oops! We couldn't find the page you're looking for.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg">
          <Link to="/">Back to Homepage</Link>
        </Button>
        <Button variant="outline" asChild size="lg">
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

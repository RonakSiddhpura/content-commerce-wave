
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

// Mock data - in a real app, this would come from the backend
const menuData = [
  {
    title: "Women",
    featured: [
      { name: "New Arrivals", href: "/products?category=women&new=true" },
      { name: "Bestsellers", href: "/products?category=women&bestseller=true" },
      { name: "Sale Items", href: "/products?category=women&sale=true" }
    ],
    categories: [
      {
        name: "Clothing",
        subcategories: [
          { name: "Dresses", href: "/products?category=women-dresses" },
          { name: "Tops", href: "/products?category=women-tops" },
          { name: "Pants", href: "/products?category=women-pants" },
          { name: "Skirts", href: "/products?category=women-skirts" },
          { name: "Jackets", href: "/products?category=women-jackets" }
        ]
      },
      {
        name: "Accessories",
        subcategories: [
          { name: "Jewelry", href: "/products?category=women-jewelry" },
          { name: "Bags", href: "/products?category=women-bags" },
          { name: "Shoes", href: "/products?category=women-shoes" },
          { name: "Scarves", href: "/products?category=women-scarves" }
        ]
      }
    ],
    featuredImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Men",
    featured: [
      { name: "New Arrivals", href: "/products?category=men&new=true" },
      { name: "Bestsellers", href: "/products?category=men&bestseller=true" },
      { name: "Sale Items", href: "/products?category=men&sale=true" }
    ],
    categories: [
      {
        name: "Clothing",
        subcategories: [
          { name: "Shirts", href: "/products?category=men-shirts" },
          { name: "T-Shirts", href: "/products?category=men-tshirts" },
          { name: "Pants", href: "/products?category=men-pants" },
          { name: "Jackets", href: "/products?category=men-jackets" }
        ]
      },
      {
        name: "Accessories",
        subcategories: [
          { name: "Watches", href: "/products?category=men-watches" },
          { name: "Belts", href: "/products?category=men-belts" },
          { name: "Shoes", href: "/products?category=men-shoes" },
          { name: "Ties", href: "/products?category=men-ties" }
        ]
      }
    ],
    featuredImage: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Kids",
    featured: [
      { name: "New Arrivals", href: "/products?category=kids&new=true" },
      { name: "Bestsellers", href: "/products?category=kids&bestseller=true" },
      { name: "Sale Items", href: "/products?category=kids&sale=true" }
    ],
    categories: [
      {
        name: "Clothing",
        subcategories: [
          { name: "Boys", href: "/products?category=kids-boys" },
          { name: "Girls", href: "/products?category=kids-girls" },
          { name: "Baby", href: "/products?category=kids-baby" }
        ]
      },
      {
        name: "Accessories",
        subcategories: [
          { name: "Shoes", href: "/products?category=kids-shoes" },
          { name: "Toys", href: "/products?category=kids-toys" },
          { name: "School Items", href: "/products?category=kids-school" }
        ]
      }
    ],
    featuredImage: "https://images.unsplash.com/photo-1576877138403-8ec2f82e4554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
  },
  {
    title: "Collections",
    href: "/collections"
  },
  {
    title: "Sale",
    href: "/products?sale=true"
  }
];

const MegaMenu = () => {
  return (
    <NavigationMenu className="max-w-full justify-start">
      <NavigationMenuList className="space-x-1">
        {menuData.map((item) => (
          <NavigationMenuItem key={item.title}>
            {item.href ? (
              <Link to={item.href}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.title}
                </NavigationMenuLink>
              </Link>
            ) : (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[800px] p-4 md:grid md:grid-cols-7 gap-6">
                    <div className="md:col-span-2">
                      <div className="font-medium mb-3">Featured</div>
                      <ul className="space-y-2">
                        {item.featured?.map((featured) => (
                          <li key={featured.name}>
                            <Link 
                              to={featured.href} 
                              className="text-muted-foreground hover:text-foreground"
                            >
                              {featured.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {item.featuredImage && (
                        <div className="mt-4 relative h-40 rounded-md overflow-hidden">
                          <img 
                            src={item.featuredImage}
                            alt={`${item.title} featured`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                      )}
                    </div>
                    <div className="col-span-5 grid grid-cols-2 md:grid-cols-3 gap-6">
                      {item.categories?.map((category) => (
                        <div key={category.name}>
                          <h3 className="font-medium mb-2">{category.name}</h3>
                          <ul className="space-y-2">
                            {category.subcategories.map((subcategory) => (
                              <li key={subcategory.name}>
                                <Link 
                                  to={subcategory.href}
                                  className="text-muted-foreground hover:text-foreground"
                                >
                                  {subcategory.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MegaMenu;

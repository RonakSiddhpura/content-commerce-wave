
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AnnouncementBar from "./AnnouncementBar";

// Mock data for announcement bar (in a real app, this would come from the backend)
const announcementData = {
  message: "Free shipping on orders over $50",
  link: {
    text: "Shop Now",
    url: "/products"
  },
  backgroundColor: "bg-brand",
  textColor: "text-white",
  enabled: true
};

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar {...announcementData} />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

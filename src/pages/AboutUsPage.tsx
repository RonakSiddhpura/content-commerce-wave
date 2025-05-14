
import { Separator } from "@/components/ui/separator";

const AboutUsPage = () => {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About Us</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Welcome to E-Shop, your premier destination for quality products and exceptional shopping experience.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p>
              Founded in 2010, E-Shop began with a simple mission: to provide customers with high-quality products at affordable prices, all while delivering an exceptional shopping experience. What started as a small online boutique has grown into a trusted e-commerce platform serving customers worldwide.
            </p>
            <p className="mt-4">
              Our journey has been guided by our commitment to quality, customer satisfaction, and sustainability. We believe that shopping should be enjoyable, easy, and environmentally responsible.
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            
            <h3 className="font-medium text-xl mt-6 mb-2">Quality</h3>
            <p>
              We carefully curate our product selection, partnering with trusted suppliers and brands that meet our high standards. Each product is reviewed for quality, durability, and value.
            </p>
            
            <h3 className="font-medium text-xl mt-6 mb-2">Customer-First Approach</h3>
            <p>
              Our customers are at the heart of everything we do. We're committed to providing responsive customer service, transparent policies, and an enjoyable shopping journey from browse to delivery.
            </p>
            
            <h3 className="font-medium text-xl mt-6 mb-2">Sustainability</h3>
            <p>
              We're continually working to reduce our environmental footprint through eco-friendly packaging, sustainable sourcing practices, and partnerships with environmentally responsible brands.
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p>
              Behind E-Shop is a dedicated team of professionals passionate about e-commerce, customer service, and product excellence. From our buyers who source the best products to our customer service representatives who ensure your satisfaction, every team member plays a vital role in the E-Shop experience.
            </p>
            <p className="mt-4">
              Our diverse team brings together expertise in retail, technology, design, and customer service, all united by a common goal: to make your shopping experience exceptional.
            </p>
          </section>

          <Separator className="my-8" />

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              We'd love to hear from you! Whether you have questions about our products, need assistance with an order, or want to share your feedback, our team is here to help.
            </p>
            <p className="mt-4">
              <strong>Email:</strong> support@eshop.com<br />
              <strong>Phone:</strong> (555) 123-4567<br />
              <strong>Hours:</strong> Monday to Friday, 9:00 AM to 6:00 PM EST
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;

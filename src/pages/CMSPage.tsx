
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

// Mock CMS pages data (would be fetched from API)
const cmsPages = {
  "about-us": {
    title: "About Us",
    content: `
      <div class="prose mx-auto">
        <h1>About Our Company</h1>
        <p>Founded in 2015, E-Shop has been at the forefront of online retail innovation. Our mission is to provide high-quality products at competitive prices while offering an exceptional shopping experience.</p>
        
        <h2>Our Story</h2>
        <p>What started as a small operation in a garage has grown into a global e-commerce platform serving thousands of customers daily. Our founder, Jane Doe, had a vision of creating an online store that combined the convenience of digital shopping with the personalized service of a local boutique.</p>
        
        <p>Today, we continue to build on that vision by constantly improving our platform, expanding our product range, and refining our customer service approach.</p>
        
        <h2>Our Values</h2>
        <ul>
          <li><strong>Quality:</strong> We source only the best products that meet our strict quality standards.</li>
          <li><strong>Innovation:</strong> We continuously improve our platform and offerings to stay ahead of the curve.</li>
          <li><strong>Sustainability:</strong> We're committed to reducing our environmental impact through eco-friendly practices.</li>
          <li><strong>Customer Focus:</strong> We put our customers at the center of everything we do.</li>
        </ul>
        
        <h2>Our Team</h2>
        <p>Our diverse team of professionals works tirelessly to ensure that your shopping experience exceeds expectations. From our product curators to our customer support specialists, everyone at E-Shop is dedicated to providing you with the best possible service.</p>
        
        <div class="flex justify-center my-8">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Our Team" class="rounded-lg max-w-full h-auto" />
        </div>
        
        <h2>Join Our Journey</h2>
        <p>We're always looking for talented individuals to join our team. If you're passionate about e-commerce and want to be part of a dynamic, growing company, check out our <a href="/careers" class="text-brand hover:underline">Careers page</a>.</p>
      </div>
    `
  },
  "privacy-policy": {
    title: "Privacy Policy",
    content: `
      <div class="prose mx-auto">
        <h1>Privacy Policy</h1>
        <p>Last updated: January 1, 2023</p>
        
        <p>This Privacy Policy describes how E-Shop ("we", "our", or "us") collects, uses, and discloses your personal information when you visit our website or make a purchase.</p>
        
        <h2>Information We Collect</h2>
        <p>When you visit our site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>
        
        <p>Additionally, as you browse the site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the site, and information about how you interact with the site.</p>
        
        <h2>How We Use Your Information</h2>
        <p>We use the information that we collect to:</p>
        <ul>
          <li>Fulfill orders and process transactions</li>
          <li>Communicate with you</li>
          <li>Screen our orders for potential risk or fraud</li>
          <li>Provide you with information or advertising relating to our products or services</li>
        </ul>
        
        <h2>Sharing Your Information</h2>
        <p>We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you. For example:</p>
        <ul>
          <li>We use Shopify to power our online store. You can read more about how Shopify uses your Personal Information here: <a href="https://www.shopify.com/legal/privacy" class="text-brand hover:underline">https://www.shopify.com/legal/privacy</a>.</li>
          <li>We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</li>
        </ul>
        
        <h2>Your Rights</h2>
        <p>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us.</p>
        
        <h2>Changes</h2>
        <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>
        
        <h2>Contact Us</h2>
        <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at privacy@eshop.com.</p>
      </div>
    `
  },
  "terms": {
    title: "Terms of Service",
    content: `
      <div class="prose mx-auto">
        <h1>Terms of Service</h1>
        <p>Last updated: January 1, 2023</p>
        
        <h2>Overview</h2>
        <p>This website is operated by E-Shop. Throughout the site, the terms "we", "us" and "our" refer to E-Shop. E-Shop offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>
        
        <p>By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink.</p>
        
        <h2>Online Store Terms</h2>
        <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</p>
        
        <p>You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).</p>
        
        <p>A breach or violation of any of the Terms will result in an immediate termination of your Services.</p>
        
        <h2>General Conditions</h2>
        <p>We reserve the right to refuse service to anyone for any reason at any time.</p>
        
        <p>You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.</p>
        
        <p>You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.</p>
        
        <h2>Changes to Terms of Service</h2>
        <p>You can review the most current version of the Terms of Service at any time at this page.</p>
        
        <p>We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes.</p>
        
        <h2>Contact Information</h2>
        <p>Questions about the Terms of Service should be sent to us at terms@eshop.com.</p>
      </div>
    `
  },
  "faq": {
    title: "Frequently Asked Questions",
    content: `
      <div class="prose mx-auto">
        <h1>Frequently Asked Questions</h1>
        
        <h2>Ordering</h2>
        
        <h3>How do I place an order?</h3>
        <p>Placing an order on our site is easy! Simply browse our products, click on the ones you're interested in, select your options, and add them to your cart. When you're ready to check out, click on the cart icon, review your order, and follow the checkout process.</p>
        
        <h3>Can I modify or cancel my order after it's been placed?</h3>
        <p>We process orders quickly to ensure fast delivery. If you need to modify or cancel your order, please contact our customer service team as soon as possible. We'll do our best to accommodate your request, but we cannot guarantee changes once an order has been processed.</p>
        
        <h3>What payment methods do you accept?</h3>
        <p>We accept major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay. All transactions are securely processed.</p>
        
        <h2>Shipping & Delivery</h2>
        
        <h3>How much does shipping cost?</h3>
        <p>Shipping costs vary based on your location and the size/weight of your order. You can view the shipping cost during checkout before completing your purchase. We offer free shipping on orders over $100.</p>
        
        <h3>How long will it take to receive my order?</h3>
        <p>Standard shipping typically takes 3-5 business days within the continental US. Expedited shipping options are available at checkout. International shipping can take 7-14 business days, depending on the destination country.</p>
        
        <h3>Do you ship internationally?</h3>
        <p>Yes, we ship to many countries worldwide. International shipping rates and delivery times will be calculated at checkout.</p>
        
        <h2>Returns & Refunds</h2>
        
        <h3>What is your return policy?</h3>
        <p>We offer a 30-day return policy. If you're not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund of the product price (shipping fees are non-refundable).</p>
        
        <h3>How do I initiate a return?</h3>
        <p>To initiate a return, please visit our <a href="/returns" class="text-brand hover:underline">Returns Center</a> and follow the instructions. You'll need your order number and the email address used for the purchase.</p>
        
        <h3>How long does it take to process a refund?</h3>
        <p>Once we receive and inspect your return, we'll process your refund within 3-5 business days. Depending on your payment method and financial institution, it may take an additional 5-10 business days for the refund to appear in your account.</p>
        
        <h2>Product Information</h2>
        
        <h3>Are your product images accurate?</h3>
        <p>We strive to display our products as accurately as possible. However, due to individual monitor settings and lighting conditions during photography, slight variations in color and appearance may occur.</p>
        
        <h3>Do you offer product warranties?</h3>
        <p>Many of our products come with manufacturer warranties. Please check the product description for specific warranty information or contact our customer service team.</p>
        
        <h2>Account & Privacy</h2>
        
        <h3>Do I need to create an account to make a purchase?</h3>
        <p>No, you can check out as a guest. However, creating an account allows you to track orders, save your shipping information, and enjoy a more personalized shopping experience.</p>
        
        <h3>How do you protect my personal information?</h3>
        <p>We take data security seriously. Our website uses SSL encryption to protect your personal and payment information. For more details, please review our <a href="/page/privacy-policy" class="text-brand hover:underline">Privacy Policy</a>.</p>
      </div>
    `
  },
  "shipping": {
    title: "Shipping & Returns",
    content: `
      <div class="prose mx-auto">
        <h1>Shipping & Returns</h1>
        
        <h2>Shipping Policy</h2>
        <p>At E-Shop, we strive to make your shopping experience seamless from start to finish. Here's what you need to know about our shipping policy:</p>
        
        <h3>Domestic Shipping</h3>
        <ul>
          <li><strong>Standard Shipping:</strong> 3-5 business days, $5.99 (Free for orders over $100)</li>
          <li><strong>Express Shipping:</strong> 2-3 business days, $12.99</li>
          <li><strong>Overnight Shipping:</strong> Next business day (if ordered before 2 PM EST), $24.99</li>
        </ul>
        
        <h3>International Shipping</h3>
        <p>We ship to many countries worldwide. International shipping rates and delivery times vary by location and will be calculated at checkout.</p>
        <ul>
          <li><strong>Standard International:</strong> 7-14 business days</li>
          <li><strong>Express International:</strong> 3-7 business days</li>
        </ul>
        
        <p>Please note that international customers may be responsible for duties and taxes upon delivery.</p>
        
        <h3>Order Processing</h3>
        <p>Most orders are processed and shipped within 1-2 business days. During peak seasons or promotional periods, processing times may be slightly longer.</p>
        
        <h3>Tracking Your Order</h3>
        <p>Once your order has shipped, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account or using our order tracking tool.</p>
        
        <h2>Returns Policy</h2>
        <p>We want you to be completely satisfied with your purchase. If for any reason you're not, we offer a simple returns process:</p>
        
        <h3>Eligibility</h3>
        <ul>
          <li>Items must be returned within 30 days of delivery</li>
          <li>Products must be in original condition, unused, unwashed, and with all tags/packaging intact</li>
          <li>Some items, such as intimate apparel, earrings, and personalized products, are not eligible for return due to hygiene and customization reasons</li>
        </ul>
        
        <h3>Return Process</h3>
        <ol>
          <li>Initiate your return through our <a href="/returns" class="text-brand hover:underline">Returns Center</a></li>
          <li>Print the prepaid return label (for domestic returns)</li>
          <li>Package the item securely, including any accessories and documentation</li>
          <li>Drop off the package at any authorized shipping location</li>
          <li>Track your return using the provided tracking number</li>
        </ol>
        
        <h3>Refunds</h3>
        <p>Once we receive and inspect your return, we'll process your refund within 3-5 business days. The refund will be issued to your original payment method.</p>
        <ul>
          <li>Product price: Full refund</li>
          <li>Original shipping fees: Non-refundable</li>
          <li>Return shipping: Covered by us for defective or incorrect items; customer responsibility for other returns</li>
        </ul>
        
        <h3>Exchanges</h3>
        <p>We currently process exchanges as a refund followed by a new order. If you prefer an exchange instead of a refund, please place a new order for the desired item and return the original purchase for a refund.</p>
        
        <h2>Contact Us</h2>
        <p>If you have any questions about our shipping or returns policies, please contact our customer service team at shipping@eshop.com or call us at 1-800-123-4567.</p>
      </div>
    `
  },
  "contact": {
    title: "Contact Us",
    content: `
      <div class="prose mx-auto">
        <h1>Contact Us</h1>
        
        <p>We'd love to hear from you! Whether you have a question about our products, need help with an order, or want to provide feedback, our team is here to assist you.</p>
        
        <h2>Customer Support</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div class="p-6 border rounded-lg">
            <h3>Email Us</h3>
            <p>For general inquiries: <a href="mailto:info@eshop.com" class="text-brand">info@eshop.com</a></p>
            <p>For order support: <a href="mailto:orders@eshop.com" class="text-brand">orders@eshop.com</a></p>
            <p>For technical issues: <a href="mailto:tech@eshop.com" class="text-brand">tech@eshop.com</a></p>
            <p class="mt-2 text-sm text-muted-foreground">We typically respond within 24 hours during business days.</p>
          </div>
          
          <div class="p-6 border rounded-lg">
            <h3>Call Us</h3>
            <p>Customer Service: <a href="tel:18001234567" class="text-brand">1-800-123-4567</a></p>
            <p class="mt-2 text-sm text-muted-foreground">Available Monday-Friday, 9 AM - 6 PM EST</p>
            <p class="mt-4">International: <a href="tel:+11234567890" class="text-brand">+1 (123) 456-7890</a></p>
          </div>
        </div>
        
        <h2>Send Us a Message</h2>
        <form class="my-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label for="name" class="block text-sm font-medium mb-2">Name</label>
              <input type="text" id="name" name="name" class="w-full p-2 border rounded-md" required />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium mb-2">Email</label>
              <input type="email" id="email" name="email" class="w-full p-2 border rounded-md" required />
            </div>
          </div>
          
          <div class="mb-6">
            <label for="subject" class="block text-sm font-medium mb-2">Subject</label>
            <input type="text" id="subject" name="subject" class="w-full p-2 border rounded-md" />
          </div>
          
          <div class="mb-6">
            <label for="message" class="block text-sm font-medium mb-2">Message</label>
            <textarea id="message" name="message" rows="5" class="w-full p-2 border rounded-md" required></textarea>
          </div>
          
          <button type="submit" class="bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-dark">Send Message</button>
        </form>
        
        <h2>Visit Us</h2>
        <div class="my-8">
          <p><strong>Headquarters:</strong></p>
          <address class="not-italic">
            123 E-Shop Plaza<br />
            Suite 500<br />
            San Francisco, CA 94105<br />
            United States
          </address>
          
          <p class="mt-4"><strong>Business Hours:</strong></p>
          <p>Monday-Friday: 9 AM - 6 PM PST</p>
          <p>Saturday-Sunday: Closed</p>
        </div>
        
        <div class="my-8 h-64 bg-slate-200 flex items-center justify-center">
          <p class="text-muted-foreground">Map Placeholder</p>
        </div>
        
        <h2>Connect With Us</h2>
        <p class="mb-6">Follow us on social media for the latest updates, promotions, and more!</p>
        <div class="flex space-x-6">
          <a href="#" class="text-brand hover:underline">Facebook</a>
          <a href="#" class="text-brand hover:underline">Twitter</a>
          <a href="#" class="text-brand hover:underline">Instagram</a>
          <a href="#" class="text-brand hover:underline">LinkedIn</a>
          <a href="#" class="text-brand hover:underline">YouTube</a>
        </div>
      </div>
    `
  }
};

const CMSPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState<{ title: string; content: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (slug && cmsPages[slug as keyof typeof cmsPages]) {
        setPage(cmsPages[slug as keyof typeof cmsPages]);
      } else {
        setPage(null);
      }
      setIsLoading(false);
    }, 300);
  }, [slug]);
  
  if (isLoading) {
    return (
      <div className="container py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-slate-200 rounded w-full mb-3"></div>
          <div className="h-4 bg-slate-200 rounded w-full mb-3"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4 mb-6"></div>
          <div className="h-64 bg-slate-200 rounded mb-6"></div>
        </div>
      </div>
    );
  }
  
  if (!page) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Page not found</h1>
        <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <span className="font-medium">{page.title}</span>
      </nav>
      
      <article className="max-w-4xl mx-auto">
        <div 
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </article>
    </div>
  );
};

export default CMSPage;

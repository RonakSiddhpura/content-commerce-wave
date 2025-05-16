
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const TermsPage = () => {
  return (
    <div className="container py-12">
      <nav className="flex text-sm mb-8">
        <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="font-medium">Terms & Conditions</span>
      </nav>
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-sm sm:prose max-w-none">
          <p className="lead">Last updated: May 16, 2025</p>
          
          <h2>1. Introduction</h2>
          <p>
            Welcome to our website. These terms and conditions outline the rules and regulations for the use of our website and services.
          </p>
          
          <h2>2. Acceptance of Terms</h2>
          <p>
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use our website if you do not accept all of the terms and conditions stated on this page.
          </p>
          
          <h2>3. License to Use</h2>
          <p>
            Unless otherwise stated, we and/or our licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved.
          </p>
          
          <h2>4. User Account</h2>
          <p>
            If you create an account on our website, you are responsible for maintaining the security of your account and for all activities that occur under your account. We reserve the right to terminate accounts, remove or edit content at our sole discretion.
          </p>
          
          <h2>5. Product Information</h2>
          <p>
            We strive to provide accurate product descriptions, pricing, and availability information. However, we do not warrant that product descriptions or other content on this site is accurate, complete, reliable, current, or error-free.
          </p>
          
          <h2>6. Pricing and Payment</h2>
          <p>
            All prices are subject to change without notice. We reserve the right to refuse or cancel any orders placed for products listed at an incorrect price, whether or not the order has been confirmed and your payment card charged.
          </p>
          
          <h2>7. Shipping and Delivery</h2>
          <p>
            We will make every effort to ship products in a timely manner. However, we are not responsible for delays in delivery due to circumstances beyond our control, such as customs clearance, weather conditions, or carrier delays.
          </p>
          
          <h2>8. Returns and Refunds</h2>
          <p>
            Please refer to our Return and Refund Policy for information about returns, exchanges, and refunds.
          </p>
          
          <h2>9. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website.
          </p>
          
          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless our company, its officers, directors, employees, agents, licensors, and suppliers from and against all losses, expenses, damages, and costs, including reasonable attorneys' fees, resulting from any violation of these terms and conditions or any activity related to your account.
          </p>
          
          <h2>11. Applicable Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of [Your Country], and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
          
          <h2>12. Changes to Terms</h2>
          <p>
            We may revise these terms and conditions from time to time. The revised terms and conditions will apply to the use of our website from the date of publication of the revised terms and conditions on our website.
          </p>
          
          <h2>13. Contact Us</h2>
          <p>
            If you have any questions about these Terms & Conditions, please contact us at:
          </p>
          <p>
            Email: legal@example.com<br />
            Phone: (123) 456-7890<br />
            Address: 123 Main Street, City, State, ZIP
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;

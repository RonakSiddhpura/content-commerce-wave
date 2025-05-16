
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicyPage = () => {
  return (
    <div className="container py-12">
      <nav className="flex text-sm mb-8">
        <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="font-medium">Privacy Policy</span>
      </nav>
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-sm sm:prose max-w-none">
          <p className="lead">Last updated: May 16, 2025</p>
          
          <h2>1. Introduction</h2>
          <p>
            Welcome to our Privacy Policy. This policy describes how we collect, use, and handle your personal information when you use our website and services.
          </p>
          
          <h2>2. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when you:
          </p>
          <ul>
            <li>Create an account or update your profile</li>
            <li>Place an order or make a purchase</li>
            <li>Sign up for our newsletter</li>
            <li>Contact our customer support</li>
            <li>Participate in surveys, contests, or promotions</li>
          </ul>
          
          <p>
            This information may include your name, email address, postal address, phone number, payment information, and any other information you choose to provide.
          </p>
          
          <h2>3. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders, account, and services</li>
            <li>Send you marketing communications</li>
            <li>Respond to your comments, questions, and customer service requests</li>
            <li>Improve our website, products, and services</li>
            <li>Monitor and analyze usage and trends</li>
            <li>Detect, prevent, and address fraud and other illegal activities</li>
          </ul>
          
          <h2>4. Sharing Your Information</h2>
          <p>
            We may share your personal information with:
          </p>
          <ul>
            <li>Service providers who perform services on our behalf</li>
            <li>Partners with whom we offer co-branded products or services</li>
            <li>Law enforcement or other third parties if required by law</li>
          </ul>
          
          <h2>5. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul>
            <li>Access to your personal information</li>
            <li>Correction of inaccurate or incomplete information</li>
            <li>Deletion of your personal information</li>
            <li>Data portability</li>
            <li>Objection to processing of your personal information</li>
            <li>Withdrawal of consent</li>
          </ul>
          
          <h2>6. Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </p>
          
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top.
          </p>
          
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: privacy@example.com<br />
            Phone: (123) 456-7890<br />
            Address: 123 Main Street, City, State, ZIP
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

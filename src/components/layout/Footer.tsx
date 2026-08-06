import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/Button";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Industries", path: "/industries" },
  { name: "Contact", path: "/contact" },
];

const productCategories = [
  "Personal Protective Equipment (PPE)",
  "Industrial Consumables",
  "Industrial Tools",
  "Office Supplies",
  "Plumbing Materials",
  "Workwear & Uniforms",
];

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-secondary-300">
      <div className="container-custom py-5 lg:py-10 md:py-10 ">
        <div className="grid grid-cols-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 px-2">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src="/KABA.svg"
                alt="KABA Meridian Logo"
                className="h-12 w-auto"
              />
              <div className="flex items-baseline">
                <span className="text-[25px] font-corsiva text-primary-1 ml-1">
                  Meridian
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Your trusted one-stop industrial procurement partner in Ghana. We
              provide reliable sourcing and supply of industrial products.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-secondary-400 hover:text-primary-1 transition-colors"
                aria-label="Facebook">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-secondary-400 hover:text-primary-1  transition-colors"
                aria-label="Twitter">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-secondary-400 hover:text-primary-1 transition-colors"
                aria-label="LinkedIn">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-secondary-400 hover:text-primary-1 transition-colors"
                aria-label="Instagram">
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-accent-300 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 ">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-primary-1 transition-colors flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-accent-300 font-semibold mb-4">Our Products</h4>
            <ul className="space-y-2">
              {productCategories.slice(0, 5).map((product) => (
                <li key={product}>
                  <Link
                    to="/products"
                    className="text-sm hover:text-primary-1 transition-colors">
                    {product}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/products"
                  className="text-[12px] text-primary-1 hover:text-accent-400 transition-colors">
                  View All Products →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-accent-300 font-semibold mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 ">
                <MapPin className="h-5 w-5 text-primary-1 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Accra, Ghana</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary-1 flex-shrink-0" />
                <div>
                  <div className="text-sm">+420 771 259 254</div>
                  <div className="text-sm">+233 27 303 1729</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary-1 flex-shrink-0 " />
                <span className="text-sm">kabameridian@gmail.com</span>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="text-accent-300 border-secondary-600 hover:bg-secondary-800">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-secondary-800">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary-400">
            &copy; {new Date().getFullYear()} KABA Meridian. All rights
            reserved.
          </p>
          <p className="text-sm text-secondary-400">
            Your Trusted Industrial Procurement Partner in Ghana
          </p>
        </div>
      </div>
    </footer>
  );
}

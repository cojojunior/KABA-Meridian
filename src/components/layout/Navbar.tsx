import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Industries", path: "/industries" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg"
            : "bg-white/95 backdrop-blur-sm shadow-sm"
        }`}>
        <nav className="container-custom">
          <div className="flex items-center justify-between h-fit py-1">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/KABA.svg"
                alt="KABA Meridian Logo"
                className="h-9 w-auto"
              />
              <div className="flex items-baseline">
                <span className="text-[25px] font-corsiva font-bold text-primary-600 ml-1">
                  Meridian
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors hover:text-[#05383f] ${
                    location.pathname === link.path
                      ? "text-[#05383f]"
                      : "text-secondary-700"
                  }`}>
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 right-0 bottom-[-4px] h-0.5 bg-[#05383f]"
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className=" lg:flex items-center gap-4" hidden>
              <Link to="/contact">
                <Button variant="primary">Request a Quote</Button>
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors relative z-50"
              aria-label="Toggle menu">
              {isOpen ? (
                <X className="h-6 w-6 text-[#05383f]" />
              ) : (
                <Menu className="h-6 w-6 text-[#05383f]" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel - Slides from right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto">
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-secondary-200">
                  <Link
                    to="/"
                    className="flex items-center gap-2 px-3"
                    onClick={() => setIsOpen(false)}>
                    <img
                      src="/KABA.svg"
                      alt="KABA Meridian Logo"
                      className="h-8 w-auto"
                    />
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
                    aria-label="Close menu">
                    <X className="h-6 w-6 text-[#05383f]" />
                  </button>
                </div>

                {/* Menu Links */}
                <div className="flex-1 px-6 py-8">
                  <div className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                          location.pathname === link.path
                            ? "bg-[#05383f]/10 text-[#05383f]"
                            : "text-secondary-700 hover:bg-secondary-50"
                        }`}>
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-secondary-200">
                    <Link to="/contact" onClick={() => setIsOpen(false)}>
                      <Button variant="primary" className="w-full">
                        Request a Quote
                      </Button>
                    </Link>

                    <div className="mt-6 space-y-3">
                      <a
                        href="mailto:kabameridian@gmail.com"
                        className="flex items-center gap-3 text-sm text-secondary-600 hover:text-[#05383f] transition-colors">
                        <Mail className="h-4 w-4" />
                        kabameridian@gmail.com
                      </a>
                      <a
                        href="tel:+420 771 259 25"
                        className="flex items-center gap-3 text-sm text-secondary-600 hover:text-[#05383f] transition-colors">
                        <Phone className="h-4 w-4" />
                        +233 27 303 1729
                        <br />
                        +233 54 072 4758
                      </a>
                    </div>
                  </div>
                </div>

                {/* Menu Footer */}
                <div className="p-6 border-t border-secondary-200">
                  <p className="text-xs text-secondary-400 text-center">
                    &copy; {new Date().getFullYear()} KABA Meridian
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

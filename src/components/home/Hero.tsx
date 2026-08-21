import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";

export default function Hero() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isDesktopOrTablet, setIsDesktopOrTablet] = useState(false);

  // Check if device is desktop or tablet
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsDesktopOrTablet(width >= 768); // 768px is the md breakpoint in Tailwind
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Hide scroll indicator after 5 seconds only on desktop/tablet
  useEffect(() => {
    if (isDesktopOrTablet) {
      const timer = setTimeout(() => {
        setShowScrollIndicator(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      // Hide immediately on mobile
      setShowScrollIndicator(false);
    }
  }, [isDesktopOrTablet]);

  return (
    <section className="relative min-h-[60vh] lg:min-h-[40vh] py-1 px-2 lg:py-5 flex items-center bg-white">
      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-primary-600 leading-tight mb-1">
              SOURCE IT RIGHT,{" "}
              <span className="text-accent-400 lg:text-4xl">
                SUPPLY CHAIN SOLVED
              </span>
            </h2>
            <p className="font-semibold mb-4">
              Your trusted partner to Source it right the first time
            </p>

            <div className="flex flex-wrap gap-6 grid grid-cols-2 text-sm">
              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}>
                  <Button variant="accent" size="lg" className="gap-2 h-18">
                    Request a Quote
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/about">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-primary-600 border-accent-400/40 hover:bg-white/10 h-18">
                    About Us
                  </Button>
                </motion.div>
              </Link>
            </div>

            <motion.div
              className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-primary-600/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}>
              {[
                { icon: CheckCircle, label: "Quality Products" },
                { icon: Truck, label: "Fast Delivery" },
                { icon: Clock, label: "Reliable Service" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-primary-600/80 font-semibold"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}>
                  <item.icon className="h-5 w-5 text-accent-300" />
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* KABA SVG Logo - Hidden on mobile, shown on tablet and desktop */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center justify-center">
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              <img
                src="/KABA.svg"
                alt="KABA Meridian Logo"
                className="w-45 h-45 md:w-60 md:h-60 object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Only on desktop and tablet, appears for 5 seconds */}
      <AnimatePresence>
        {isDesktopOrTablet && showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: 20,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            transition={{
              duration: 0.6,
              delay: 0.8,
            }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 hidden md:block">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-medium">
                Scroll
              </span>
              <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center">
                <motion.div
                  className="w-1 h-2 bg-white/50 rounded-full mt-2"
                  animate={{
                    y: [0, 12, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

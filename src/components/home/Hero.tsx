import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Truck, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
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
    <section className="relative min-h-[100vh] py-5 px-2 flex items-center overflow-hidden">
      {/* Background Video Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <video
            autoPlay
            muted
            loop
            playsInline
            className={`min-w-full min-h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              filter: "brightness(0.15) saturate(0.2) contrast(1.1)",
              width: "auto",
              height: "100%",
              maxWidth: "none",
            }}
            onLoadedData={() => setIsVideoLoaded(true)}>
            <source src="/herovideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#05383f] to-[#0f172a]" />
        )}
      </div>

      {/* Overlay Layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#05383f]/75 to-[#0f172a]/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(5, 56, 63, 0.5) 0%, transparent 60%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 50%, rgba(5, 56, 63, 0.4) 0%, transparent 60%)`,
          }}
        />
      </div>

      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 animate-pulse-slow"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(5, 56, 63, 0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm mb-6 border border-white/10"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}>
              <Shield className="h-4 w-4 text-accent-400" />
              <span>Trusted Industrial Procurement Partner</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              One-Stop Industrial{" "}
              <span className="text-gradient bg-">
                Procurement Partner
              </span>
            </h1>

            <p className="text-lg text-white/90 leading-relaxed mb-8 max-w-xl">
              We help businesses source the industrial products they
              need—efficiently, reliably, and at competitive prices.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}>
                  <Button variant="accent" size="lg" className="gap-2">
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
                    className="text-white border-white/30 hover:bg-white/10">
                    About Us
                  </Button>
                </motion.div>
              </Link>
            </div>

            <motion.div
              className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-white/10"
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
                  className="flex items-center gap-2 text-white/80"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}>
                  <item.icon className="h-5 w-5 text-[#05383f]" />
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4">
            {[
              { value: "500+", label: "Happy Clients" },
              { value: "1,000+", label: "Products Supplied" },
              { value: "98%", label: "On-Time Delivery" },
              { value: "24/7", label: "Customer Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/20 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}>
                <motion.div
                  className="text-3xl font-bold text-white mb-1"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}>
                  {stat.value}
                </motion.div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
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
              transition: { duration: 0.6, ease: "easeOut" },
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

      {/* Video Ambient Glow Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#05383f]/20 blur-3xl rounded-full" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#0f172a]/20 blur-3xl rounded-full" />
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function CTASection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden ">
      {/* Background Video */}
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

        {/* Fallback gradient background while video loads */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#05383f] to-[#0f172a]" />
        )}
      </div>

      {/* 30% Opacity Green Overlay */}
      <div className="absolute inset-0 bg-[#05383f]/30" />

      {/* Additional Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      {/* Subtle Pattern Overlay for depth */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(5, 56, 63, 0.5) 0%, transparent 60%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 50%, rgba(5, 56, 63, 0.4) 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Video Ambient Glow Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#05383f]/20 blur-3xl rounded-full" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#0f172a]/20 blur-3xl rounded-full" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Partner with a{" "}
            <span className="text-gradient ">
              Trusted Supplier
            </span>
            ?
          </h2>
          <p className="text-xl text-white/90 leading-relaxed mb-8">
            Contact us today for a competitive quotation and let us help you
            source the products your business needs.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}>
                <Button variant="primary" size="lg" className="gap-2">
                  Request a Quote
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white/30 hover:bg-white/10 gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Us
                </Button>
              </motion.div>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
            <a
              href="mailto:kabameridian@gmail.com"
              className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="h-4 w-4 text-[#05383f]" />
              kabameridian@gmail.com
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <a
              href="tel:+233201234567"
              className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="h-4 w-4 text-[#05383f]" />
              +233 20 123 4567
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

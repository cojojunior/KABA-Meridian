import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden lg:py-2 md:py-2 sm:py-2">
      {/* Content */}
      <div className="container-custom relative z-10 py-10 md:py-15 sm:py-10 lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold text-primary-600 mb-6">
            Ready to Partner with a <span className="uppercase font-bold ">Trusted</span>{" "}
            Supplier?
          </h2>
          <p className="text-xl text-primary-600/70 leading-relaxed mb-8">
            Contact us today for a competitive quotation and let us help you
            source the products your business needs.
          </p>

          <div className="flex flex-wrap justify-center gap-4 ">
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
                  className="text-primary-600 border-accent-400/30 hover:bg-white/10 gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Us
                </Button>
              </motion.div>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-primary-600/70 font-semibold text-sm ">
            <a
              href="mailto:kabameridian@gmail.com"
              className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="h-4 w-4 text-accent-300" />
              kabameridian@gmail.com
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <a
              href="https://wa.me/233273031729"
              className="flex items-center gap-2 hover:text-white transition-colors">
              <FaWhatsapp className="h-5 w-5 text-accent-300 flex-shrink-0 mt-0.5" />
              <div className="text-sm break-words">+233 27 303 1729</div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

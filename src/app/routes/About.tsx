import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, Heart, Target } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

const values = [
  {
    icon: Shield,
    title: "Quality",
    description: "We never compromise on quality.",
  },
  {
    icon: Users,
    title: "Reliability",
    description: "We deliver on our promises.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "We act with honesty and transparency.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in everything we do.",
  },
];

export default function About() {
  return (
    <>
      {/* Hero Section - Matching KB-ABOUT.jpg design with KABA.svg */}
      <section className="relative py-10 md:py-5 lg:py-10 overflow-hidden bg-primary-600">
        {/* Decorative Background Elements */}
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

        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#05383f]/20 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-[#0a4a52]/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />

        <div className="container-custom relative z-10 ]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}>
              {/* Logo and Title Row - Logo and Meridian inline on all devices */}
              <div className="flex flex-row items-center justify-center gap-3 md:gap-6 mb-3">
                {/* KABA Logo with Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="flex-shrink-0">
                  <div className="relative">
                    {/* Circle around logo */}
                    <div className="w-15 h-15 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full bg-[#05383f] flex items-center justify-center shadow-lg shadow-[#05383f]/30">
                      <img
                        src="/KABA.svg"
                        alt="KABA Meridian Logo"
                        className="w-12 h-12 sm:w-12 sm:h-12 md:w-18 md:h-18 "
                      />
                    </div>
                    {/* Decorative ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-pulse-slow" />
                  </div>
                </motion.div>

                {/* "Meridian" in Corsiva - Inline with logo on all devices */}
                <motion.h1
                  className="text-6xl sm:text-4xl md:text-5xl lg:text-7xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}>
                  <span className="font-corsiva text-primary-1  tracking-wider">
                    Meridian
                  </span>
                </motion.h1>
              </div>

              {/* Tagline - Full width beneath the logo and title */}
              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}>
                <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto px-4">
                  Your trusted one-stop industrial procurement partner in Ghana.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}>
              <p className="text-lg text-secondary-600 leading-relaxed mb-6">
                At{" "}
                <span className="font-semibold text-secondary-900">
                  KABA Meridian
                </span>
                , we are committed to simplifying industrial procurement for
                businesses across Ghana. We understand that finding quality
                products from reliable suppliers can be time-consuming and
                costly.
              </p>

              <p className="text-lg text-secondary-600 leading-relaxed mb-6">
                We provide reliable procurement solutions for businesses across
                Ghana by supplying high-quality industrial products at
                competitive prices.
              </p>
              <p className="text-lg text-secondary-600 leading-relaxed mb-6">
                That's why we provide a single, dependable source for essential
                industrial and operational supplies. We serve mining companies,
                construction firms, manufacturing industries, logistics
                companies, government institutions, and other commercial
                organizations.
              </p>
              <p className="text-lg text-secondary-600 leading-relaxed mb-8">
                Our goal is to build long-term partnerships based on trust,
                reliability, and consistent value.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <Card
                    variant="shadow"
                    className="h-full hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-[#05383f]/10 text-[#05383f] flex-shrink-0">
                          <value.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-secondary-900 mb-1">
                            {value.title}
                          </h4>
                          <p className="text-sm text-secondary-600">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-secondary-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Ready to Work With Us?
            </h2>
            <p className="text-lg text-secondary-600 mb-8">
              Let's discuss how we can support your industrial procurement
              needs.
            </p>
            <Link to="/contact">
              <Button variant="primary" size="lg" className="gap-2">
                Contact Us
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

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
      {/* Row 1: CEO Image (Left) + Content (Right) */}
      <section className="py-10 md:py-10 lg:py-10 bg-white">
        <div className="container-custom max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: CEO Image - Circular */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center lg:justify-start">
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-full border-2 border-[#05383f]/10 animate-pulse-slow" />
                <div className="absolute -inset-8 rounded-full border border-[#05383f]/5" />

                {/* Circular Image */}
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl shadow-[#05383f]/10 border-4 border-[#05383f]/20">
                  <img
                    src="/CEO.jpg"
                    alt="KABA Meridian CEO"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900">
                About <span className="text-accent-400">Us</span>
              </h2>

              <p className="text-lg text-secondary-600 leading-relaxed">
                At{" "}
                <span className="font-semibold text-secondary-900">
                  KB Meridian
                </span>
                , we are committed to simplifying industrial procurement for
                businesses across Ghana. We understand that finding quality
                products from reliable suppliers can be time-consuming and
                costly.
              </p>

              <p className="text-lg text-secondary-600 leading-relaxed">
                We provide reliable procurement solutions for businesses across
                Ghana by supplying high-quality industrial products at
                competitive prices.
              </p>

              <p className="text-lg text-secondary-600 leading-relaxed">
                That's why we provide a single, dependable source for essential
                industrial and operational supplies. We serve mining companies,
                construction firms, manufacturing industries, logistics
                companies, government institutions, and other commercial
                organizations.
              </p>

              <p className="text-lg text-secondary-600 leading-relaxed">
                Our goal is to build long-term partnerships based on trust,
                reliability, and consistent value.
              </p>

              <Link to="/contact">
                <Button variant="primary" size="lg" className="gap-2 mt-4">
                  Get in Touch
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Row 2: Values Cards - 4 columns */}
      <section className="py-12 md:py-16 lg:py-20 bg-secondary-50">
        <div className="container-custom max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-600 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card
                  variant="shadow"
                  className="h-full hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="flex flex-col items-center">
                      <div className="p-4 rounded-2xl bg-[#05383f]/5 text-accent-400 mb-4">
                        <value.icon className="h-8 w-8" />
                      </div>
                      <h4 className="text-lg font-semibold text-secondary-900 mb-2">
                        {value.title}
                      </h4>
                      <p className="text-sm text-secondary-600">
                        {value.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Row 3: CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-primary-600 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
            }}
          />
        </div>

        <div className="container-custom max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Work With Us?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Let's discuss how we can support your industrial procurement
                needs.
              </p>
              <Link to="/contact">
                <Button
                  variant="accent"
                  size="lg"
                  className="gap-2 bg-accent-400 text-white hover:bg-accent-500">
                  Contact Us
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

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
      {/* Hero Section with Background Image */}
      <section
        className="relative py-20 sm:py-40 md:py-35 lg:py-35 overflow-hidden"
        style={{
          backgroundImage: "url(/KB-ABOUT.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}></section>

      {/* Content Section */}
      <section className="py-5 md:py-5 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}>
              <p className="text-lg text-secondary-600 leading-relaxed mb-6">
                At KABA Meridian, we are committed to simplifying industrial
                procurement for businesses across Ghana. We understand that
                finding quality products from reliable suppliers can be
                time-consuming and costly.
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
                  <Card variant="shadow" className="h-full">
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
      <section className="py-10 md:py-24 bg-secondary-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
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

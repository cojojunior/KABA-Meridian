import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

const products = [
  {
    image: "/ppe.jpg",
    title: "Personal Protective Equipment (PPE)",
    description:
      "Quality safety equipment including helmets, safety boots, gloves, goggles, reflective clothing, and respirators.",
    color: "border-primary-50",
  },
  {
    image: "/industrialConsumables.jpg",
    title: "Industrial Consumables",
    description:
      "Essential products including bearings, fasteners, filters, hoses, welding consumables, belts, and more.",
    color: "border-primary-50",
  },
  {
    image: "/industrialtools.jpg",
    title: "Industrial Tools",
    description:
      "Reliable hand tools, power tools, measuring equipment, and workshop essentials.",
    color: "border-primary-50",
  },
  {
    image: "/office.jpg",
    title: "Office Supplies",
    description:
      "Quality office stationery, printing supplies, office furniture, and workplace essentials.",
    color: "border-primary-50",
  },
  {
    image: "/plumb.jpg",
    title: "Plumbing Materials",
    description:
      "Durable plumbing products including pipes, fittings, valves, pumps, and installation materials.",
    color: "border-primary-50",
  },
  {
    image: "/uniform.jpg",
    title: "Workwear & Uniforms",
    description:
      "Durable uniforms, protective clothing, branded corporate wear, and high-visibility garments.",
    color: "border-primary-50",
  },
];

export default function ProductsSection() {
  return (
    <Section background="white" className="py-5 px-2 lg:py-10 md:py-5">
      <div className="text-center mb-5 py-1">
        <h2 className="text-sm font-semibold text-accent-400 uppercase tracking-wider">
          What We Supply
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold text-secondary-900 mt-2 mb-4">
          Comprehensive Industrial Supply Solutions
        </h3>
        <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
          We provide a wide range of industrial products to keep your operations
          running efficiently.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}>
            <Card
              variant="shadow"
              className={`h-full hover:scale-[1.02] transition-all duration-300 overflow-hidden border-t-4 ${product.color}`}>
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  {/* Title overlay on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-lg font-semibold text-white">
                      {product.title}
                    </h4>
                  </div>
                </div>

                {/* Description */}
                <div className="p-4">
                  <p className="text-secondary-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/products">
          <Button variant="primary" size="lg" className="gap-2">
            View All Products
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </Section>
  );
}

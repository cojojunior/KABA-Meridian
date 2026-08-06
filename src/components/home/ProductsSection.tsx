import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HardHat,
  Wrench,
  Hammer,
  Building,
  Droplets,
  Shirt,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

const products = [
  {
    icon: HardHat,
    title: "Personal Protective Equipment (PPE)",
    description:
      "Quality safety equipment including helmets, safety boots, gloves, goggles, reflective clothing, and respirators.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Wrench,
    title: "Industrial Consumables",
    description:
      "Essential products including bearings, fasteners, filters, hoses, welding consumables, belts, and more.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Hammer,
    title: "Industrial Tools",
    description:
      "Reliable hand tools, power tools, measuring equipment, and workshop essentials.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Building,
    title: "Office Supplies",
    description:
      "Quality office stationery, printing supplies, office furniture, and workplace essentials.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Droplets,
    title: "Plumbing Materials",
    description:
      "Durable plumbing products including pipes, fittings, valves, pumps, and installation materials.",
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    icon: Shirt,
    title: "Workwear & Uniforms",
    description:
      "Durable uniforms, protective clothing, branded corporate wear, and high-visibility garments.",
    color: "bg-red-100 text-red-600",
  },
];

export default function ProductsSection() {
  return (
    <Section background="white" className="py-3 px-2 lg:py-3 md:py-5">
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
              className="h-full hover:scale-[1.02] transition-all duration-300">
              <CardContent className="p-6">
                <div
                  className={`w-14 h-14 rounded-xl ${product.color} flex items-center justify-center mb-4`}>
                  <product.icon className="h-7 w-7" />
                </div>
                <h4 className="text-lg font-semibold text-secondary-900 mb-3">
                  {product.title}
                </h4>
                <p className="text-secondary-600 text-sm leading-relaxed">
                  {product.description}
                </p>
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

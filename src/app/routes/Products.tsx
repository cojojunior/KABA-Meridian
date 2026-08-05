import { motion } from "framer-motion";
import {
  HardHat,
  Wrench,
  Hammer,
  Building,
  Droplets,
  Shirt,
  CheckCircle,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";

const products = [
  {
    icon: HardHat,
    title: "Personal Protective Equipment (PPE)",
    description:
      "Protecting your workforce with quality safety equipment, including helmets, safety boots, gloves, goggles, reflective clothing, respirators, and other protective gear.",
    features: [
      "Safety Helmets",
      "Safety Boots",
      "Gloves",
      "Goggles",
      "Reflective Clothing",
      "Respirators",
    ],
  },
  {
    icon: Wrench,
    title: "Industrial Consumables",
    description:
      "Supplying the essential products that keep operations running efficiently, including bearings, fasteners, filters, hoses, welding consumables, belts, and other industrial maintenance items.",
    features: [
      "Bearings",
      "Fasteners",
      "Filters",
      "Hoses",
      "Welding Consumables",
      "Belts",
    ],
  },
  {
    icon: Hammer,
    title: "Industrial Tools",
    description:
      "Providing reliable hand tools, power tools, measuring equipment, and workshop essentials for industrial applications.",
    features: [
      "Hand Tools",
      "Power Tools",
      "Measuring Equipment",
      "Workshop Essentials",
    ],
  },
  {
    icon: Building,
    title: "Office Supplies",
    description:
      "Supporting business operations with quality office stationery, printing supplies, office furniture, filing solutions, and everyday workplace essentials.",
    features: [
      "Stationery",
      "Printing Supplies",
      "Office Furniture",
      "Filing Solutions",
    ],
  },
  {
    icon: Droplets,
    title: "Plumbing Materials",
    description:
      "Offering durable plumbing products including pipes, fittings, valves, pumps, and related installation materials for industrial and commercial projects.",
    features: [
      "Pipes",
      "Fittings",
      "Valves",
      "Pumps",
      "Installation Materials",
    ],
  },
  {
    icon: Shirt,
    title: "Workwear & Uniforms",
    description:
      "Supplying durable uniforms, protective clothing, branded corporate wear, and high-visibility garments designed for demanding work environments.",
    features: [
      "Uniforms",
      "Protective Clothing",
      "Corporate Wear",
      "High-Visibility Garments",
    ],
  },
];

export default function Products() {
  return (
    <>
      <Section background="gray" spacing="xl">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
              Our Products
            </h1>
            <p className="text-xl text-secondary-600 leading-relaxed">
              Comprehensive industrial supply solutions for your business needs.
            </p>
          </motion.div>
        </div>
      </Section>

      <Section background="white">
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}>
              <Card variant="shadow" className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-4 rounded-xl bg-primary-50 text-primary-600 flex-shrink-0">
                      <product.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-3">
                        {product.title}
                      </h3>
                      <p className="text-secondary-600 leading-relaxed mb-4">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-sm bg-secondary-50 px-3 py-1 rounded-full text-secondary-700">
                            <CheckCircle className="h-3 w-3 text-primary-500" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";

const products = [
  {
    image: "/ppe.jpg",
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
    image: "/industrialConsumables.jpg",
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
    image: "/industrialtools.jpg",
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
    image: "/office.jpg",
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
    image: "/plumb.jpg",
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
    image: "/uniform.jpg",
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
      <Section
        spacing="xl"
        className="py-5 px-2 lg:py-5 md:py-5 text-primary-600 bg-white">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold  mb-4">
              Our Products
            </h1>
            <p className="text-xl text-primary-600/80 leading-relaxed mb-4">
              Comprehensive industrial supply solutions for your business needs.
            </p>
          </motion.div>
        </div>
        <div className="border-t border-accent-400/50" />
      </Section>

      <Section background="white" className="py-5 px-2 lg:py-5 md:py-5 mb-5">
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}>
              <Card variant="shadow" className="h-full overflow-hidden">
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    {/* Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {/* Title overlay on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        {product.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-secondary-600 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-sm bg-secondary-50 px-3 py-1 rounded-full text-secondary-700">
                          <CheckCircle className="h-3 w-3 text-accent-400" />
                          {feature}
                        </span>
                      ))}
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

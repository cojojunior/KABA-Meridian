import { motion } from "framer-motion";
import {
  Building2,
  HardHat,
  Factory,
  Truck,
  Warehouse,
  Landmark,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";

const industries = [
  {
    icon: Building2,
    name: "Mining",
    description:
      "Reliable supply of safety equipment, tools, and consumables for mining operations.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: HardHat,
    name: "Construction",
    description:
      "Quality PPE, tools, and materials for construction projects of all sizes.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    description:
      "Industrial consumables, tools, and safety equipment for manufacturing facilities.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Truck,
    name: "Logistics",
    description:
      "Office supplies, workwear, and operational essentials for logistics companies.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Warehouse,
    name: "Warehousing",
    description:
      "Storage solutions, safety equipment, and operational supplies for warehouses.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Landmark,
    name: "Government Institutions",
    description:
      "Reliable procurement solutions for government agencies and public institutions.",
    color: "bg-red-100 text-red-600",
  },
];

export default function Industries() {
  return (
    <>
      <Section spacing="xl" className="py-10 px-2 lg:py-15 bg-primary-600/10 text-primary-600">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold  mb-4">
              Industries We Serve
            </h1>
            <p className="text-xl text-primary-600/80 leading-relaxed">
              Trusted procurement partner for businesses across multiple
              sectors.
            </p>
          </motion.div>
        </div>
      </Section>

      <Section background="white" className="py-5 px-2 lg:py-5">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}>
              <Card
                variant="shadow"
                className="h-full hover:scale-[1.02] transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 rounded-xl ${industry.color} flex items-center justify-center mx-auto mb-4`}>
                    <industry.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-3">
                    {industry.name}
                  </h3>
                  <p className="text-secondary-600 text-sm leading-relaxed">
                    {industry.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card variant="outline" className="max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-secondary-900 mb-4">
                Plus Commercial & Industrial Businesses
              </h3>
              <p className="text-secondary-600">
                We serve a wide range of commercial and industrial businesses
                across Ghana with reliable procurement solutions tailored to
                their specific needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Building2,
  HardHat,
  Factory,
  Truck,
  Warehouse,
  Landmark,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

const industries = [
  { icon: Building2, name: "Mining", color: "bg-amber-100 text-amber-600" },
  {
    icon: HardHat,
    name: "Construction",
    color: "bg-orange-100 text-orange-600",
  },
  { icon: Factory, name: "Manufacturing", color: "bg-blue-100 text-blue-600" },
  { icon: Truck, name: "Logistics", color: "bg-green-100 text-green-600" },
  {
    icon: Warehouse,
    name: "Warehousing",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Landmark,
    name: "Government Institutions",
    color: "bg-red-100 text-red-600",
  },
];

export default function IndustriesSection() {
  return (
    <Section background="white" className="py-5 px-2 lg:py-3">
      <div className="text-center mb-12 ">
        <h2 className="text-sm font-semibold text-accent-300 uppercase tracking-wider">
          Industries We Serve
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold text-secondary-900 mt-2 mb-4">
          Trusted by Businesses Across Sectors
        </h3>
        <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
          We serve a wide range of industries with reliable industrial
          procurement solutions.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {industries.map((industry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-white rounded-xl p-6 text-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105">
            <div
              className={`w-14 h-14 rounded-xl ${industry.color} flex items-center justify-center mx-auto mb-3`}>
              <industry.icon className="h-7 w-7" />
            </div>
            <span className="text-sm font-medium text-secondary-900">
              {industry.name}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-secondary-600 mb-4">
          Plus commercial and industrial businesses across Ghana.
        </p>
        <Link to="/industries">
          <Button variant="outline" size="lg" className="gap-2">
            Learn More
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </Section>
  );
}

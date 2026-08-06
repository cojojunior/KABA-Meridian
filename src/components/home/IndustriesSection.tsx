import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

const industries = [
  {
    image: "/mining.jpg",
    name: "Mining",
    color: "border-primary-50",
  },
  {
    image: "/construction.jpg",
    name: "Construction",
    color: "border-primary-50",
  },
  {
    image: "/manufacturing.jpg",
    name: "Manufacturing",
    color: "border-primary-50",
  },
  {
    image: "/logistic.jpg",
    name: "Logistics",
    color: "border-primary-50",
  },
  {
    image: "/warehouse.jpg",
    name: "Warehousing",
    color: "border-primary-50",
  },
  {
    image: "/government.jpg",
    name: "Government Institutions",
    color: "border-primary-50",
  },
];

export default function IndustriesSection() {
  return (
    <Section background="white" className="py-5 px-2 lg:py-3 md:py-5 md:px-2">
      <div className="text-center mb-12">
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
            className={`bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 border-2 ${industry.color}`}>
            <div className="relative h-40 w-full overflow-hidden">
              <img
                src={industry.image}
                alt={industry.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-3 text-center">
              <span className="text-sm font-semibold text-secondary-900">
                {industry.name}
              </span>
            </div>
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

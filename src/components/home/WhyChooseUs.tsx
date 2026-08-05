import { motion } from "framer-motion";
import {
  Shield,
  DollarSign,
  Truck,
  Headphones,
  Package,
  Handshake,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";

const reasons = [
  {
    icon: Shield,
    title: "Quality Products",
    description:
      "Products from trusted manufacturers meeting highest quality standards.",
    color: "text-blue-600",
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    description:
      "Cost-effective solutions without compromising on quality or service.",
    color: "text-green-600",
  },
  {
    icon: Package,
    title: "One Trusted Supplier",
    description:
      "Single source for multiple product categories, simplifying procurement.",
    color: "text-purple-600",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Timely delivery to keep your operations running without interruption.",
    color: "text-orange-600",
  },
  {
    icon: Headphones,
    title: "Professional Support",
    description:
      "Dedicated customer service team ready to assist with your needs.",
    color: "text-red-600",
  },
  {
    icon: Handshake,
    title: "Long-term Partnership",
    description:
      "Building lasting relationships focused on your operational success.",
    color: "text-primary-600",
  },
];

export default function WhyChooseUs() {
  return (
    <Section background="gray" className="py-5 px-2 lg:py-5">
      <div className="text-center mb-12">
        <h2 className="text-sm font-semibold text-accent-400 uppercase tracking-wider">
          Why Choose Us
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold text-secondary-900 mt-2 mb-4">
          Your Trusted Procurement Partner
        </h3>
        <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
          We deliver quality, reliability, and value to support your operational
          success.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}>
            <Card variant="shadow" className="h-full">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl bg-white shadow-sm flex-shrink-0 ${reason.color}`}>
                    <reason.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900 mb-2">
                      {reason.title}
                    </h4>
                    <p className="text-sm text-secondary-600">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

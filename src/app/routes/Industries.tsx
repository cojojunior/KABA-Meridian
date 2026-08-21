import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";

const industries = [ 
  {
    image: "/mining.jpg",
    name: "Mining",
    description:
      "Reliable supply of safety equipment, tools, and consumables for mining operations.",
    color: "border-primary-50",
  },
  {
    image: "/construction.jpg",
    name: "Construction",
    description:
      "Quality PPE, tools, and materials for construction projects of all sizes.",
    color: "border-primary-50/50",
  },
  {
    image: "/manufacturing.jpg",
    name: "Manufacturing",
    description:
      "Industrial consumables, tools, and safety equipment for manufacturing facilities.",
    color: "border-primary-50",
  },
  {
    image: "/logistic.jpg",
    name: "Logistics",
    description:
      "Office supplies, workwear, and operational essentials for logistics companies.",
    color: "border-primary-50",
  },
  {
    image: "/warehouse.jpg",
    name: "Warehousing",
    description:
      "Storage solutions, safety equipment, and operational supplies for warehouses.",
    color: "border-primary-50/50",
  },
  {
    image: "/construction.jpg",
    name: "Government Institutions",
    description:
      "Reliable procurement solutions for government agencies and public institutions.",
    color: "border-primary-50", },
];

export default function Industries() {
  return (
    <>
      <Section
        spacing="xl"
        className="py-5 px-2 lg:py-10 md:py-10  text-primary-600 ">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Industries We Serve
            </h1>
            <p className="text-xl text-primary-600/80 leading-relaxed mb-4">
              Trusted procurement partner for businesses across multiple
              sectors.
            </p>
          </motion.div>
        </div>
        <div className="border-t border-accent-400/50" />
      </Section>

      <Section background="white" className="py-5 px-2 lg:py-2 md:py-5 mb-6">
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
                className={`h-full hover:scale-[1.02] transition-all duration-300 overflow-hidden border-2 ${industry.color}`}>
                <CardContent className="p-0">
                  {/* Industry Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={industry.image}
                      alt={industry.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    {/* Industry Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white">
                        {industry.name}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-6">
                    <p className="text-secondary-600 text-sm leading-relaxed">
                      {industry.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card variant="default" className="max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-primary-600 mb-4">
                Commercial & Industrial Businesses
              </h3>
              <p className="text-primary-600/80 leading-relaxed">
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

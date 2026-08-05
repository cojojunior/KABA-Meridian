import { motion } from "framer-motion";
import { Target, Eye, Rocket } from "lucide-react";
import { Section } from "@/components/ui/Section";

export default function MissionVision() {
  return (
    <Section background="white" className="py-5 px-2 lg:py-5">
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-secondary-50 rounded-2xl p-8 md:p-10">
          <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center mb-6">
            <Target className="h-7 w-7 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-primary-600 mb-4">
            Our Mission
          </h3>
          <p className="text-secondary-600 leading-relaxed text-lg">
            To provide businesses with high-quality industrial products and
            procurement solutions through reliable sourcing, competitive
            pricing, and outstanding customer service.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-primary-600 rounded-2xl p-8 md:p-10 text-white">
          <div className="w-14 h-14  bg-primary-50/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
            <Eye className="h-7 w-7 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
          <p className="text-white/90 leading-relaxed text-lg">
            To become Ghana's preferred industrial procurement partner,
            recognized for reliability, professionalism, and excellence in
            supply chain solutions.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 bg-white rounded-2xl p-8 shadow-card border border-secondary-100">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary-600 text-primary-600 flex-shrink-0">
            <Rocket className="h-6 w-6  text-white" />
          </div>
          <div>
            <h4 className="text-lg font-semibold  text-primary-600 mb-2">
              Our Commitment
            </h4>
            <p className="text-secondary-600 leading-relaxed">
              We understand that every business depends on timely access to
              quality products. Our commitment is to simplify procurement by
              providing reliable sourcing, responsive service, and products that
              meet the highest standards of quality and performance.
            </p>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

import { motion } from "framer-motion";
import { Target, Eye, Rocket } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="relative py-10 px-2 lg:py-10 md:py-10 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/mission-vision.jpg')`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 w-full h-full bg-[#000]/10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/*MISSION STATMENT*/}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#fff]/40 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#fff] rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-primary-600 tracking-[0.2rem] uppercase">
                Our Mission
              </h3>
            </div>
            <blockquote className="relative border-l-4 border-[#FB923C] pl-4 md:pl-6">
              <p className="text-primary-600/90 leading-relaxed text-lg text-justify">
                <span className="font-bold uppercase">
                  <i> Sourcing It Right First As A Standard, not A slogan.</i>
                </span>
              </p>
            </blockquote>
            <p className="text-[#000]/90 py-5 leading-relaxed mt-4 text-left sm:text-left text-justify lg:text-justify">
            
              At KB Meridian, we exist for one reason: to make sure the supply
              chain is never the reason an operation stalls. Our purpose is
              sourcing it right, so the industries that build Ghana never have
              to slow down. This is our why, and it shapes every order we
              source, every relationship we build, and every partner we serve.
              
            </p>
          </motion.div>

          {/*VISION STATMENT*/}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#fff]/50 backdrop-blur-sm rounded-2xl p-8 md:p-10 text-white border border-white/20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <Eye className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-primary-600 uppercase tracking-[0.2rem]">
                Our Vision
              </h3>
            </div>
            <blockquote className="relative border-l-4 border-[#FB923C] pl-4 md:pl-6">
              <p className="text-primary-600/90 py-2 uppercase leading-relaxed font-bold text-lg text-justify">
                <i>
                  {" "}
                  To be Ghana's most trusted household name in industrial
                  sourcing.
                </i>
              </p>
            </blockquote>
            <p className="text-[#000]/90 py-5 leading-relaxed text-lg text-left sm:text-left ext-justify lg:text-justify">
              
              At Meridian, we make procurement simple. We source industrial
              products, project materials, office supplies, and everyday
              business essentials for companies across Ghana. <br /> From urgent
              site requirements to regular office needs, we focus on finding the
              right products from reliable suppliers, at competitive prices, and
              delivering them when they're needed. We don't just supply. We
              understand what you need, source it carefully, and see it through.
             
            </p>
          </motion.div>
        </div>

        {/*COMMIMENT STATMENT*/}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <Rocket className="h-6 w-6 text-primary-600" />
            </div>

            <h3 className="text-lg font-bold text-primary-600 uppercase tracking-[0.2rem]">
              Our Commitment
            </h3>
          </div>
          <blockquote className="relative border-l-4 border-[#FB923C] pl-4 md:pl-6">
            <p className="text-[#000]/90 leading-relaxed ">
              We understand that every business depends on timely access to
              quality products. Our commitment is to simplify procurement by
              providing reliable sourcing, responsive service, and products that
              meet the highest standards of quality and performance.
            </p>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}

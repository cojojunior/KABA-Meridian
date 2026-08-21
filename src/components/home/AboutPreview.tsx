import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

const features = [
  {
    icon: Award,
    title: "Quality Products",
    description:
      "We source from trusted manufacturers to ensure the highest quality standards.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Our experienced team understands your industrial procurement needs.",
  },
  {
    icon: Target,
    title: "Tailored Solutions",
    description:
      "We provide flexible procurement solutions customized for your business.",
  },
  {
    icon: Heart,
    title: "Partnership Focus",
    description:
      "We build long-term partnerships based on trust and reliability.",
  },
];

export default function AboutPreview() {
  return (
    <section
      className="relative py-10 sm:py-5 md:py-10 lg:py-10 overflow-hidden"
      style={{
        backgroundImage: "url(/about.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-[#000]/70"></div>
      {/* About Us Heading */}

      <div className="container-custom relative z-10 lg:py-1">
        <div>
          <h2 className="text-sm text-center font-bold text-white uppercase tracking-[0.5em] mb-2">
            About <span className="text-accent-400">Us</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center px-2 py-1 ">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            {/* Main Heading with Meridian in Corsiva */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4  leading-tight">
              SOURCE IT RIGHT{" "}
              <span className="block md:inline">SUPPLY CHAIN SOLVED</span>{" "}
            </h3>

            <p className="text-lg text-white/90 leading-relaxed mb-6">
              We are committed to simplifying industrial procurement for
              businesses across Ghana.
            </p>
            <p className="text-white/80 leading-relaxed mb-8">
              We serve mining companies, construction firms, manufacturing
              industries, logistics companies, government institutions, and
              other commercial organizations.
            </p>
            <Link to="/about">
              <Button
                variant="primary"
                size="lg"
                className="gap-2 bg-accent-400 text-white hover:bg-accent-400/80">
                Learn More
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#000]/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <h4 className="font-bold text-white">{feature.title}</h4>
                </div>
                <p className="text-sm text-white/80 ml-0">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

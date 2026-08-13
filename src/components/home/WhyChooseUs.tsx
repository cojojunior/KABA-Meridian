import { motion } from "framer-motion";
import {
  Shield,
  DollarSign,
  Box,
  Truck,
  Headphones,
  Handshake,
} from "lucide-react";
import { Section } from "@/components/ui/Section";

// Define the type for position
type Position = "left" | "right";

interface InfoNodeData {
  id: number;
  icon: any;
  title: string;
  description: string;
  position: Position;
}

interface InfoNodeProps {
  icon: any;
  title: string;
  description: string;
  position: Position;
  index: number;
}

const infoNodes: InfoNodeData[] = [
  {
    id: 1,
    icon: Shield,
    title: "QUALITY PRODUCTS",
    description:
      "Products from trusted manufacturers meeting highest quality standards.",
    position: "left",
  },
  {
    id: 2,
    icon: DollarSign,
    title: "COMPETITIVE PRICING",
    description:
      "Cost-effective solutions without compromising on quality or service.",
    position: "left",
  },
  {
    id: 3,
    icon: Box,
    title: "ONE TRUSTED SUPPLIER",
    description:
      "Single source for multiple product categories, simplifying procurement.",
    position: "left",
  },
  {
    id: 4,
    icon: Truck,
    title: "FAST DELIVERY",
    description:
      "Timely delivery to keep your operations running without interruption.",
    position: "right",
  },
  {
    id: 5,
    icon: Headphones,
    title: "PROFESSIONAL SUPPORT",
    description:
      "Dedicated customer service team ready to assist with your needs.",
    position: "right",
  },
  {
    id: 6,
    icon: Handshake,
    title: "LONG-TERM PARTNERSHIP",
    description:
      "Building lasting relationships focused on your operational success.",
    position: "right",
  },
];

const InfoNode = ({
  icon: Icon,
  title,
  description,
  position,
  index,
}: InfoNodeProps) => {
  const isLeft = position === "left";
  const nodeIndex = isLeft ? index : index - 3;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: nodeIndex * 0.1 }}
      className={`flex items-center gap-4 md:gap-5 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      }`}>
      {/* Icon Circle */}
      <div className="relative flex-shrink-0">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border-2 border-[#E99A3A] shadow-lg shadow-gray-200/50 flex items-center justify-center">
          <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#222222] stroke-[1.5]" />
        </div>
        {/* Decorative ring */}
        <div className="absolute inset-[-4px] rounded-full border border-[#D9D9D9]/50"></div>
      </div>

      {/* Text Content */}
      <div className={`${isLeft ? "text-left" : "text-right"} flex-1`}>
        <h4 className="text-xs md:text-sm font-bold text-[#222222] uppercase tracking-wide">
          {title}
        </h4>
        <p className="text-[10px] md:text-xs text-[#858585] leading-relaxed mt-0.5 max-w-[180px] md:max-w-[220px]">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default function WhyChooseUs() {
  const leftNodes = infoNodes.filter((n) => n.position === "left");
  const rightNodes = infoNodes.filter((n) => n.position === "right");

  return (
    <Section background="white" className="py-8 md:py-12 lg:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Top Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12">
          <h2 className="text-xs md:text-sm font-bold text-primary-600 uppercase tracking-[0.1em]">
            Why Choose Us
            </h2><br />
            <p className="font-bold tracking-[0.2em]">Your Trusted Procurement Partner</p>
            <p className="text-primary-600/50 tracking-[0em]">
              We deliver quality, reliability, and value to support your
              operational success.
            </p>
          
        </motion.div>

        {/* Main Layout */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          {/* Left Nodes */}
          <div className="flex flex-col gap-6 md:gap-8 w-full md:w-[280px] lg:w-[320px] order-2 md:order-1">
            {leftNodes.map((node, index) => (
              <InfoNode
                key={node.id}
                icon={node.icon}
                title={node.title}
                description={node.description}
                position={node.position}
                index={index}
              />
            ))}
          </div>

          {/* Center Circle */}
          <div className="order-1 md:order-2 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative">
              {/* Connector Lines - SVG overlay */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 300 300"
                preserveAspectRatio="none">
                {/* Left side lines */}
                <polyline
                  points="0,45 80,45 110,75"
                  stroke="#E99A3A"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="0,150 80,150 110,150"
                  stroke="#E87E32"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="0,255 80,255 110,225"
                  stroke="#D85A43"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Right side lines */}
                <polyline
                  points="300,45 220,45 190,75"
                  stroke="#E99A3A"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="300,150 220,150 190,150"
                  stroke="#E87E32"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="300,255 220,255 190,225"
                  stroke="#D85A43"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Main Circle */}
              <div className="relative z-10 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
                {/* Outer rings */}
                <div className="absolute inset-0 rounded-full border-2 border-[#E99A3A] shadow-xl shadow-gray-200/50"></div>
                <div className="absolute inset-[-6px] rounded-full border border-[#D9D9D9]"></div>
                <div className="absolute inset-[-12px] rounded-full border border-[#D9D9D9]/50"></div>

                {/* Inner white circle */}
                <div className="absolute inset-[8px] rounded-full bg-white shadow-inner shadow-gray-100 flex items-center justify-center">
                  <div className="text-center px-3">
                    <h3 className="text-sm md:text-base lg:text-lg font-bold text-[#222222] uppercase leading-tight tracking-wide">
                      WHY CHOOSE
                    </h3>
                    <h3 className="text-sm md:text-base lg:text-lg font-bold text-[#222222] uppercase leading-tight tracking-wide">
                      US?
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Nodes */}
          <div className="flex flex-col gap-6 md:gap-8 w-full md:w-[280px] lg:w-[320px] order-3">
            {rightNodes.map((node, index) => (
              <InfoNode
                key={node.id}
                icon={node.icon}
                title={node.title}
                description={node.description}
                position={node.position}
                index={index + 3}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

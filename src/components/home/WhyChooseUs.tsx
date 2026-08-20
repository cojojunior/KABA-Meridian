import { motion } from "framer-motion";
import {
  Shield,
  DollarSign,
  Box,
  Truck,
  Headphones,
  Handshake,
} from "lucide-react";

const reasons = [
  {
    id: 1,
    icon: Shield,
    title: "Quality Products",
    description:
      "Products from trusted manufacturers meeting highest quality standards.",
    color: "#155DFC",
  },
  {
    id: 2,
    icon: Headphones,
    title: "Professional Support",
    description:
      "Dedicated customer service team ready to assist with your needs.",
    color: "#E7000B",
  },
  {
    id: 3,
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Timely delivery to keep your operations running without interruption.",
    color: "#F54900",
  },
  {
    id: 4,
    icon: Box,
    title: "One Trusted Supplier",
    description:
      "Single source for multiple product categories, simplifying procurement.",
    color: "#9810FA",
  },
  {
    id: 5,
    icon: DollarSign,
    title: "Competitive Pricing",
    description:
      "Cost-effective solutions without compromising on quality or service.",
    color: "#00A63E",
  },
  {
    id: 6,
    icon: Handshake,
    title: "Long-term Partnership",
    description:
      "Building lasting relationships focused on your operational success.",
    color: "#05383F",
  },
];

const InfoCard = ({
  icon: Icon,
  title,
  description,
  color,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  color: string;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-[#000]/30 backdrop-blur-sm rounded-xl p-5 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-lg transition-shadow duration-300 border border-white/20">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-white rounded-xl shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] flex items-center justify-center">
            <Icon className="w-6 h-6" strokeWidth={1.5} style={{ color }} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-white mb-1 tracking-wider">{title}</h4>
          <p className="text-sm text-white/80 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function WhyChooseUs() {
  // Split cards into two rows of 3
  const topRowCards = reasons.slice(0, 3);
  const bottomRowCards = reasons.slice(3, 6);

  return (
    <section className="w-full py-12 px-4 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/whybg.jpg')`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 w-full h-full bg-[#000]/70" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Two Column Layout: Header | SVG */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8">
          {/* Left Column: Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center">
            <h2 className="text-[#FB923C] text-3xl font-semibold uppercase tracking-[0.7px] mb-2">
              Why Choose Us
            </h2> <br />
            <h3 className="text-white text-3xl md:text-4xl font-bold mb-3">
              Your Trusted Partner to source it <i className="text-accent-400"> RIGHT  </i>  the First Time
            </h3>
            <p className="text-white/70 text-lg max-w-lg">
              We deliver quality, reliability, and value to support your
              operational success.
            </p>
          </motion.div>

          {/* Right Column: SVG Infographic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-sm w-full max-w-[531px] border border-white/10">
              <svg
                width="531"
                height="485"
                viewBox="0 0 531 485"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto">
                <defs>
                  <clipPath id="hex-top-left">
                    <rect
                      width="161"
                      height="183"
                      fill="white"
                      transform="translate(90, 0)"
                    />
                  </clipPath>
                  <clipPath id="hex-top-right">
                    <rect
                      width="161"
                      height="183"
                      fill="white"
                      transform="translate(275, 0)"
                    />
                  </clipPath>
                  <clipPath id="hex-middle-left">
                    <rect
                      width="161"
                      height="183"
                      fill="white"
                      transform="translate(0, 151)"
                    />
                  </clipPath>
                  <clipPath id="hex-middle-right">
                    <rect
                      width="161"
                      height="183"
                      fill="white"
                      transform="translate(370, 151)"
                    />
                  </clipPath>
                  <clipPath id="hex-bottom-left">
                    <rect
                      width="161"
                      height="183"
                      fill="white"
                      transform="translate(90, 302)"
                    />
                  </clipPath>
                  <clipPath id="hex-bottom-right">
                    <rect
                      width="161"
                      height="183"
                      fill="white"
                      transform="translate(275, 302)"
                    />
                  </clipPath>
                  <clipPath id="hex-center">
                    <rect
                      width="183"
                      height="183"
                      fill="white"
                      transform="translate(170, 151)"
                    />
                  </clipPath>
                </defs>

                {/* Top Left - Shield centered */}
                <g clipPath="url(#hex-top-left)">
                  <path
                    d="M248.5 135.855L170.5 180.352L92.5 135.855L92.5 46.7991L170.5 2.30225L248.5 46.7991V135.855Z"
                    fill="rgba(255,255,255,0.05)"
                    stroke="#E4C19D"
                    strokeWidth="4"
                  />
                  <g transform="translate(125.5, 50.5)">
                    <Shield size={90} strokeWidth={2} color="#155DFC" />
                  </g>
                </g>

                {/* Top Right - Headphones centered */}
                <g clipPath="url(#hex-top-right)">
                  <path
                    d="M433.5 135.855L355.5 180.352L277.5 135.855L277.5 46.7991L355.5 2.30225L433.5 46.7991V135.855Z"
                    fill="rgba(255,255,255,0.05)"
                    stroke="#E4C19D"
                    strokeWidth="4"
                  />
                  <g transform="translate(310.5, 50.5)">
                    <Headphones size={90} strokeWidth={2} color="#E7000B" />
                  </g>
                </g>

                {/* Middle Left - Truck centered */}
                <g clipPath="url(#hex-middle-left)">
                  <path
                    d="M158.5 286.855L80.5 331.352L2.5 286.855L2.5 197.8L80.5 153.303L158.5 197.8V286.855Z"
                    fill="rgba(255,255,255,0.05)"
                    stroke="#E4C19D"
                    strokeWidth="4"
                  />
                  <g transform="translate(40.5, 200.5)">
                    <Truck size={90} strokeWidth={2} color="#F54900" />
                  </g>
                </g>

                {/* Center - Logo */}
                <g clipPath="url(#hex-center)">
                  <foreignObject x="185" y="165" width="153" height="153">
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src="/KABA.svg"
                        alt="KABA Meridian Logo"
                        className="w-32 h-32 object-contain"
                      />
                    </div>
                  </foreignObject>
                </g>

                {/* Middle Right - Box centered */}
                <g clipPath="url(#hex-middle-right)">
                  <path
                    d="M528.5 286.855L450.5 331.352L372.5 286.855L372.5 197.8L450.5 153.303L528.5 197.8V286.855Z"
                    fill="rgba(255,255,255,0.05)"
                    stroke="#E4C19D"
                    strokeWidth="4"
                  />
                  <g transform="translate(405.5, 200.5)">
                    <Box size={90} strokeWidth={2} color="#9810FA" />
                  </g>
                </g>

                {/* Bottom Left - DollarSign centered */}
                <g clipPath="url(#hex-bottom-left)">
                  <path
                    d="M248.5 437.855L170.5 482.352L92.5 437.855L92.5 348.8L170.5 304.303L248.5 348.8V437.855Z"
                    fill="rgba(255,255,255,0.05)"
                    stroke="#E4C19D"
                    strokeWidth="4"
                  />
                  <g transform="translate(125.5, 350.5)">
                    <DollarSign size={90} strokeWidth={2} color="#00A63E" />
                  </g>
                </g>

                {/* Bottom Right - Handshake centered */}
                <g clipPath="url(#hex-bottom-right)">
                  <path
                    d="M433.5 437.855L355.5 482.352L277.5 437.855L277.5 348.8L355.5 304.303L433.5 348.8V437.855Z"
                    fill="rgba(255,255,255,0.05)"
                    stroke="#E4C19D"
                    strokeWidth="4"
                  />
                  <g transform="translate(315.5, 350.5)">
                    <Handshake size={90} strokeWidth={2} color="#05383F" />
                  </g>
                </g>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row: 2 rows of 3 cards */}
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {topRowCards.map((reason, index) => (
            <InfoCard
              key={reason.id}
              icon={reason.icon}
              title={reason.title}
              description={reason.description}
              color={reason.color}
              delay={0.1 + index * 0.08}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {bottomRowCards.map((reason, index) => (
            <InfoCard
              key={reason.id}
              icon={reason.icon}
              title={reason.title}
              description={reason.description}
              color={reason.color}
              delay={0.2 + index * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section spacing="xl" background="gray">
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <h1 className="text-8xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-secondary-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/">
              <Button variant="primary" size="lg" className="gap-2">
                <Home className="h-5 w-5" />
                Go Home
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="gap-2">
                <ArrowLeft className="h-5 w-5" />
                Contact Support
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

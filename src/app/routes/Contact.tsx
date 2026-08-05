import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";

export default function Contact() {
  return (
    <>
      <Section background="gray" spacing="xl">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-600 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-secondary-600 leading-relaxed">
              Get in touch with us for all your industrial procurement needs.
            </p>
          </motion.div>
        </div>
      </Section>

      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                  placeholder="Tell us about your procurement needs"
                />
              </div>
              <Button variant="primary" size="lg" className="w-full gap-2">
                Send Message
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <Card variant="shadow">
                <CardContent className="p-2">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary-50 text-primary-600 flex-shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">
                        Address
                      </h4>
                      <p className="text-secondary-600">Accra, Ghana</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="shadow">
                <CardContent className="p-2">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary-50 text-primary-600 flex-shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">
                        Phone
                      </h4>
                      <p className="text-secondary-600">+233 20 123 4567</p>
                      <p className="text-secondary-600">+233 24 123 4567</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="shadow">
                <CardContent className="p-2">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary-50 text-primary-600 flex-shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">
                        Email
                      </h4>
                      <p className="text-secondary-600">
                        kabameridian@gmail.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="shadow">
                <CardContent className="p-2">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary-50 text-primary-600 flex-shrink-0">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">
                        Business Hours
                      </h4>
                      <p className="text-secondary-600">
                        Monday - Friday: 8:00 AM - 6:00 PM
                      </p>
                      <p className="text-secondary-600">
                        Saturday: 9:00 AM - 2:00 PM
                      </p>
                      <p className="text-secondary-600">Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Quote CTA */}
      <Section background="primary" spacing="xl">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            Need a Quick Quote?
          </h2>
          <p className="text-lg text-secondary-600 mb-8">
            Contact us today for a competitive quotation and let us help you
            source the products your business needs.
          </p>
          <Button variant="accent" size="lg" className="gap-2">
            Request a Quote
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </Section>
    </>
  );
}

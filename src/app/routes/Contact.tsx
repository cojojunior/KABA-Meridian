import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRateLimit } from "@/hooks/useRateLimit"; // <-- ADDED

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product_interest: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { checkRateLimit, isLoading: rateLimitLoading } = useRateLimit(); // <-- ADDED

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  // Send quotation to Supabase
  const sendToSupabase = async (data: typeof formData) => {
    try {
      const { error: supabaseError } = await supabase
        .from("quotations")
        .insert([
          {
            name: data.name,
            email: data.email,
            phone: data.phone || null,
            company: data.company || null,
            product_interest: data.product_interest || null,
            message: data.message,
            status: "pending",
          },
        ]);

      if (supabaseError) throw supabaseError;
      return true;
    } catch (err) {
      console.error("Supabase error:", err);
      throw err;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      // <-- RATE LIMITING START -->
      const identifier = formData.email;

      const rateLimitResult = await checkRateLimit(
        identifier,
        "quote_submission",
        5,
        15,
      );

      if (!rateLimitResult.allowed) {
        setError(
          rateLimitResult.message ||
            "Too many requests. Please try again later.",
        );
        setIsSending(false);
        return;
      }
      // <-- RATE LIMITING END -->

      // Send to Supabase
      await sendToSupabase(formData);

      setIsSent(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        product_interest: "",
        message: "",
      });

      setTimeout(() => {
        setIsSent(false);
      }, 5000);
    } catch (err) {
      setError("Failed to send quotation request. Please try again.");
      console.error("Submission error:", err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Section
        spacing="xl"
        className="bg-primary-600/10 py-5 px-2 lg:py-15 text-primary-600">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Request a Quote
            </h1>
            <p className="text-xl leading-relaxed">
              Get a competitive quotation for your industrial procurement needs.
            </p>
          </motion.div>
        </div>
      </Section>

      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Quotation Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Request a Quote
            </h2>
            <p className="text-secondary-600 mb-6">
              Fill in the form below and we'll get back to you with a
              competitive quotation for your industrial products.
            </p>

            {isSent && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <FileText className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-800 font-medium">
                    Quotation Request Sent!
                  </p>
                  <p className="text-green-600 text-sm">
                    We'll get back to you shortly.
                  </p>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <div className="text-red-600 text-sm">{error}</div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-[#05383f] focus:ring-2 focus:ring-[#05383f]/20 transition-colors"
                  placeholder="Enter your full name"
                  required
                  disabled={isSending}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-[#05383f] focus:ring-2 focus:ring-[#05383f]/20 transition-colors"
                  placeholder="Enter your email address"
                  required
                  disabled={isSending}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-[#05383f] focus:ring-2 focus:ring-[#05383f]/20 transition-colors"
                  placeholder="Enter your phone number"
                  disabled={isSending}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-[#05383f] focus:ring-2 focus:ring-[#05383f]/20 transition-colors"
                  placeholder="Enter your company name"
                  disabled={isSending}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Product Interest
                </label>
                <select
                  name="product_interest"
                  value={formData.product_interest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-[#05383f] focus:ring-2 focus:ring-[#05383f]/20 transition-colors bg-white"
                  disabled={isSending}>
                  <option value="">Select a product category...</option>
                  <option value="PPE">
                    Personal Protective Equipment (PPE)
                  </option>
                  <option value="Consumables">Industrial Consumables</option>
                  <option value="Tools">Industrial Tools</option>
                  <option value="Office">Office Supplies</option>
                  <option value="Plumbing">Plumbing Materials</option>
                  <option value="Workwear">Workwear & Uniforms</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Message / Requirements *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-[#05383f] focus:ring-2 focus:ring-[#05383f]/20 transition-colors"
                  placeholder="Tell us about your procurement needs and requirements"
                  required
                  disabled={isSending}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full gap-2"
                disabled={isSending || rateLimitLoading}>
                {" "}
                {/* <-- CHANGED: added rateLimitLoading */}
                {isSending ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Sending...
                  </>
                ) : isSent ? (
                  <>
                    <FileText className="h-5 w-5" />
                    Request Sent!
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Request Quote
                  </>
                )}
              </Button>
              <p className="text-xs text-secondary-500 text-center mt-4">
                <span className="inline-flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  Your quotation request will be saved and reviewed by our team.
                </span>
              </p>
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
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
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
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary-50 text-primary-600 flex-shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">
                        Phone
                      </h4>
                      <a
                        href="tel:+233201234567"
                        className="text-secondary-600 hover:text-primary-600 transition-colors block">
                        +233 20 123 4567
                      </a>
                      <a
                        href="tel:+233241234567"
                        className="text-secondary-600 hover:text-primary-600 transition-colors block">
                        +233 24 123 4567
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary-50 text-primary-600 flex-shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">
                        Email
                      </h4>
                      <a
                        href="mailto:kabameridian@gmail.com"
                        className="text-secondary-600 hover:text-primary-600 transition-colors">
                        kabameridian@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
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
      <Section
        spacing="xl"
        className="bg-primary-600/10 text-primary-600 py-5 lg:py-5">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Need a Quick Quote?</h2>
          <p className="text-lg text-primary-600/80 mb-8">
            Contact us today for a competitive quotation and let us help you
            source the products your business needs.
          </p>
          <a href="mailto:kabameridian@gmail.com">
            <Button variant="accent" size="lg" className="gap-2">
              <FileText className="h-5 w-5" />
              Request a Quote
            </Button>
          </a>
        </div>
      </Section>
    </>
  );
}

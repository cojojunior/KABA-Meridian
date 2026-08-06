import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Email redirect with form data
  const handleSendEmail = () => {
    const subject = `Procurement Inquiry from ${formData.name || "Customer"}`;
    const body = `Name: ${formData.name || "Not provided"}
Email: ${formData.email || "Not provided"}
Phone: ${formData.phone || "Not provided"}

Message:
${formData.message || "I would like to request a quote for industrial procurement."}

---
This message was sent from the KABA Meridian website contact form.`;

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const emailUrl = `mailto:kabameridian@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
    window.location.href = emailUrl;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSending(true);

    // Simulate sending delay for better UX
    setTimeout(() => {
      handleSendEmail();
      setIsSending(false);
      setIsSent(true);

      // Reset form after sending
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      // Reset sent status after 5 seconds
      setTimeout(() => {
        setIsSent(false);
      }, 5000);
    }, 500);
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl leading-relaxed">
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
            <p className="text-secondary-600 mb-6">
              Fill in the form below and we'll get back to you promptly. Your
              message will be sent directly to kabameridian@gmail.com
            </p>
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
                  className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
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
                  className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
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
                  className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                  placeholder="Enter your phone number"
                  disabled={isSending}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                  placeholder="Tell us about your procurement needs"
                  required
                  disabled={isSending}
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full gap-2"
                disabled={isSending}>
                {isSending ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Sending...
                  </>
                ) : isSent ? (
                  <>
                    <span>✓</span>
                    Sent Successfully!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-5 w-5" />
                  </>
                )}
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
              Request a Quote
              <Send className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </Section>
    </>
  );
}

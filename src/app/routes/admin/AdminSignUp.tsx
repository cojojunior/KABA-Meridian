import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  LogIn,
  AlertCircle,
  User,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";

export default function AdminSignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      // 1. Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            role: "admin",
          },
        },
      });

      if (authError) {
        console.error("Auth error:", authError);

        // Handle specific error cases
        if (authError.message.includes("User already registered")) {
          setError("This email is already registered. Please login instead.");
        } else {
          setError(
            authError.message || "Failed to create account. Please try again.",
          );
        }
        setLoading(false);
        return;
      }

      if (authData.user) {
        console.log("User created successfully:", authData.user);

        // 2. Show success message
        setSuccess(true);

        // 3. Auto-login after successful signup
        setTimeout(async () => {
          try {
            const { error: loginError } =
              await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
              });

            if (loginError) {
              console.error("Auto-login error:", loginError);
              // Still redirect to login page
              navigate("/admin/login");
            } else {
              navigate("/admin");
            }
          } catch (err) {
            navigate("/admin/login");
          }
        }, 2000);
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(
        err.message || "An unexpected error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#05383f] to-[#0f172a] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/KABA.svg" alt="KABA Meridian" className="h-12 w-12" />
            <div>
              <span className="text-2xl font-corsiva text-primary-1">
                Meridian
              </span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Create Admin Account
          </h2>
          <p className="text-white/70 mt-2">
            Register to manage your dashboard
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Account Created! 🎉
              </h3>
              <p className="text-white/70 mb-6">
                Your admin account has been created successfully.
                <br />
                You will be redirected to the dashboard shortly.
              </p>
              <div className="animate-pulse text-white/50 text-sm">
                Redirecting...
              </div>
            </motion.div>
          ) : (
            <>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-200 text-sm">{error}</p>
                    {error.includes("already registered") && (
                      <Link
                        to="/admin/login"
                        className="text-red-300 text-sm hover:underline mt-1 block">
                        Click here to login →
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSignUp} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-[#05383f] focus:ring-2 focus:ring-[#05383f]/20 transition-colors"
                      placeholder="Enter your full name"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-[#05383f] focus:ring-2 focus:ring-[#05383f]/20 transition-colors"
                      placeholder="Enter your email"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-[#05383f] focus:ring-2 focus:ring-[#05383f]/20 transition-colors"
                      placeholder="Enter your password (min 6 characters)"
                      required
                      disabled={loading}
                    />
                  </div>
                  <p className="text-white/40 text-xs mt-1">
                    Password must be at least 6 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-[#05383f] focus:ring-2 focus:ring-[#05383f]/20 transition-colors"
                      placeholder="Confirm your password"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full gap-2"
                  disabled={loading}>
                  {loading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-white/50 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/admin/login"
                    className="text-primary-400 hover:text-primary-300 transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
            </>
          )}

          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-white/60 hover:text-white transition-colors text-sm inline-flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

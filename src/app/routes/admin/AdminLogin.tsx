import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Check if user is admin (you can add a role check here)
        navigate("/admin");
      }
    } catch (err: any) {
      setError(
        err.message || "Failed to login. Please check your credentials.",
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
                {" "}
                Meridian
              </span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Login</h2>
          <p className="text-white/70 mt-2">Sign in to manage your dashboard</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-[#05383f] focus:ring-2 focus:ring-[#05383f]/20 transition-colors"
                  placeholder="Enter your password"
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
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-white/60 hover:text-white transition-colors text-sm">
              ← Back to Website
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

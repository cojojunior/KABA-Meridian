import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Add debug logs to check if variables are loaded
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key exists:", !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables!");
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file.",
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export as default (for import supabase from "@/lib/supabase")
export default supabase;

// Also export as named (for import { supabase } from "@/lib/supabase")
export { supabase };

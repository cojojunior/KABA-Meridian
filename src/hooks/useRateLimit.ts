import { useState, useCallback } from "react";
import { supabase } from "../lib/supabase";

interface RateLimitState {
  allowed: boolean;
  message: string;
  remaining?: number;
}

export const useRateLimit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkRateLimit = useCallback(
    async (
      identifier: string,
      actionType: string,
      maxRequests: number = 5,
      windowMinutes: number = 15,
    ): Promise<RateLimitState> => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("🔍 Checking rate limit:", {
          identifier,
          actionType,
          maxRequests,
          windowMinutes,
        });

        const { data, error } = await supabase.rpc(
          "check_rate_limit_with_message",
          {
            p_identifier: identifier,
            p_action_type: actionType,
            p_max_requests: maxRequests,
            p_window_minutes: windowMinutes,
          },
        );

        console.log("📊 Rate limit response:", data);

        if (error) {
          console.error("❌ Rate limit error:", error);
          throw error;
        }

        return data;
      } catch (err: any) {
        console.error("❌ Rate limit catch error:", err);
        setError(err.message);
        return {
          allowed: false,
          message: err.message || "Rate limit check failed",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { checkRateLimit, isLoading, error };
};

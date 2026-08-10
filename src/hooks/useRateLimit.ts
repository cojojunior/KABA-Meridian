import { useState, useCallback, useRef } from "react";
import { supabase } from "../lib/supabase";

interface RateLimitState {
  allowed: boolean;
  message: string;
  retryAfter?: number;
  remaining?: number;
}

export const useRateLimit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cache = useRef<Map<string, { expiry: number; count: number }>>(
    new Map(),
  );

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
        const cacheKey = `${identifier}-${actionType}`;
        const cached = cache.current.get(cacheKey);
        const now = Date.now();
        const windowMs = windowMinutes * 60 * 1000;

        if (cached) {
          // Check if cache is still valid
          if (now < cached.expiry) {
            // Still within window
            if (cached.count >= maxRequests) {
              const retryAfter = Math.ceil((cached.expiry - now) / 1000);
              return {
                allowed: false,
                message: `Rate limit exceeded. Please try again in ${retryAfter} seconds.`,
                retryAfter,
                remaining: 0,
              };
            }
            // Increment count
            cached.count++;
            cache.current.set(cacheKey, cached);
            return {
              allowed: true,
              message: "Request allowed",
              remaining: maxRequests - cached.count,
            };
          }
          // Cache expired, remove it
          cache.current.delete(cacheKey);
        }

        // If not in cache or expired, check database
        const { data, error } = await supabase.rpc(
          "check_rate_limit_with_message",
          {
            p_identifier: identifier,
            p_action_type: actionType,
            p_max_requests: maxRequests,
            p_window_minutes: windowMinutes,
          },
        );

        if (error) throw error;

        // Update cache with the result
        if (data.allowed) {
          cache.current.set(cacheKey, {
            expiry: now + windowMs,
            count: 1,
          });
        } else {
          cache.current.set(cacheKey, {
            expiry: now + windowMs,
            count: maxRequests,
          });
        }

        return data;
      } catch (err: any) {
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

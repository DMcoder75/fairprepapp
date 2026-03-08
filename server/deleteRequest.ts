import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables on server");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const deleteRequestRouter = router({
  submitRequest: publicProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        email: z.string().email(),
        reason: z.string().min(1),
        otherReasonDetail: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { data, error } = await supabase.from("vk_delete_requests").insert([
          {
            user_id: input.userId,
            user_email: input.email,
            reason: input.reason,
            other_reason_detail: input.otherReasonDetail || null,
            created_at: new Date().toISOString(),
            processed: false,
          },
        ]);

        if (error) {
          throw new Error(`Supabase error: ${error.message}`);
        }

        return {
          success: true,
          data,
        };
      } catch (error) {
        console.error("Error submitting delete request:", error);
        throw error;
      }
    }),
});

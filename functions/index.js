import functions from "firebase-functions";
import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());

// Initialize Supabase client with FP_ prefixed environment variables
const supabaseUrl = process.env.FP_SUPABASE_URL;
const supabaseKey = process.env.FP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials. Please set FP_SUPABASE_URL and FP_SUPABASE_ANON_KEY environment variables.");
}

const supabase = createClient(supabaseUrl || "", supabaseKey || "");

/**
 * Submit a deletion request
 * POST /api/deleteRequest/submit
 */
app.post("/api/deleteRequest/submit", async (req, res) => {
  try {
    const { userId, email, reason, otherReasonDetail } = req.body;

    // Validate required fields
    if (!userId || !email || !reason) {
      return res.status(400).json({
        error: "Missing required fields: userId, email, reason",
      });
    }

    // Validate reason
    const validReasons = [
      "I am not interested",
      "I found a better application",
      "It is very expensive",
      "It is slow",
      "It doesn't have features I want",
      "Other reason",
    ];

    if (!validReasons.includes(reason)) {
      return res.status(400).json({
        error: `Invalid reason. Must be one of: ${validReasons.join(", ")}`,
      });
    }

    // If reason is "Other reason", otherReasonDetail is required
    if (reason === "Other reason" && !otherReasonDetail) {
      return res.status(400).json({
        error: "otherReasonDetail is required when reason is 'Other reason'",
      });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("vk_delete_requests")
      .insert([
        {
          user_id: userId,
          user_email: email,
          reason: reason,
          other_reason_detail: otherReasonDetail || null,
          created_at: new Date().toISOString(),
          processed: false,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: "Failed to submit deletion request",
        details: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Deletion request submitted successfully",
      data: data[0],
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * Health check endpoint
 * GET /api/health
 */
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    supabaseConnected: !!supabaseUrl && !!supabaseKey,
  });
});

/**
 * Get deletion requests (admin only)
 * GET /api/deleteRequest/list
 * Requires admin authentication
 */
app.get("/api/deleteRequest/list", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("vk_delete_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: "Failed to fetch deletion requests",
        details: error.message,
      });
    }

    return res.json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * Mark deletion request as processed
 * PATCH /api/deleteRequest/:id/process
 * Requires admin authentication
 */
app.patch("/api/deleteRequest/:id/process", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Missing required parameter: id",
      });
    }

    const { data, error } = await supabase
      .from("vk_delete_requests")
      .update({
        processed: true,
        processed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: "Failed to update deletion request",
        details: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        error: "Deletion request not found",
      });
    }

    return res.json({
      success: true,
      message: "Deletion request marked as processed",
      data: data[0],
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * Mark deletion request as deleted
 * PATCH /api/deleteRequest/:id/delete
 * Requires admin authentication
 */
app.patch("/api/deleteRequest/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Missing required parameter: id",
      });
    }

    const { data, error } = await supabase
      .from("vk_delete_requests")
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: "Failed to update deletion request",
        details: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        error: "Deletion request not found",
      });
    }

    return res.json({
      success: true,
      message: "Deletion request marked as deleted",
      data: data[0],
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Export the Express app as a Cloud Function
export const api = functions.https.onRequest(app);

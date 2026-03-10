import functions from "firebase-functions";
import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();

// ===== CORS Middleware =====
app.use((req, res, next) => {
  // Allow requests from any origin
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// ===== Supabase Client Initialization =====
const supabaseUrl = process.env.FP_SUPABASE_URL;
const supabaseKey = process.env.FP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials!");
  console.error("   FP_SUPABASE_URL:", supabaseUrl ? "✅ Set" : "❌ Missing");
  console.error("   FP_SUPABASE_ANON_KEY:", supabaseKey ? "✅ Set" : "❌ Missing");
}

const supabase = createClient(supabaseUrl || "", supabaseKey || "");

// ===== Health Check Endpoint =====
/**
 * GET /api/health
 * Returns the health status of the Cloud Function
 */
app.get("/health", (req, res) => {
  console.log("📊 Health check requested");
  
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    supabaseConnected: !!supabaseUrl && !!supabaseKey,
    environment: {
      supabaseUrl: supabaseUrl ? "✅ Set" : "❌ Missing",
      supabaseKey: supabaseKey ? "✅ Set" : "❌ Missing",
    },
  });
});

// ===== Submit Deletion Request =====
/**
 * POST /api/deleteRequest/submit
 * Submit a deletion request to the database
 */
app.post("/deleteRequest/submit", async (req, res) => {
  try {
    console.log("📝 Deletion request received");
    
    const { userId, email, reason, otherReasonDetail } = req.body;

    // Validate required fields
    if (!userId || !email || !reason) {
      console.warn("⚠️  Missing required fields:", { userId: !!userId, email: !!email, reason: !!reason });
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
      console.warn("⚠️  Invalid reason:", reason);
      return res.status(400).json({
        error: `Invalid reason. Must be one of: ${validReasons.join(", ")}`,
      });
    }

    // If reason is "Other reason", otherReasonDetail is required
    if (reason === "Other reason" && !otherReasonDetail) {
      console.warn("⚠️  Other reason selected but no detail provided");
      return res.status(400).json({
        error: "otherReasonDetail is required when reason is 'Other reason'",
      });
    }

    console.log("💾 Inserting into Supabase...");

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
      console.error("❌ Supabase error:", error);
      return res.status(500).json({
        error: "Failed to submit deletion request",
        details: error.message,
      });
    }

    console.log("✅ Deletion request submitted successfully:", data[0]?.id);

    return res.status(201).json({
      success: true,
      message: "Deletion request submitted successfully",
      data: data[0],
    });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// ===== List Deletion Requests (Admin) =====
/**
 * GET /api/deleteRequest/list
 * Get all deletion requests (admin only)
 */
app.get("/deleteRequest/list", async (req, res) => {
  try {
    console.log("📋 List deletion requests requested");
    
    const { data, error } = await supabase
      .from("vk_delete_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Supabase error:", error);
      return res.status(500).json({
        error: "Failed to fetch deletion requests",
        details: error.message,
      });
    }

    console.log(`✅ Retrieved ${data.length} deletion requests`);

    return res.json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// ===== Mark as Processed =====
/**
 * PATCH /api/deleteRequest/:id/process
 * Mark a deletion request as processed
 */
app.patch("/deleteRequest/:id/process", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Missing required parameter: id",
      });
    }

    console.log(`⚙️  Marking deletion request as processed: ${id}`);

    const { data, error } = await supabase
      .from("vk_delete_requests")
      .update({
        processed: true,
        processed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("❌ Supabase error:", error);
      return res.status(500).json({
        error: "Failed to update deletion request",
        details: error.message,
      });
    }

    if (!data || data.length === 0) {
      console.warn("⚠️  Deletion request not found:", id);
      return res.status(404).json({
        error: "Deletion request not found",
      });
    }

    console.log("✅ Deletion request marked as processed");

    return res.json({
      success: true,
      message: "Deletion request marked as processed",
      data: data[0],
    });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// ===== Mark as Deleted =====
/**
 * PATCH /api/deleteRequest/:id/delete
 * Mark a deletion request as deleted
 */
app.patch("/deleteRequest/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Missing required parameter: id",
      });
    }

    console.log(`🗑️  Marking deletion request as deleted: ${id}`);

    const { data, error } = await supabase
      .from("vk_delete_requests")
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("❌ Supabase error:", error);
      return res.status(500).json({
        error: "Failed to update deletion request",
        details: error.message,
      });
    }

    if (!data || data.length === 0) {
      console.warn("⚠️  Deletion request not found:", id);
      return res.status(404).json({
        error: "Deletion request not found",
      });
    }

    console.log("✅ Deletion request marked as deleted");

    return res.json({
      success: true,
      message: "Deletion request marked as deleted",
      data: data[0],
    });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// ===== 404 Handler =====
app.use((req, res) => {
  console.warn("⚠️  404 Not Found:", req.method, req.path);
  res.status(404).json({
    error: "Not Found",
    path: req.path,
    method: req.method,
  });
});

// ===== Error Handler =====
app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

// Export the Express app as a Cloud Function
export const api = functions.https.onRequest(app);

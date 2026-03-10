const CLOUD_FUNCTION_URL = "https://us-central1-studentkonnectcom.cloudfunctions.net/api";

async function testWithDiagnostics() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  Cloud Function Detailed Diagnostics");
  console.log("═══════════════════════════════════════════════════════\n");

  // Test 1: Health Check
  console.log("1️⃣  Testing Health Check Endpoint...");
  try {
    const response = await fetch(`${CLOUD_FUNCTION_URL}/health`);
    console.log(`   Status: ${response.status} ${response.statusText}`);
    console.log(`   Content-Type: ${response.headers.get("content-type")}`);
    
    const text = await response.text();
    console.log(`   Response Length: ${text.length} bytes`);
    
    if (response.headers.get("content-type")?.includes("application/json")) {
      const data = JSON.parse(text);
      console.log("   ✅ Response is valid JSON:");
      console.log(`   ${JSON.stringify(data, null, 6)}`);
    } else {
      console.log("   ❌ Response is NOT JSON (likely HTML error page)");
      console.log(`   First 200 chars: ${text.substring(0, 200)}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 2: Deletion Request
  console.log("\n2️⃣  Testing Deletion Request Endpoint...");
  try {
    const payload = {
      userId: "550e8400-e29b-41d4-a716-446655440000",
      email: "test@example.com",
      reason: "I am not interested",
    };

    const response = await fetch(`${CLOUD_FUNCTION_URL}/deleteRequest/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log(`   Status: ${response.status} ${response.statusText}`);
    console.log(`   Content-Type: ${response.headers.get("content-type")}`);

    const text = await response.text();
    console.log(`   Response Length: ${text.length} bytes`);

    if (response.headers.get("content-type")?.includes("application/json")) {
      const data = JSON.parse(text);
      console.log("   ✅ Response is valid JSON:");
      console.log(`   ${JSON.stringify(data, null, 6)}`);
    } else {
      console.log("   ❌ Response is NOT JSON (likely HTML error page)");
      console.log(`   First 200 chars: ${text.substring(0, 200)}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  console.log("\n═══════════════════════════════════════════════════════");
  console.log("  Diagnostics Complete");
  console.log("═══════════════════════════════════════════════════════\n");
}

testWithDiagnostics();

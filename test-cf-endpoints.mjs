const CLOUD_FUNCTION_URL = "https://us-central1-studentkonnectcom.cloudfunctions.net/api";

async function testEndpoints() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  Testing Cloud Function Endpoints");
  console.log("═══════════════════════════════════════════════════════\n");

  const endpoints = [
    { method: "GET", path: "/health", description: "Health check" },
    { method: "GET", path: "", description: "Root endpoint" },
    { method: "POST", path: "/deleteRequest/submit", description: "Submit deletion request" },
    { method: "POST", path: "/submit", description: "Direct submit" },
  ];

  for (const endpoint of endpoints) {
    console.log(`\n🔍 Testing: ${endpoint.method} ${endpoint.path}`);
    console.log(`   Description: ${endpoint.description}`);
    
    try {
      const url = `${CLOUD_FUNCTION_URL}${endpoint.path}`;
      console.log(`   URL: ${url}`);
      
      const options = {
        method: endpoint.method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (endpoint.method === "POST") {
        options.body = JSON.stringify({
          userId: "test-user-123",
          email: "test@example.com",
          reason: "I am not interested",
        });
      }

      const response = await fetch(url, options);
      console.log(`   Status: ${response.status} ${response.statusText}`);
      console.log(`   Content-Type: ${response.headers.get("content-type")}`);

      const text = await response.text();
      console.log(`   Response Length: ${text.length} bytes`);

      try {
        const data = JSON.parse(text);
        console.log(`   ✅ Response (JSON):`);
        console.log(`   ${JSON.stringify(data, null, 6)}`);
      } catch {
        console.log(`   Response (Text): ${text.substring(0, 150)}`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
  }

  console.log("\n═══════════════════════════════════════════════════════");
  console.log("  Testing Complete");
  console.log("═══════════════════════════════════════════════════════\n");
}

testEndpoints();

/**
 * Test script to verify Cloud Function connectivity
 * Run with: node test-cloud-function.mjs
 */

const CLOUD_FUNCTION_URL = "https://us-central1-studentkonnectcom.cloudfunctions.net/api";

async function testHealthCheck() {
  console.log("🔍 Testing Cloud Function Health Check...");
  try {
    const response = await fetch(`${CLOUD_FUNCTION_URL}/health`);
    const data = await response.json();
    console.log("✅ Health Check Passed:");
    console.log(JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("❌ Health Check Failed:");
    console.error(error.message);
    return false;
  }
}

async function testDeletionRequest() {
  console.log("\n🔍 Testing Deletion Request Submission...");
  try {
    const payload = {
      userId: "test-user-123",
      email: "test@example.com",
      reason: "I am not interested",
      otherReasonDetail: null,
    };

    console.log("📤 Sending payload:");
    console.log(JSON.stringify(payload, null, 2));

    const response = await fetch(`${CLOUD_FUNCTION_URL}/deleteRequest/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Deletion Request Submitted Successfully:");
      console.log(JSON.stringify(data, null, 2));
      return true;
    } else {
      console.error("❌ Deletion Request Failed:");
      console.error(JSON.stringify(data, null, 2));
      return false;
    }
  } catch (error) {
    console.error("❌ Deletion Request Error:");
    console.error(error.message);
    return false;
  }
}

async function runTests() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  Cloud Function Connectivity Test");
  console.log("═══════════════════════════════════════════════════════");
  console.log(`\n🌐 Cloud Function URL: ${CLOUD_FUNCTION_URL}\n`);

  const healthPassed = await testHealthCheck();
  const deletionPassed = await testDeletionRequest();

  console.log("\n═══════════════════════════════════════════════════════");
  console.log("  Test Summary");
  console.log("═══════════════════════════════════════════════════════");
  console.log(`Health Check: ${healthPassed ? "✅ PASSED" : "❌ FAILED"}`);
  console.log(`Deletion Request: ${deletionPassed ? "✅ PASSED" : "❌ FAILED"}`);
  console.log("═══════════════════════════════════════════════════════\n");

  if (healthPassed && deletionPassed) {
    console.log("🎉 All tests passed! Cloud Function is working correctly.\n");
    process.exit(0);
  } else {
    console.log("⚠️  Some tests failed. Please check the Cloud Function logs.\n");
    process.exit(1);
  }
}

runTests();

const BASE_URL = "https://us-central1-studentkonnectcom.cloudfunctions.net/api";

async function testDeleteRequest() {
  console.log("Testing Deletion Request Submission\n");
  
  const payload = {
    userId: "test-user-" + Date.now(),
    email: "test@example.com",
    reason: "I am not interested",
    otherReasonDetail: null
  };

  console.log("Sending request with payload:");
  console.log(JSON.stringify(payload, null, 2));
  console.log("\n");

  try {
    const response = await fetch(`${BASE_URL}/deleteRequest/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log(`Content-Type: ${response.headers.get("content-type")}`);

    const text = await response.text();
    console.log(`Response Length: ${text.length} bytes\n`);

    try {
      const data = JSON.parse(text);
      console.log("Response (JSON):");
      console.log(JSON.stringify(data, null, 2));
    } catch {
      console.log("Response (Text):");
      console.log(text);
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

testDeleteRequest();

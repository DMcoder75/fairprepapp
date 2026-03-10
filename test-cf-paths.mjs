const BASE_URL = "https://us-central1-studentkonnectcom.cloudfunctions.net/api";

async function testPath(path, method = "GET") {
  try {
    const url = `${BASE_URL}${path}`;
    const response = await fetch(url, { method });
    const text = await response.text();
    
    console.log(`${method.padEnd(4)} ${path.padEnd(40)} → ${response.status} ${response.statusText}`);
    
    if (response.status === 200 || response.status === 201) {
      try {
        const data = JSON.parse(text);
        console.log(`     Response: ${JSON.stringify(data).substring(0, 80)}`);
      } catch {
        console.log(`     Response: ${text.substring(0, 80)}`);
      }
    }
  } catch (error) {
    console.log(`${method.padEnd(4)} ${path.padEnd(40)} → ERROR: ${error.message}`);
  }
}

async function runTests() {
  console.log("Testing Cloud Function Paths\n");
  
  // Test various path combinations
  await testPath("/", "GET");
  await testPath("/health", "GET");
  await testPath("/deleteRequest/submit", "POST");
  await testPath("/submit", "POST");
  await testPath("/delete", "POST");
  await testPath("/request", "POST");
  await testPath("/deleteRequest", "POST");
  
  console.log("\nDone!");
}

runTests();

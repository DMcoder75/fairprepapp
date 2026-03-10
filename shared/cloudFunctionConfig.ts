/**
 * Cloud Function Configuration
 * This file contains the URL for the deployed Google Cloud Function
 */

export const CLOUD_FUNCTION_CONFIG = {
  // Deployed Cloud Function URL
  baseUrl: "https://us-central1-studentkonnectcom.cloudfunctions.net/api",
  
  // API Endpoints
  endpoints: {
    submitRequest: "/deleteRequest/submit",
    health: "/health",
    listRequests: "/deleteRequest/list",
    processRequest: "/deleteRequest/:id/process",
    deleteRequest: "/deleteRequest/:id/delete",
  },
};

/**
 * Get the full URL for an endpoint
 */
export function getCloudFunctionUrl(endpoint: keyof typeof CLOUD_FUNCTION_CONFIG.endpoints): string {
  return `${CLOUD_FUNCTION_CONFIG.baseUrl}${CLOUD_FUNCTION_CONFIG.endpoints[endpoint]}`;
}

/**
 * Submit a deletion request to the Cloud Function
 */
export async function submitDeletionRequest(payload: {
  userId: string;
  email: string;
  reason: string;
  otherReasonDetail?: string;
}) {
  const url = getCloudFunctionUrl("submitRequest");
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Check Cloud Function health
 */
export async function checkCloudFunctionHealth() {
  const url = getCloudFunctionUrl("health");
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Health check failed: HTTP ${response.status}`);
  }

  return response.json();
}

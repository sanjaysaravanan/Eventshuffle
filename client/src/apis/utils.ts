const API_URL = process.env.API_URL || "http://localhost:8000/api/v1";

// Simple function to handle the API request
// handle path, payload and parsing

const PAYLOAD_METHODS = ["POST", "PUT", "PATCH"];

export const handleApi = async (
  path: string,
  reqOptions?: RequestInit,
  payload?: unknown
) => {
  const response = await fetch(`${API_URL}/${path}`, {
    ...(reqOptions || {}),
    body: PAYLOAD_METHODS.includes(reqOptions?.method || "")
      ? JSON.stringify(payload || "")
      : undefined,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  return await response.json();
};

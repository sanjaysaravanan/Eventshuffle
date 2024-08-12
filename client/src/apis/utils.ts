const API_URL = process.env.BE_URL;

// Simple function to handle the API request
// handle path, payload and parsing

const PAYLOAD_METHODS = ["POST", "PUT", "PATCH"];

export const handleApi = async (
  path: string,
  reqOptions?: RequestInit,
  payload?: unknown
) => {
  try {
    const response = await fetch(`${API_URL}/${path}`, {
      ...(reqOptions || {}),
      body: PAYLOAD_METHODS.includes(reqOptions?.method || "")
        ? JSON.stringify(payload || "")
        : undefined,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: localStorage.getItem("token") || "",
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return await response.json();
    } else {
      const { msg = "" } = await response.json();
      throw new Error(msg);
    }
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

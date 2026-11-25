const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export class HttpError extends Error {
	constructor(message, status) {
		super(message);
		this.name = "HttpError";
		this.status = status;
	}
}

export async function http(path, { method = "GET", body } = {}) {
	let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new HttpError("Can't reach the server. Is json-server running on port 3001?", 0);
  }
  if (!response.ok) {
    throw new HttpError(`Request failed (${response.status})`, response.status);
  }
  return response.json();
}

export type ChatResponse = {
  reply: string;
  items: string[];
};

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const BASE_URL = "http://localhost:8000";
const PATH = "/chat";

export async function sendChat(text: string): Promise<ChatResponse> {
  let res: Response;

  try {
    res = await fetch(`${BASE_URL}${PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch {
    throw new ApiError("无法连接后端服务，请确认 FastAPI 已在 8000 端口启动");
  }

  if (!res.ok) {
    let detail = `请求失败（HTTP ${res.status}）`;
    try {
      const body: unknown = await res.json();
      if (
        typeof body === "object" &&
        body !== null &&
        "detail" in body &&
        typeof (body as { detail: unknown }).detail === "string"
      ) {
        detail = (body as { detail: string }).detail;
      }
    } catch {

    }
    throw new ApiError(detail, res.status);
  }

  return (await res.json()) as ChatResponse;
}
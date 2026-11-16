from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()


app.add_middleware(
   CORSMiddleware,
   allow_origins=["http://localhost:3000"], 
   allow_methods=["POST"],
   allow_headers=["Content-Type"],
)


history: list[str] = []

class ChatIn(BaseModel):
    text: str = Field(min_length=1, max_length=200)

@app.post("/chat")
def chat(data: ChatIn):
    text = data.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="信息不能为空")
    history.append(text)
    return {
        "reply": f"已收到：{text}",
        "items": history,
    }

# 实验 2 专用：reply 故意返回数字
@app.post("/chat-bad")
def chat_bad(data: ChatIn):
    return {"reply": 123, "items": ["a"]}

# 实验 1 专用：500 + 非 JSON 响应体
@app.post("/boom")
def boom():
    return Response(
        content="Internal Server Error",
        status_code=500,
        media_type="text/plain",
    )
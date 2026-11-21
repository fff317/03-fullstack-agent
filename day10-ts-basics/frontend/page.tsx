"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { sendChat } from "./chat";

export default function Page() {
  const [text, setText] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = text.trim();

    // 实验 4：空输入
    if (!value) {
      setError("请先输入内容再提交");
      return;
    }

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const data = await sendChat(value);

      // 实验 2 就靠下面这一行「炸」
      setReply(data.reply.toUpperCase());
      setItems(data.items);

      setText("");
    } catch (err) {
      // ←继续：所有失败都收敛到这里
      setError(
        err instanceof Error
          ? err.message
          : "提交失败，请稍后重试"
      );
    } finally {
      // ←继续：无论成功失败都会执行，保证按钮不会永远卡在「提交中」
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "30px", maxWidth: 560 }}>
      <h1>信息管理</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="message"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="请输入信息"
        />

        <button type="submit" disabled={loading}>
          {loading ? "提交中..." : "提交"}
        </button>
      </form>

      {/* 后端回执 */}
      {reply && <p>{reply}</p>}

      {/* 错误提示：必须是人能看懂的一句话 */}
      {error && (
        <p role="alert" style={{ color: "#b00020" }}>
          {error}
        </p>
      )}

      <h2>信息列表</h2>

      <ul>
        {(items ?? []).map((item, index) => (
          <li key={`${index}-${item}`}>{item}</li>
        ))}
      </ul>
    </main>
  );
}

"use client";

import { useState } from "react";
import MessageBubble from "./MessageBubble";
import { Message } from "@/types/chat";

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: data.reply,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMsg]);

    setInput("");
  };

  return (
    <div className="max-w-3xl mx-auto p-5 space-y-4">
      <div className="space-y-2 min-h-[400px]">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border p-3 rounded w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Dubai properties..."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-700 text-white px-6 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
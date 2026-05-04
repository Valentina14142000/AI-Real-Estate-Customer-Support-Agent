import { Message } from "@/types/chat";

export default function MessageBubble({ msg }: { msg: Message }) {
  return (
    <div
      className={`p-3 rounded-lg max-w-xl ${
        msg.role === "user"
          ? "bg-blue-500 text-white ml-auto"
          : "bg-white text-black"
      }`}
    >
      {msg.content}
    </div>
  );
}
import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Loader2, MessageSquarePlus, Send, Sparkles, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterPrompts = [
  "What are Sanjeevan's main skills?",
  "Show me the best projects.",
  "How can I contact him?",
];

export default function PortfolioAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I’m Sanjeevan’s portfolio assistant. Ask me about skills, projects, services, or contact details.",
    },
  ]);
  const endRef = useRef<HTMLDivElement | null>(null);

  const hasMessages = useMemo(() => messages.length > 1, [messages.length]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const body = await response.text();
      const data = body ? JSON.parse(body) : null;

      if (!response.ok) {
        if (response.status === 502 || response.status === 503) {
          throw new Error("The portfolio server is not running. Start it with npm run dev:server.");
        }
        throw new Error(data?.error || "The assistant could not respond.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: typeof data?.reply === "string" ? data.reply : "I could not generate a reply right now.",
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong while contacting the assistant.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-950/90 px-4 py-3 text-sm font-semibold text-white shadow-2xl shadow-cyan-500/20 backdrop-blur-xl transition hover:border-cyan-300 hover:text-cyan-200"
      >
        <Sparkles size={18} className="text-cyan-400" />
        Portfolio Agent
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/60 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-cyan-400/15 p-2 text-cyan-300">
                <Bot size={18} />
              </div>
              <div>
                <p className="font-semibold text-white">Portfolio Agent</p>
                <p className="text-xs text-zinc-400">Powered by NVIDIA NIM</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="max-h-[60vh] space-y-4 overflow-y-auto px-4 py-4">
            {!hasMessages && (
              <p className="text-sm text-zinc-400">
                Try one of these:
              </p>
            )}

            {!hasMessages && (
              <div className="flex flex-wrap gap-2">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-cyan-400/40 hover:text-cyan-200"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-cyan-500 text-slate-950"
                      : "bg-white/5 text-zinc-100"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 text-sm text-zinc-300">
                  <Loader2 size={16} className="animate-spin text-cyan-400" />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-white/10 p-4">
            <form
              className="flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage(input);
              }}
            >
              <button
                type="button"
                onClick={() => setMessages(messages.slice(0, 1))}
                className="rounded-2xl border border-white/10 px-3 py-3 text-zinc-300 transition hover:bg-white/5 hover:text-white"
                title="Reset chat"
              >
                <MessageSquarePlus size={18} />
              </button>
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about the portfolio..."
                rows={2}
                className="min-h-[48px] flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-cyan-400/60"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded-2xl bg-cyan-400 px-4 py-3 text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

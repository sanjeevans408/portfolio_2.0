const express = require("express");
const portfolio = require("../portfolio-context");

const router = express.Router();

const model = process.env.NVIDIA_MODEL || "meta/llama-3.1-8b-instruct";
const baseUrl = (process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1").replace(/\/$/, "");

function buildSystemPrompt() {
  return [
    "You are Sanjeevan's portfolio assistant.",
    "Help visitors understand the portfolio, skills, projects, services, and contact details.",
    "Be concise, friendly, and practical.",
    "If the answer is not in the portfolio context, say you do not know instead of inventing details.",
    "",
    `Portfolio context: ${JSON.stringify(portfolio)}`,
  ].join("\n");
}

router.post("/chat", async (req, res) => {
  const apiKey = process.env.NVIDIA_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "NVIDIA_API_KEY is missing from the server environment.",
    });
  }

  const incomingMessages = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const messages = incomingMessages
    .filter((message) => message && typeof message.content === "string")
    .slice(-12)
    .map((message) => ({
      role: message.role === "assistant" ? "assistant" : "user",
      content: message.content,
    }));

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...messages,
        ],
        temperature: 0.4,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: "NVIDIA assistant request failed.",
        details: errorText,
      });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "I could not generate a reply right now.";

    res.json({
      reply,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to reach the NVIDIA assistant service.",
      details: error.message,
    });
  }
});

module.exports = router;

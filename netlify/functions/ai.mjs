// Daily Bread AI proxy. Keeps the Anthropic API key on the server.
// Set ANTHROPIC_API_KEY in Netlify: Site configuration > Environment variables.

const MODEL_DEFAULT = process.env.DB_MODEL_DEFAULT || "claude-sonnet-5-5";
const MODEL_QUICK = process.env.DB_MODEL_QUICK || "claude-haiku-5-5";
const MAX_TEXT_CHARS = 60000;
const MAX_IMAGES = 3;
const MAX_IMAGE_B64 = 5_000_000; // ~3.7 MB per image after encoding
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const SYSTEM =
  "You are the kitchen helper inside Daily Bread, a warm home-cooking app. " +
  "Follow the formatting instructions in the user's message exactly. " +
  "For food safety, follow established USDA and FDA guidance. " +
  "Only help with food, cooking, recipes, and kitchen topics.";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Use POST." }, 405);

  // Only accept calls from this site's own pages.
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(req.url).host) return json({ error: "Forbidden." }, 403);
    } catch { return json({ error: "Forbidden." }, 403); }
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return json({ error: "ANTHROPIC_API_KEY is not set.", code: "upstream_error" }, 500);

  let body;
  try { body = await req.json(); } catch { return json({ error: "Invalid JSON.", code: "invalid_request" }, 400); }

  // Validate and merge consecutive turns from the same role.
  const raw = Array.isArray(body.messages) ? body.messages.slice(-20) : [];
  const messages = [];
  let total = 0;
  for (const m of raw) {
    if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string" || !m.content.trim()) {
      return json({ error: "Bad message.", code: "invalid_request" }, 400);
    }
    total += m.content.length;
    const last = messages[messages.length - 1];
    if (last && last.role === m.role) last.content += "\n\n" + m.content;
    else messages.push({ role: m.role, content: m.content });
  }
  if (!messages.length || messages[0].role !== "user" || messages[messages.length - 1].role !== "user") {
    return json({ error: "Conversation must start and end with the user.", code: "invalid_request" }, 400);
  }
  if (total > MAX_TEXT_CHARS) return json({ error: "Too much text.", code: "prompt_too_large" }, 413);

  // Attach images to the final user turn.
  const images = Array.isArray(body.images) ? body.images : [];
  if (images.length > MAX_IMAGES) return json({ error: "Too many images.", code: "image_rejected" }, 400);
  for (const img of images) {
    if (!img || !IMAGE_TYPES.has(img.media_type) || typeof img.data !== "string" || img.data.length > MAX_IMAGE_B64) {
      return json({ error: "Image not accepted.", code: "image_rejected" }, 400);
    }
  }
  if (images.length) {
    const last = messages[messages.length - 1];
    last.content = [
      ...images.map((img) => ({ type: "image", source: { type: "base64", media_type: img.media_type, data: img.data } })),
      { type: "text", text: last.content },
    ];
  }

  const model = body.tier === "quick" ? MODEL_QUICK : MODEL_DEFAULT;

  let r;
  try {
    r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model, max_tokens: 4000, system: SYSTEM, messages }),
    });
  } catch (e) {
    console.error("Anthropic request failed", e);
    return json({ error: "Upstream request failed.", code: "upstream_error" }, 502);
  }

  if (!r.ok) {
    const detail = await r.text().catch(() => "");
    console.error("Anthropic error", r.status, detail.slice(0, 500));
    if (r.status === 429 || r.status === 529) return json({ error: "Busy, try again soon.", code: "rate_limited" }, 429);
    return json({ error: "Upstream error.", code: "upstream_error" }, 502);
  }

  const data = await r.json();
  const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("").trim();
  if (!text) return json({ error: "Empty answer.", code: "empty_completion" }, 502);
  return json({ text, truncated: data.stop_reason === "max_tokens" });
};

export const config = {
  path: "/api/ai",
  // Per-visitor cap so a public endpoint can't run up your API bill.
  rateLimit: { windowLimit: 20, windowSize: 60, aggregateBy: ["ip", "domain"] },
};

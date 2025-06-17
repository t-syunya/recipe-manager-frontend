import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  if (!q) {
    return new Response(JSON.stringify({ error: "Missing query" }), { status: 400 });
  }

  // Google Custom Search API
  const googleKey = process.env.GOOGLE_API_KEY;
  const googleCx = process.env.GOOGLE_CX;
  if (googleKey && googleCx) {
    const googleUrl = `https://www.googleapis.com/customsearch/v1?key=${googleKey}&cx=${googleCx}&q=${encodeURIComponent(q)}`;
    const googleRes = await fetch(googleUrl);
    if (googleRes.ok) {
      const googleData = await googleRes.json();
      if (!googleData.error) {
        return new Response(JSON.stringify({ engine: "google", ...googleData }), { status: 200 });
      }
    }
  }

  // Brave Search API fallback
  const braveKey = process.env.BRAVE_API_KEY;
  if (!braveKey) {
    return new Response(JSON.stringify({ error: "No search API available" }), { status: 500 });
  }
  const braveUrl = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(q)}`;
  const braveRes = await fetch(braveUrl, {
    headers: {
      "Accept": "application/json",
      "X-Subscription-Token": braveKey,
    },
  });
  const braveData = await braveRes.json();
  return new Response(JSON.stringify({ engine: "brave", ...braveData }), { status: braveRes.status });
} 
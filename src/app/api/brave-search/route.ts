import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const q = searchParams.get("q");
	if (!q) {
		return new Response(JSON.stringify({ error: "Missing query" }), {
			status: 400,
		});
	}
	const apiKey = process.env.BRAVE_API_KEY;
	if (!apiKey) {
		return new Response(JSON.stringify({ error: "Missing BRAVE_API_KEY" }), {
			status: 500,
		});
	}
	const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(q)}`;
	const res = await fetch(url, {
		headers: {
			Accept: "application/json",
			"X-Subscription-Token": apiKey,
		},
	});
	const data = await res.json();
	return new Response(JSON.stringify(data), { status: res.status });
}

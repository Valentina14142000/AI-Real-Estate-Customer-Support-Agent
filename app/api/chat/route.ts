import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { message } = await req.json();

  // Search database
  const { data: properties } = await supabase
    .from("properties")
    .select("*");

  const listings = properties?.map((p) =>
    `${p.title} | ${p.location} | AED ${p.price} | ${p.bedrooms} BR`
  ).join("\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are Dubai Real Estate AI Assistant.

Available properties:
${listings}

Use only these listings when recommending.
Be professional and concise.
        `,
      },
      { role: "user", content: message },
    ],
  });

  return NextResponse.json({
    reply: completion.choices[0].message.content,
  });
}
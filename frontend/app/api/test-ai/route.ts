import { chatWithOpenRouter } from "@/lib/openrouter";

export async function GET() {
  const answer = await chatWithOpenRouter([
    {
      role: "user",
      content: "What is teak wood?",
    },
  ]);

  return Response.json({ answer });
}
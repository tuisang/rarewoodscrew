export async function chatWithOpenRouter(
  messages: {
    role: "system" | "user" | "assistant";
    content: string;
  }[]
) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages,
      }),
    }
  );

  const data = await response.json();

  return data.choices[0].message.content;
}
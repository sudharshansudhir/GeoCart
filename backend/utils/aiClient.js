import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function generateRecipe(prompt) {
  const systemPrompt = `
You are a recipe generator.

Rules:
- Return ONLY valid JSON
- No markdown
- No explanation
- No extra text
- return with each and every ingrediants(including chilli powder,turmeric powder etc)
- also dont mention water,cups,spoons. because they are already avail at homes. just return real needed ingrediants
- also return the name of ingrediant of masala's vegetables in a normal way (like chilli powder insited of red chilli powder. tomato insisted of large tomatoes)

JSON format:
{
  "dish": "",
  "people": number,
  "ingredients": [
    { "name": "", "quantity": "" }
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          { text: systemPrompt },
          { text: prompt }
        ]
      }
    ],
    // 🔥 THIS IS THE KEY FIX
    generationConfig: {
      temperature: 0.2
    }
  });

  const text = response.text;

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini JSON parse error:", text);
    throw new Error("Invalid AI response format");
  }
}

import Products from "../models/productSchema.js";
import generateRecipe from "../utils/aiClient.js";

export const recipeChat = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const aiResult = await generateRecipe(prompt);
    const allProducts = await Products.find();

    const available = [];
    const unavailable = [];

    aiResult.ingredients.forEach((ing) => {
      const match = allProducts.find((p) =>
        p.name.toLowerCase().includes(ing.name.toLowerCase())
      );

      if (match && match.inStock) {
        available.push({
          productId: match._id,
          name: match.name,
          requiredQty: ing.quantity,
          price: Number(match.price),
          dbQty: Number(match.quantity),
        });
      } else {
        unavailable.push({
          name: ing.name,
          requiredQty: ing.quantity,
        });
      }
    });

    res.json({
      dish: aiResult.dish,
      people: aiResult.people,
      available,
      unavailable,
    });
  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ message: "AI recipe generation failed" });
  }
};

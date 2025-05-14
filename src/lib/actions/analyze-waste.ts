"use server";

import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeWasteImage(formData: FormData) {
  try {
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return {
        success: false,
        error: "No image provided",
      };
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");
    const dataURI = `data:${imageFile.type};base64,${base64Image}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a waste analysis expert that can identify types of waste from images.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
                Analyze this image of waste material. 
                
                1. Identify what type of waste is shown in the image.
                2. Provide a detailed description of the waste.
                3. Categorize the waste into one or more of these categories: Plastic, Paper, Electronic Waste, Organic Waste, Glass, Metal, Hazardous Waste, Textile.
                
                Format your response as JSON with the following structure:
                {
                  "description": "A detailed description of the waste shown in the image",
                  "wasteTypes": ["Category1", "Category2"]
                }
                
                Only return the JSON object, nothing else.
              `,
            },
            {
              type: "image_url",
              image_url: {
                url: dataURI,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    try {
      let responseText = response.choices[0]?.message?.content || "";

      responseText = responseText
        .replace(/```json\n?|\n?```/g, "") // Remove ```json and ```
        .replace(/^\s+|\s+$/g, "") // Trim whitespace
        .replace(/\n/g, ""); // Remove newlines

      const parsedResult = JSON.parse(responseText);

      return {
        success: true,
        data: {
          description: parsedResult.description,
          wasteTypes: parsedResult.wasteTypes,
        },
      };
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      return {
        success: false,
        error: "Failed to parse analysis results",
      };
    }
  } catch (error) {
    console.error("Error analyzing image:", error);
    return {
      success: false,
      error: "Failed to analyze image",
    };
  }
}

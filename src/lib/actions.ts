"use server";

import { z } from "zod";
import { generatePetNames } from "@/ai/flows/generate-pet-names";
import { generateEnhancedPetName } from "@/ai/flows/enhanced-name-generation";
import { summarizeNameDetails } from "@/ai/flows/summarize-name-details";

const formSchema = z.object({
  species: z.string().min(1),
  breed: z.string().optional(),
  color: z.string().optional(),
  personality: z.string().min(3).max(150),
  style: z.string().min(1),
  isPremium: z.boolean().default(false),
});

export type GeneratedName = {
  name: string;
  reasoning?: string;
};

export async function generateNamesAction(
  values: z.infer<typeof formSchema>
): Promise<{ error?: string; names?: GeneratedName[] }> {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid input." };
  }

  const { isPremium, style, ...petData } = validatedFields.data;

  try {
    if (isPremium) {
      const result = await generateEnhancedPetName({
        ...petData,
        nameStyle: style,
      });
      const namesWithReasoning = result.names.map(name => ({ name, reasoning: result.reasoning }));
      return { names: namesWithReasoning };
    } else {
      const result = await generatePetNames({
        ...petData,
        style: style,
      });
      return { names: result.names.map(name => ({ name })) };
    }
  } catch (error) {
    console.error("AI name generation failed:", error);
    return { error: "Failed to generate names. Please try again." };
  }
}

export async function summarizeNameAction(
  name: string
): Promise<{ error?: string; summary?: string }> {
  if (!name) {
    return { error: "Name is required." };
  }
  try {
    const result = await summarizeNameDetails({ name });
    return { summary: result.summary };
  } catch (error) {
    console.error("AI name summarization failed:", error);
    return { error: "Failed to get name details. Please try again." };
  }
}

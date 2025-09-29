'use server';

/**
 * @fileOverview Enhanced AI name generation for premium users.
 *
 * - generateEnhancedPetName - A function that generates a pet name with enhanced options.
 * - EnhancedPetNameInput - The input type for the generateEnhancedPetName function.
 * - EnhancedPetNameOutput - The return type for the generateEnhancedPetName function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhancedPetNameInputSchema = z.object({
  species: z.string().describe('The species of the pet (e.g., dog, cat, bird).'),
  breed: z.string().describe('The breed of the pet (e.g., Labrador, Siamese).'),
  color: z.string().describe('The color of the pet (e.g., black, white, tabby).'),
  personality: z.string().describe('The personality of the pet (e.g., playful, shy, energetic).'),
  nameStyle: z.string().describe('The desired style for the pet name (e.g., mythical, elegant, historical).'),
});
export type EnhancedPetNameInput = z.infer<typeof EnhancedPetNameInputSchema>;

const EnhancedPetNameOutputSchema = z.object({
  names: z.array(
    z.string().describe('A list of potential names based on the pet data and name style.')
  ),
  reasoning: z
    .string()
    .optional()
    .describe('The reasoning behind the generated names, including style and origin.'),
});
export type EnhancedPetNameOutput = z.infer<typeof EnhancedPetNameOutputSchema>;

export async function generateEnhancedPetName(input: EnhancedPetNameInput): Promise<EnhancedPetNameOutput> {
  return enhancedPetNameFlow(input);
}

const enhancedPetNamePrompt = ai.definePrompt({
  name: 'enhancedPetNamePrompt',
  input: {schema: EnhancedPetNameInputSchema},
  output: {schema: EnhancedPetNameOutputSchema},
  prompt: `You are an expert pet name generator, skilled in creating unique and stylish names.

  Based on the following pet data, generate a list of potential names that fit the specified style. Provide several options considering different styles and origins.

  Pet Species: {{{species}}}
  Pet Breed: {{{breed}}}
  Pet Color: {{{color}}}
  Pet Personality: {{{personality}}}
  Name Style: {{{nameStyle}}}

  Consider the pet's characteristics and the desired name style to create names that resonate with the owner's preferences. Explain the reasoning behind each generated name, including its style and origin.

  Output the result as a JSON object with a "names" array of names and a "reasoning" field.
  `,
});

const enhancedPetNameFlow = ai.defineFlow(
  {
    name: 'enhancedPetNameFlow',
    inputSchema: EnhancedPetNameInputSchema,
    outputSchema: EnhancedPetNameOutputSchema,
  },
  async input => {
    const {output} = await enhancedPetNamePrompt(input);
    return output!;
  }
);

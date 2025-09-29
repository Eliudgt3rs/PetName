'use server';

/**
 * @fileOverview An AI agent for generating pet names based on pet characteristics.
 *
 * - generatePetNames - A function that generates a list of potential pet names.
 * - GeneratePetNamesInput - The input type for the generatePetNames function.
 * - GeneratePetNamesOutput - The return type for the generatePetNames function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePetNamesInputSchema = z.object({
  species: z.string().describe('The species of the pet (e.g., dog, cat, bird).'),
  breed: z.string().describe('The breed of the pet (e.g., Labrador, Siamese, Canary).'),
  color: z.string().describe('The color of the pet (e.g., black, white, tabby).'),
  personality: z.string().describe('A description of the pet’s personality (e.g., playful, shy, energetic).'),
  style: z.string().describe('The style of name desired (e.g., funny, serious, cute).'),
});
export type GeneratePetNamesInput = z.infer<typeof GeneratePetNamesInputSchema>;

const GeneratePetNamesOutputSchema = z.object({
  names: z.array(z.string()).describe('A list of potential names for the pet.'),
});
export type GeneratePetNamesOutput = z.infer<typeof GeneratePetNamesOutputSchema>;

export async function generatePetNames(input: GeneratePetNamesInput): Promise<GeneratePetNamesOutput> {
  return generatePetNamesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePetNamesPrompt',
  input: {schema: GeneratePetNamesInputSchema},
  output: {schema: GeneratePetNamesOutputSchema},
  prompt: `You are a creative pet name generator. You will receive information about a pet and generate a list of potential names that fit the pet's characteristics and the owner's preferences.  Consider the requested style when generating names.

Pet Species: {{{species}}}
Pet Breed: {{{breed}}}
Pet Color: {{{color}}}
Pet Personality: {{{personality}}}
Name Style: {{{style}}}

Generate a list of at least 5 names.`,
});

const generatePetNamesFlow = ai.defineFlow(
  {
    name: 'generatePetNamesFlow',
    inputSchema: GeneratePetNamesInputSchema,
    outputSchema: GeneratePetNamesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

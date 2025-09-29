// SummarizeNameDetails story implementation.
'use server';
/**
 * @fileOverview Provides a summary of a name's origin and meaning using an LLM.
 *
 * - summarizeNameDetails - A function that takes a name as input and returns a summary of its origin and meaning.
 * - SummarizeNameDetailsInput - The input type for the summarizeNameDetails function.
 * - SummarizeNameDetailsOutput - The return type for the summarizeNameDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeNameDetailsInputSchema = z.object({
  name: z.string().describe('The name to summarize.'),
});
export type SummarizeNameDetailsInput = z.infer<typeof SummarizeNameDetailsInputSchema>;

const SummarizeNameDetailsOutputSchema = z.object({
  summary: z.string().describe('A summary of the name, including its origin and meaning.'),
});
export type SummarizeNameDetailsOutput = z.infer<typeof SummarizeNameDetailsOutputSchema>;

export async function summarizeNameDetails(input: SummarizeNameDetailsInput): Promise<SummarizeNameDetailsOutput> {
  return summarizeNameDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeNameDetailsPrompt',
  input: {schema: SummarizeNameDetailsInputSchema},
  output: {schema: SummarizeNameDetailsOutputSchema},
  prompt: `Provide a summary of the origin and meaning of the name "{{name}}". Be concise and informative.`,
});

const summarizeNameDetailsFlow = ai.defineFlow(
  {
    name: 'summarizeNameDetailsFlow',
    inputSchema: SummarizeNameDetailsInputSchema,
    outputSchema: SummarizeNameDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

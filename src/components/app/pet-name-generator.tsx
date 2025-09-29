"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PawPrint, Sparkles, Star } from "lucide-react";
import Image from "next/image";

import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { generateNamesAction, GeneratedName } from "@/lib/actions";

import { PetNameForm } from "./pet-name-form";
import { NameResults } from "./name-results";
import { NameDetailsDialog } from "./name-details-dialog";
import { AdBanner } from "./ad-banner";

const formSchema = z.object({
  species: z.string().min(1, "Please select a species."),
  breed: z.string().optional(),
  color: z.string().optional(),
  personality: z
    .string()
    .min(3, "Tell us a bit about their personality.")
    .max(150, "Personality should be under 150 characters."),
  style: z.string().min(1, "Please select a style."),
  isPremium: z.boolean().default(false),
});

export type PetNameFormValues = z.infer<typeof formSchema>;

export function PetNameGenerator() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>([]);
  const [favoriteNames, setFavoriteNames] = useState<GeneratedName[]>([]);
  const [selectedNameForDetails, setSelectedNameForDetails] = useState<string | null>(null);

  const heroImage = PlaceHolderImages[0];

  const form = useForm<PetNameFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      species: "Dog",
      breed: "",
      color: "",
      personality: "",
      style: "Cute",
      isPremium: false,
    },
  });

  const onSubmit = (values: PetNameFormValues) => {
    startTransition(async () => {
      const result = await generateNamesAction(values);
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        setGeneratedNames(result.names || []);
      }
    });
  };

  const toggleFavorite = (name: GeneratedName) => {
    setFavoriteNames((prev) =>
      prev.some(fav => fav.name === name.name)
        ? prev.filter((fav) => fav.name !== name.name)
        : [...prev, name]
    );
  };

  const isFavorite = (name: string) => {
    return favoriteNames.some(fav => fav.name === name);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative rounded-xl overflow-hidden mb-12 bg-card p-8 md:p-12 min-h-[300px] flex flex-col justify-center">
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0"></div>
        <div className="relative z-10 text-primary-foreground max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">
            Discover the Perfect Name
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Our AI-powered generator helps you find a unique and fitting name for your beloved pet. Fill out the details below to get started!
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-1">
          <PetNameForm form={form} onSubmit={onSubmit} isPending={isPending} />
          <AdBanner />
        </div>
        <div className="lg:col-span-2 mt-8 lg:mt-0">
          <NameResults
            names={generatedNames}
            favorites={favoriteNames}
            isLoading={isPending}
            onFavoriteToggle={toggleFavorite}
            isFavorite={isFavorite}
            onShowDetails={setSelectedNameForDetails}
          />
        </div>
      </div>
      <NameDetailsDialog
        name={selectedNameForDetails}
        open={!!selectedNameForDetails}
        onOpenChange={(isOpen) => !isOpen && setSelectedNameForDetails(null)}
      />
    </div>
  );
}

"use client";

import { Heart, Info, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GeneratedName } from "@/lib/actions";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


interface NameCardProps {
  name: GeneratedName;
  onFavoriteToggle: (name: GeneratedName) => void;
  isFavorite: boolean;
  onShowDetails: (name: string) => void;
}

export function NameCard({
  name,
  onFavoriteToggle,
  isFavorite,
  onShowDetails,
}: NameCardProps) {
  const isPremium = !!name.reasoning;
  return (
    <Card className="flex flex-col justify-between transition-transform transform hover:-translate-y-1">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg font-semibold tracking-tight break-all">
          {isPremium && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Sparkles className="h-4 w-4 text-accent inline-block mr-2" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Premium Suggestion</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {name.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        {isPremium && name.reasoning && (
           <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="text-sm text-muted-foreground p-0 hover:no-underline [&[data-state=open]>svg]:text-primary">Why this name?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pt-2 pb-0">
                {name.reasoning}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
      <CardFooter className="p-2 pt-0 flex justify-end gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onShowDetails(name.name)}
              >
                <Info className="h-4 w-4" />
                <span className="sr-only">Details</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Name details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onFavoriteToggle(name)}
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    isFavorite ? "text-red-500 fill-current" : ""
                  )}
                />
                <span className="sr-only">Favorite</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFavorite ? "Unfavorite" : "Favorite"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}

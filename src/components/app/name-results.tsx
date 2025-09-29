"use client";

import { Bone, Cat, Fish } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import type { GeneratedName } from "@/lib/actions";
import { NameCard } from "./name-card";

interface NameResultsProps {
  names: GeneratedName[];
  favorites: GeneratedName[];
  isLoading: boolean;
  onFavoriteToggle: (name: GeneratedName) => void;
  isFavorite: (name: string) => boolean;
  onShowDetails: (name: string) => void;
}

export function NameResults({
  names,
  favorites,
  isLoading,
  onFavoriteToggle,
  isFavorite,
  onShowDetails,
}: NameResultsProps) {
  
  const Skeletons = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[75px] w-full rounded-xl" />
        </div>
      ))}
    </div>
  );

  const EmptyState = ({title, description, icon: Icon}: {title: string, description: string, icon: React.ElementType}) => (
    <div className="text-center bg-card p-8 rounded-xl border border-dashed">
      <div className="flex justify-center mb-4">
        <div className="bg-muted p-4 rounded-full">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-2">{description}</p>
    </div>
  );

  return (
    <Tabs defaultValue="results" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="results">Results</TabsTrigger>
        <TabsTrigger value="favorites">Favorites {favorites.length > 0 && `(${favorites.length})`}</TabsTrigger>
      </TabsList>
      <TabsContent value="results" className="mt-4">
        {isLoading ? (
          <Skeletons />
        ) : names.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in-50">
            {names.map((nameObj) => (
              <NameCard
                key={nameObj.name}
                name={nameObj}
                onFavoriteToggle={onFavoriteToggle}
                isFavorite={isFavorite(nameObj.name)}
                onShowDetails={onShowDetails}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="No names yet!" description="Fill out the form to generate some pet names." icon={Bone} />
        )}
      </TabsContent>
      <TabsContent value="favorites" className="mt-4">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((nameObj) => (
              <NameCard
                key={nameObj.name}
                name={nameObj}
                onFavoriteToggle={onFavoriteToggle}
                isFavorite={isFavorite(nameObj.name)}
                onShowDetails={onShowDetails}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="No favorites saved" description="Click the heart on a name to save it here." icon={Cat} />
        )}
      </TabsContent>
    </Tabs>
  );
}

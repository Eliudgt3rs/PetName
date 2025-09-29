import { PawPrint } from "lucide-react";

export function Header() {
  return (
    <header className="py-4 px-4 md:px-6 border-b">
      <div className="container mx-auto flex items-center gap-2">
        <PawPrint className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight font-headline">
          PetNameAI
        </h1>
      </div>
    </header>
  );
}

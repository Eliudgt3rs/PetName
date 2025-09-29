import { Megaphone } from "lucide-react";

export function AdBanner() {
  return (
    <div className="rounded-lg border-2 border-dashed border-accent/50 bg-accent/10 p-4 my-6 text-center text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-2">
        <Megaphone className="h-5 w-5 text-accent" />
        <p className="font-semibold text-accent/80">Advertisement</p>
      </div>
      <p className="mt-2">Find the best toys for your new best friend!</p>
    </div>
  );
}

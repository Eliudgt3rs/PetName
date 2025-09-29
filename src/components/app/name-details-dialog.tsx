"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { summarizeNameAction } from "@/lib/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface NameDetailsDialogProps {
  name: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NameDetailsDialog({
  name,
  open,
  onOpenChange,
}: NameDetailsDialogProps) {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open && name) {
      setIsLoading(true);
      setSummary("");
      const fetchSummary = async () => {
        const result = await summarizeNameAction(name);
        if (result.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        } else {
          setSummary(result.summary || "No details found.");
        }
        setIsLoading(false);
      };
      fetchSummary();
    }
  }, [open, name, toast]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">{name}</DialogTitle>
          <DialogDescription>
            Origin, meaning, and fun facts about this name.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <p className="text-sm text-foreground leading-relaxed">{summary}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

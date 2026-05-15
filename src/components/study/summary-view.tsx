"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, CheckCircle2 } from "lucide-react";

export function SummaryView() {
  return (
    <div className="space-y-6">
      <Card className="bg-black/40 border-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            This lecture covers the fundamental principles of cellular biology, specifically focusing on the structure and function of eukaryotic cells. The key difference between prokaryotic and eukaryotic cells is the presence of a membrane-bound nucleus and organelles.
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Key Takeaways:</h4>
            <ul className="space-y-2">
              {[
                "The Nucleus acts as the control center, containing DNA.",
                "Mitochondria are the powerhouses, generating ATP through cellular respiration.",
                "The Endoplasmic Reticulum (ER) is involved in protein and lipid synthesis.",
                "Golgi apparatus modifies, sorts, and packages proteins for secretion."
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <p>
            Understanding these components is essential for grasping more complex biological processes such as metabolism, cell signaling, and reproduction.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

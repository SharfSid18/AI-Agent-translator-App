import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TranslationCard({ translation, onReuse }) {
  if (!translation) return null;
  return (
    <Card className="p-4 glass-effect border-white/30 shadow-lg">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Arabic</div>
          <div dir="rtl" className="p-3 rounded bg-white/60 border text-gray-900">{translation.arabic_text}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Urdu</div>
          <div dir="rtl" className="p-3 rounded bg-white/60 border text-gray-900">{translation.urdu_text}</div>
        </div>
      </div>
      <div className="mt-4 text-right">
        <Button onClick={() => onReuse && onReuse(translation)}>Reuse</Button>
      </div>
    </Card>
  );
}

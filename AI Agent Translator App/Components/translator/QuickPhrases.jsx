import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const COMMON_PHRASES = [
  { arabic: "السلام عليكم", urdu: "آپ پر سلام", english: "Peace be upon you" },
  { arabic: "شكراً لك", urdu: "آپ کا شکریہ", english: "Thank you" },
  { arabic: "كيف حالك؟", urdu: "آپ کیسے ہیں؟", english: "How are you?" },
  { arabic: "أعتذر", urdu: "معذرت", english: "Sorry" },
  { arabic: "مع السلامة", urdu: "خدا حافظ", english: "Goodbye" },
  { arabic: "أهلاً وسهلاً", urdu: "خوش آمدید", english: "Welcome" },
];

export default function QuickPhrases({ onSelectPhrase }) {
  return (
    <Card className="glass-effect border-white/30 shadow-xl">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Quick Phrases
        </h3>
        <div className="grid gap-3">
          {COMMON_PHRASES.map((phrase, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => onSelectPhrase && onSelectPhrase(phrase.arabic)}
              className="h-auto p-4 glass-effect border-white/30 hover:bg-white/70 transition-all duration-200"
            >
              <div className="text-center w-full">
                <div className="arabic-font text-lg mb-1 rtl">{phrase.arabic}</div>
                <div className="urdu-font text-sm text-gray-600 rtl">{phrase.urdu}</div>
                <div className="text-xs text-gray-500 mt-1">{phrase.english}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, RotateCcw, Loader2, Save } from "lucide-react";
// Stubbed InvokeLLM import; replace with your real integration
// import { InvokeLLM } from "@/integrations/Core";
import { Translation } from "@/entities/Translation";

// Simple stub for InvokeLLM so the component doesn't break
async function InvokeLLM({ prompt }) {
  // Echo back text as "translated" for demo purposes
  const arabic = prompt.split('Arabic text:')[1] || '';
  return { translation: arabic.trim() ? "【Demo translation】 " + arabic.trim() : "" };
}

export default function TranslationArea() {
  const [arabicText, setArabicText] = useState('');
  const [urduText, setUrduText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const translateText = async (text) => {
    if (!text.trim()) {
      setUrduText('');
      return;
    }

    setIsTranslating(true);
    try {
      const response = await InvokeLLM({
        prompt: `Translate the following Arabic text to Urdu. Provide only the translation, no explanations or additional text.

Arabic text: ${text}

Requirements:
- Maintain the original meaning and context
- Use appropriate Urdu vocabulary and grammar
- Preserve any formatting or structure
- Return only the Urdu translation`,
        response_json_schema: {
          type: "object",
          properties: {
            translation: {
              type: "string",
              description: "The Urdu translation of the Arabic text"
            }
          }
        }
      });

      setUrduText(response.translation);
    } catch (error) {
      console.error('Translation error:', error);
      setUrduText('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleArabicChange = (text) => {
    setArabicText(text);
    setIsSaved(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(urduText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const clearAll = () => {
    setArabicText('');
    setUrduText('');
    setIsSaved(false);
  };

  const saveTranslation = async () => {
    if (!arabicText.trim() || !urduText.trim()) return;
    
    try {
      await Translation.create({
        arabic_text: arabicText,
        urdu_text: urduText,
        created_at: new Date().toISOString()
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 1500);
    } catch (error) {
      console.error('Failed to save translation:', error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (arabicText.trim()) {
        translateText(arabicText);
      }
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [arabicText]);

  return (
    <Card className="p-4 sm:p-6 glass-effect border-white/30 shadow-xl">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Arabic Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Arabic</label>
          <Textarea
            value={arabicText}
            onChange={(e) => handleArabicChange(e.target.value)}
            placeholder="اكتب النص العربي هنا"
            className="h-48"
            dir="rtl"
          />
        </div>

        {/* Urdu Output */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Urdu</label>
          <Textarea
            value={urduText}
            readOnly
            placeholder="اردو ترجمہ یہاں ظاہر ہوگا"
            className="h-48"
            dir="rtl"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 justify-center mt-6">
        <Button
          variant="outline"
          onClick={clearAll}
          disabled={!arabicText && !urduText}
          className="glass-effect border-white/30 hover:bg-white/70"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear All
        </Button>

        <Button
          variant="outline"
          onClick={copyToClipboard}
          disabled={!urduText || isTranslating}
          className="glass-effect border-white/30 hover:bg-white/70"
        >
          {isCopied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-600" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Urdu
            </>
          )}
        </Button>

        <Button
          onClick={saveTranslation}
          disabled={!arabicText || !urduText || isTranslating}
          className="bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 shadow-lg"
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save
            </>
          )}
        </Button>

        <Button disabled className="opacity-60">
          {isTranslating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {isTranslating ? 'Translating…' : 'Translate'}
        </Button>
      </div>
    </Card>
  );
}

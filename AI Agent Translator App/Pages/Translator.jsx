import React from 'react'; 
import TranslationArea from '../components/translator/TranslationArea';
import QuickPhrases from '../components/translator/QuickPhrases';
import { Sparkles, Zap } from 'lucide-react';

export default function Translator() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text">
              AI Translation
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience seamless Arabic to Urdu translation powered by advanced AI technology
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Zap className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-gray-600">Instant • Accurate • Beautiful</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3">
            <TranslationArea />
          </div>
          <div className="xl:col-span-1">
            <QuickPhrases onSelectPhrase={(phrase) => {
              // Hook this up to TranslationArea via state-lift if needed
              console.log('Selected phrase:', phrase);
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

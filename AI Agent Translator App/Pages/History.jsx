import React, { useState, useEffect } from 'react';
import { Translation } from '@/entities/Translation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { History as HistoryIcon, Search, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import TranslationCard from '../components/history/TranslationCard';

export default function History() {
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTranslations();
  }, []);

  const loadTranslations = async () => {
    try {
      const data = await Translation.list('-created_date');
      setTranslations(data);
    } catch (error) {
      console.error('Failed to load translations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTranslations = translations.filter(translation =>
    (translation.arabic_text || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (translation.urdu_text || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReuse = (translation) => {
    // In a real app, you'd navigate to the translator with the text pre-filled
    console.log('Reusing translation:', translation);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded-lg w-1/3"></div>
            <div className="h-12 bg-gray-200 rounded-lg"></div>
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <HistoryIcon className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">
              Translation History
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access your previous translations and reuse them anytime
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search translations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-effect border-white/30 focus:border-blue-400"
            />
          </div>
        </div>

        {/* Content */}
        {filteredTranslations.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? 'No matching translations found' : 'No translations yet'}
            </h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Start translating to see your history here'
              }
            </p>
            <Link to={createPageUrl("Translator")}>
              <Button className="bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 shadow-lg">
                Start Translating
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-sm text-gray-500 text-center">
              {filteredTranslations.length} translation{filteredTranslations.length !== 1 ? 's' : ''} found
            </div>
            {filteredTranslations.map((translation) => (
              <TranslationCard
                key={translation.id || Math.random()}
                translation={translation}
                onReuse={handleReuse}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

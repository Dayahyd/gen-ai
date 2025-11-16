import { useState } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ResponseDisplay } from './components/ResponseDisplay';
import { History } from './components/History';
import { supabase } from './lib/supabase';
import type { Generation } from './types';

function App() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [currentResponse, setCurrentResponse] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    setCurrentResponse('');

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-ai`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      setCurrentResponse(data.response);

      const { data: savedGen, error } = await supabase
        .from('generations')
        .insert([{ prompt, response: data.response }])
        .select()
        .single();

      if (!error && savedGen) {
        setGenerations(prev => [savedGen, ...prev]);
      }
    } catch (error) {
      console.error('Error generating:', error);
      setCurrentResponse('Sorry, there was an error generating the response. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const loadHistory = async () => {
    const { data, error } = await supabase
      .from('generations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (!error && data) {
      setGenerations(data);
    }
  };

  const handleShowHistory = async () => {
    if (!showHistory) {
      await loadHistory();
    }
    setShowHistory(!showHistory);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header onToggleHistory={handleShowHistory} showHistory={showHistory} />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {!showHistory ? (
          <div className="space-y-8">
            <div className="text-center space-y-4 py-12">
              <h1 className="text-5xl font-bold text-slate-800">
                Gene AI
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Your intelligent assistant powered by advanced AI. Ask anything, get instant responses.
              </p>
            </div>

            <PromptInput
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            {(currentResponse || isGenerating) && (
              <ResponseDisplay
                response={currentResponse}
                isGenerating={isGenerating}
              />
            )}
          </div>
        ) : (
          <History generations={generations} />
        )}
      </main>
    </div>
  );
}

export default App;

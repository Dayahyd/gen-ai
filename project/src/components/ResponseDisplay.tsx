import { Loader2, Sparkles } from 'lucide-react';

interface ResponseDisplayProps {
  response: string;
  isGenerating: boolean;
}

export function ResponseDisplay({ response, isGenerating }: ResponseDisplayProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Response</h3>

          {isGenerating && !response ? (
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating response...</span>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {response}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

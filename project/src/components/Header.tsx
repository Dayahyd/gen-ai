import { Sparkles, History } from 'lucide-react';

interface HeaderProps {
  onToggleHistory: () => void;
  showHistory: boolean;
}

export function Header({ onToggleHistory, showHistory }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-5xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-semibold text-slate-800">Gene AI</span>
          </div>

          <button
            onClick={onToggleHistory}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <History className="w-4 h-4" />
            <span className="text-sm font-medium">
              {showHistory ? 'New Chat' : 'History'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

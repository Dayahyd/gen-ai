import { MessageSquare, Clock } from 'lucide-react';
import type { Generation } from '../types';

interface HistoryProps {
  generations: Generation[];
}

export function History({ generations }: HistoryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-slate-600" />
        <h2 className="text-2xl font-bold text-slate-800">Conversation History</h2>
      </div>

      {generations.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">No conversations yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {generations.map((gen) => (
            <div
              key={gen.id}
              className="bg-white rounded-xl shadow border border-slate-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 mb-1">{gen.prompt}</p>
                  <p className="text-xs text-slate-500">{formatDate(gen.created_at)}</p>
                </div>
              </div>

              <div className="pl-10">
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {gen.response}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

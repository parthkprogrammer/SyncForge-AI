import { useState, useMemo } from 'react';
import { MessageSquare, Plus, Trash2, Search, X } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { Conversation } from '../types/ai.types';

interface ConversationSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onNewChat: () => void;
  onCloseMobileDrawer?: () => void;
}

export function ConversationSidebar({
  conversations,
  activeId,
  onSelect,
  onDelete,
  onNewChat,
  onCloseMobileDrawer,
}: ConversationSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Derived filtered conversations list matching search keywords
  const filteredConversations = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return conversations;
    return conversations.filter((c) => c.title.toLowerCase().includes(query));
  }, [conversations, searchTerm]);

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200 border-r border-slate-900 text-left select-none">
      
      {/* 1. Sidebar Header and Actions */}
      <div className="p-4 border-b border-slate-900 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Chat History
          </span>
          <button
            onClick={() => {
              onNewChat();
              if (onCloseMobileDrawer) onCloseMobileDrawer();
            }}
            title="Start new conversation"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900 hover:text-white transition-all focus:outline-none"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Search Input bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg bg-slate-900 border border-slate-850 px-3 py-1.5 pl-8 text-xs text-white placeholder-slate-500 focus:border-primary-500/50 focus:outline-none"
          />
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-350"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Scrollable Chats List */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-1">
        {filteredConversations.length === 0 ? (
          <div className="text-center text-xs text-slate-550 py-10 px-4">
            {searchTerm ? 'No matches found.' : 'No conversations recorded.'}
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const isActive = activeId === conv.id;
            
            return (
              <div
                key={conv.id}
                onClick={() => {
                  onSelect(conv.id);
                  if (onCloseMobileDrawer) onCloseMobileDrawer();
                }}
                className={cn(
                  'group flex items-center justify-between gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold cursor-pointer transition-all duration-150',
                  isActive
                    ? 'bg-slate-900 text-white font-bold border border-slate-850'
                    : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 border border-transparent'
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <MessageSquare className={cn('h-3.5 w-3.5 shrink-0', isActive ? 'text-primary-400' : 'text-slate-500')} />
                  <span className="truncate pr-1">{conv.title}</span>
                </div>

                {/* Delete button (visible on hover) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent select trigger
                    onDelete(conv.id);
                  }}
                  title="Delete chat"
                  className="opacity-0 group-hover:opacity-100 hover:text-error-400 text-slate-500 rounded p-0.5 focus:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

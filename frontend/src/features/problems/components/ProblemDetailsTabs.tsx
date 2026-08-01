import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import { Code, Brain, FileEdit } from 'lucide-react';

interface ProblemDetailsTabsProps {
  activeTab: 'solution' | 'ai-explanation' | 'notes';
  setActiveTab: (tab: 'solution' | 'ai-explanation' | 'notes') => void;
  solutionElement: React.ReactNode;
  aiExplanationText?: string;
  personalNotesText?: string;
}

export function ProblemDetailsTabs({
  activeTab,
  setActiveTab,
  solutionElement,
  aiExplanationText,
  personalNotesText,
}: ProblemDetailsTabsProps) {
  const tabsList = [
    { id: 'solution' as const, name: 'Solution Code', icon: Code },
    { id: 'ai-explanation' as const, name: 'AI Explanation', icon: Brain },
    { id: 'notes' as const, name: 'Revision Notes', icon: FileEdit },
  ];

  return (
    <div className="flex flex-col gap-5 text-left w-full">
      {/* 1. Tab Selector Bar */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        {tabsList.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative flex items-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors duration-150 outline-none select-none',
                isActive
                  ? 'text-primary-500 font-extrabold'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.name}</span>
              
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Tab Contents Container */}
      <div className="mt-1">
        {activeTab === 'solution' && (
          <div className="animate-fadeIn">{solutionElement}</div>
        )}
        
        {activeTab === 'ai-explanation' && (
          <div className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl animate-fadeIn">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-2.5">
              SyncForge AI Synthesis
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {aiExplanationText || 'AI explanation will be available after AI integration.'}
            </p>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl animate-fadeIn">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-2.5">
              Revision Notes
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {personalNotesText || 'Personal notes will appear here. You can add credential checklists, target schema outlines, and mapping reminders in this section.'}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

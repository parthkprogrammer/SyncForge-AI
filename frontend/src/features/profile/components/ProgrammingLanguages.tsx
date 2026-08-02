import { Card } from '../../../components/ui/Card/Card';
import { Badge } from '../../../components/ui/Badge/Badge';
import type { ProgrammingLanguage } from '../types/profile.types';

interface ProgrammingLanguagesProps {
  languages: ProgrammingLanguage[];
}

export function ProgrammingLanguages({ languages }: ProgrammingLanguagesProps) {
  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 text-left shadow-sm flex flex-col h-full">
      <Card.Header className="border-none pb-0 mb-4">
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
          Programming Languages
        </h3>
        <span className="text-[10px] text-slate-400">Activity ratios based on submissions counts</span>
      </Card.Header>

      <Card.Content className="space-y-5 flex-1 select-none">
        {languages.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400">
            No languages activity recorded.
          </div>
        ) : (
          languages.map((lang) => (
            <div key={lang.language} className="space-y-2">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-slate-850 dark:text-slate-200">
                    {lang.language}
                  </span>
                  
                  {lang.isPrimary && (
                    <Badge variant="primary" size="sm" className="text-[8px] font-bold tracking-wider py-0 px-1.5 uppercase">
                      Primary
                    </Badge>
                  )}
                </div>
                
                <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                  {lang.percentage}% <span className="text-[9px] text-slate-400 font-medium">({lang.problemsSolved} Solved)</span>
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 dark:bg-slate-800 overflow-hidden">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${lang.percentage}%` }}
                />
              </div>

            </div>
          ))
        )}
      </Card.Content>
    </Card>
  );
}

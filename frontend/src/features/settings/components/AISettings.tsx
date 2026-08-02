import { SettingsSection } from './SettingsSection';
import { SettingsRow } from './SettingsRow';
import { SettingsToggle } from './SettingsToggle';
import type { AIResponseStyle, AIExplanationLevel } from '../types/settings.types';

interface AISettingsProps {
  defaultAIMode: string;
  aiResponseStyle: AIResponseStyle;
  aiExplanationLevel: AIExplanationLevel;
  includeCodeExamples: boolean;
  includeComplexityAnalysis: boolean;
  usePersonalContext: boolean;
  onUpdate: (key: string, value: any) => void;
}

export function AISettings({
  defaultAIMode,
  aiResponseStyle,
  aiExplanationLevel,
  includeCodeExamples,
  includeComplexityAnalysis,
  usePersonalContext,
  onUpdate,
}: AISettingsProps) {
  const modesList = ['General', 'Explain', 'Optimize', 'Debug', 'Interview'];

  return (
    <SettingsSection
      title="AI Preferences"
      description="Configure explanation styles, modes, and personal RAG context settings."
    >
      <div className="space-y-4">
        
        {/* Default AI Mode */}
        <SettingsRow
          title="Default Assistant Mode"
          description="Default selected mode choice when starting new chat loops."
        >
          <select
            value={defaultAIMode}
            onChange={(e) => onUpdate('defaultAIMode', e.target.value)}
            className="bg-slate-50 border border-slate-350 dark:border-slate-800 dark:bg-slate-950 text-slate-850 dark:text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-primary-500 min-w-[120px]"
          >
            {modesList.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </SettingsRow>

        {/* Response Style */}
        <SettingsRow
          title="Response Style Length"
          description="Formatting level for conversational notes solutions reviews."
        >
          <select
            value={aiResponseStyle}
            onChange={(e) => onUpdate('aiResponseStyle', e.target.value as AIResponseStyle)}
            className="bg-slate-50 border border-slate-350 dark:border-slate-800 dark:bg-slate-950 text-slate-850 dark:text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-primary-500 min-w-[120px]"
          >
            <option value="concise">Concise (Brief highlights)</option>
            <option value="balanced">Balanced (Standard breakdown)</option>
            <option value="detailed">Detailed (Deep insights)</option>
          </select>
        </SettingsRow>

        {/* Explanation Level */}
        <SettingsRow
          title="Target Explanation Level"
          description="Tailor algorithm walkthrough terminology for beginner or expert concepts."
        >
          <select
            value={aiExplanationLevel}
            onChange={(e) => onUpdate('aiExplanationLevel', e.target.value as AIExplanationLevel)}
            className="bg-slate-50 border border-slate-350 dark:border-slate-800 dark:bg-slate-950 text-slate-850 dark:text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-primary-500 min-w-[120px]"
          >
            <option value="beginner">Beginner (Simple definitions)</option>
            <option value="intermediate">Intermediate (Standard algorithms)</option>
            <option value="advanced">Advanced (Complex heuristics)</option>
          </select>
        </SettingsRow>

        {/* Include Code Examples */}
        <SettingsRow
          title="Provide Code Examples"
          description="Include corrected or optimized coding block segments in assistant outputs."
        >
          <SettingsToggle
            checked={includeCodeExamples}
            onChange={(val) => onUpdate('includeCodeExamples', val)}
            ariaLabel="Provide Code Examples"
          />
        </SettingsRow>

        {/* Include Complexity Analysis */}
        <SettingsRow
          title="Auto Time & Space Complexities"
          description="Calculate big-O runtime equations logs automatically for every explain request."
        >
          <SettingsToggle
            checked={includeComplexityAnalysis}
            onChange={(val) => onUpdate('includeComplexityAnalysis', val)}
            ariaLabel="Auto Time & Space Complexities"
          />
        </SettingsRow>

        {/* Use Personal Coding Context */}
        <SettingsRow
          title="Personal Coding Context (RAG)"
          description="Enables reading notes data history and previously accepted sync records to customize prompt answers."
        >
          <SettingsToggle
            checked={usePersonalContext}
            onChange={(val) => onUpdate('usePersonalContext', val)}
            ariaLabel="Personal Coding Context (RAG)"
          />
        </SettingsRow>

      </div>
    </SettingsSection>
  );
}

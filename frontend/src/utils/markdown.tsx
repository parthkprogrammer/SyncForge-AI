import type { ReactNode } from 'react';
import { CodeBlock } from '../features/ai-assistant/components/CodeBlock';

export const parseInlineMarkdown = (text: string): ReactNode[] => {
  // Split by bold (**text**) and inline code (`code`)
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-bold text-slate-850 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={idx}
          className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 font-mono text-[11px] px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
};

export const renderMarkdown = (content: string): ReactNode[] => {
  // 1. Split by code blocks ```
  const segments = content.split(/```/g);
  
  return segments.map((segment, index) => {
    const isCode = index % 2 === 1;
    
    if (isCode) {
      const lines = segment.split('\n');
      const language = lines[0].trim();
      const code = lines.slice(1).join('\n').trim();
      return <CodeBlock key={index} code={code} language={language} />;
    }
    
    // 2. Parse text blocks line-by-line
    const lines = segment.split('\n');
    const parsedElements: ReactNode[] = [];
    let listItems: ReactNode[] = [];

    const flushList = (key: number) => {
      if (listItems.length > 0) {
        parsedElements.push(
          <ul key={`ul-${key}`} className="list-disc pl-5 my-3 flex flex-col gap-1.5 text-slate-650 dark:text-slate-400 text-xs">
            {listItems}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line, lineIdx) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('### ')) {
        flushList(lineIdx);
        parsedElements.push(
          <h4 key={lineIdx} className="text-sm font-bold text-slate-850 dark:text-white mt-5 first:mt-0 mb-2">
            {parseInlineMarkdown(trimmed.slice(4))}
          </h4>
        );
      } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        listItems.push(
          <li key={lineIdx} className="leading-relaxed">
            {parseInlineMarkdown(trimmed.slice(2))}
          </li>
        );
      } else if (trimmed === '') {
        flushList(lineIdx);
      } else {
        flushList(lineIdx);
        parsedElements.push(
          <p key={lineIdx} className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed mb-3 last:mb-0">
            {parseInlineMarkdown(line)}
          </p>
        );
      }
    });
    
    flushList(lines.length);
    return <div key={index}>{parsedElements}</div>;
  });
};

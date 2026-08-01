import type { FolderStrategy } from '../types/repository.types';

interface RepositoryStructurePreviewProps {
  strategy: FolderStrategy;
  repoName: string;
}

export function RepositoryStructurePreview({ strategy, repoName }: RepositoryStructurePreviewProps) {
  const getStructureText = (strat: FolderStrategy, name: string) => {
    const base = `${name}/`;

    switch (strat) {
      case 'platform':
        return `${base}
├── LeetCode/
│   ├── Two-Sum/
│   │   ├── Solution.java
│   │   └── README.md
│   │
│   └── Binary-Search/
│       ├── Solution.java
│       └── README.md`;
      case 'difficulty':
        return `${base}
├── Easy/
│   └── Two-Sum/
│       ├── Solution.java
│       └── README.md
├── Medium/
│   └── Binary-Search/
│       ├── Solution.java
│       └── README.md`;
      case 'topic':
        return `${base}
├── Arrays/
│   └── Two-Sum/
│       ├── Solution.java
│       └── README.md
├── Binary-Search/
│   └── Search-Insert/
│       ├── Solution.java
│       └── README.md`;
      case 'language':
        return `${base}
├── Java/
│   └── Two-Sum/
│       ├── Solution.java
│       └── README.md
├── Python/
│   └── Reverse-String/
│       ├── Solution.py
│       └── README.md`;
      case 'flat':
      default:
        return `${base}
├── Two-Sum.java
├── Two-Sum-README.md
├── Binary-Search.java
└── Binary-Search-README.md`;
    }
  };

  return (
    <div className="flex flex-col gap-2 text-left select-none">
      <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest px-1">
        Repository Folder Structure Preview
      </span>
      
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-[10px] text-slate-350 leading-relaxed overflow-x-auto">
        <pre className="whitespace-pre select-text">
          <code>{getStructureText(strategy, repoName)}</code>
        </pre>
      </div>

      <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal italic">
        * Folders are structured automatically upon code approvals synced from platforms.
      </p>
    </div>
  );
}

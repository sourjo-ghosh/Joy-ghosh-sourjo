import { ReactNode } from 'react';

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const TerminalWindow = ({ title = 'Terminal', children, className = '' }: TerminalWindowProps) => {
  return (
    <div className={`bg-terminal-card rounded-lg border border-terminal-text-secondary/20 overflow-hidden ${className}`}>
      <div className="bg-terminal-bg px-4 py-2 flex items-center gap-2 border-b border-terminal-text-secondary/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
          <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
          <div className="w-3 h-3 rounded-full bg-terminal-text-secondary"></div>
        </div>
        <span className="text-terminal-text-secondary text-xs font-mono ml-2">{title}</span>
      </div>
      <div className="p-4 font-mono text-terminal-text">
        {children}
      </div>
    </div>
  );
};


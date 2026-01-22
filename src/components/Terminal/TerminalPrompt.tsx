import { ReactNode } from 'react';

interface TerminalPromptProps {
  command?: string;
  user?: string;
  host?: string;
  path?: string;
  children?: ReactNode;
}

export const TerminalPrompt = ({ 
  command = '', 
  user = 'joy', 
  host = 'portfolio', 
  path = '~',
  children 
}: TerminalPromptProps) => {
  return (
    <div className="font-mono text-sm">
      <span className="text-terminal-green">{user}@{host}</span>
      <span className="text-terminal-text-secondary">:</span>
      <span className="text-terminal-success">{path}</span>
      <span className="text-terminal-text-secondary">$</span>
      {command && <span className="text-terminal-text ml-2">{command}</span>}
      {children}
    </div>
  );
};


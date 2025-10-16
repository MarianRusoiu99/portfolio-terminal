import React from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'tsx', className }) => {
  return (
    <pre className={cn('bg-secondary/50 p-4 rounded-lg overflow-x-auto text-left text-sm', className)}>
      <code className={`language-${language}`}>
        {code.trim()}
      </code>
    </pre>
  );
};

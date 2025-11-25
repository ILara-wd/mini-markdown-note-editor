'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
  truncate?: number;
}

export default function MarkdownPreview({ 
  content, 
  className = '', 
  truncate 
}: MarkdownPreviewProps) {
  // If truncate is specified, limit the content
  const displayContent = truncate && content.length > truncate 
    ? content.substring(0, truncate) + '...'
    : content;

  if (!displayContent.trim()) {
    return <span className="text-gray-500 italic">Sin contenido</span>;
  }

  return (
    <div className={`markdown-preview ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-lg font-bold mb-2 text-black">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-bold mb-2 text-black">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-bold mb-1 text-black">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mb-2 text-sm text-gray-700 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-2 space-y-0.5 text-sm text-gray-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-2 space-y-0.5 text-sm text-gray-700">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="ml-2">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-gray-400 pl-2 py-1 mb-2 bg-gray-50 italic text-gray-600 text-sm">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-gray-200 text-black px-1 py-0.5 rounded text-xs font-mono">
                {children}
              </code>
            ) : (
              <code className={`${className} text-xs`}>{children}</code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-gray-800 text-white p-2 rounded mb-2 overflow-x-auto text-xs">
              {children}
            </pre>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 underline hover:text-blue-800 text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-black">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-600">{children}</em>
          ),
        }}
      >
        {displayContent}
      </ReactMarkdown>
    </div>
  );
}
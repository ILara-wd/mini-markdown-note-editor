'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  disabled = false,
  placeholder = 'Escribe tu contenido en markdown...'
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const handleTabClick = (tab: 'edit' | 'preview') => {
    setActiveTab(tab);
  };

  return (
    <div className="border-2 border-black">
      {/* Tabs */}
      <div className="flex border-b-2 border-black">
        <button
          onClick={() => handleTabClick('edit')}
          className={`px-6 py-2 font-semibold border-r-2 border-black ${
            activeTab === 'edit'
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
          disabled={disabled}
        >
          ✏️ Editar
        </button>
        <button
          onClick={() => handleTabClick('preview')}
          className={`px-6 py-2 font-semibold ${
            activeTab === 'preview'
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
        >
          👁️ Vista Previa
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'edit' ? (
          <div className="relative">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-4 py-4 focus:outline-none resize-none min-h-[400px] font-mono text-sm"
              placeholder={placeholder}
              disabled={disabled}
            />
            {/* Markdown toolbar */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-70 hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  const bold = '**texto en negrita**';
                  onChange(value + (value ? '\n\n' : '') + bold);
                }}
                className="px-2 py-1 bg-gray-800 text-white text-xs rounded hover:bg-gray-700"
                disabled={disabled}
                title="Negrita"
              >
                B
              </button>
              <button
                onClick={() => {
                  const italic = '*texto en cursiva*';
                  onChange(value + (value ? '\n\n' : '') + italic);
                }}
                className="px-2 py-1 bg-gray-800 text-white text-xs rounded hover:bg-gray-700 italic"
                disabled={disabled}
                title="Cursiva"
              >
                I
              </button>
              <button
                onClick={() => {
                  const header = '# Título';
                  onChange(value + (value ? '\n\n' : '') + header);
                }}
                className="px-2 py-1 bg-gray-800 text-white text-xs rounded hover:bg-gray-700"
                disabled={disabled}
                title="Título"
              >
                H1
              </button>
              <button
                onClick={() => {
                  const list = '- Elemento de lista';
                  onChange(value + (value ? '\n\n' : '') + list);
                }}
                className="px-2 py-1 bg-gray-800 text-white text-xs rounded hover:bg-gray-700"
                disabled={disabled}
                title="Lista"
              >
                •
              </button>
              <button
                onClick={() => {
                  const code = '```\ncódigo\n```';
                  onChange(value + (value ? '\n\n' : '') + code);
                }}
                className="px-2 py-1 bg-gray-800 text-white text-xs rounded hover:bg-gray-700"
                disabled={disabled}
                title="Bloque de código"
              >
                &lt;/&gt;
              </button>
              <button
                onClick={() => {
                  const link = '[texto del enlace](https://ejemplo.com)';
                  onChange(value + (value ? '\n\n' : '') + link);
                }}
                className="px-2 py-1 bg-gray-800 text-white text-xs rounded hover:bg-gray-700"
                disabled={disabled}
                title="Enlace"
              >
                🔗
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 min-h-[400px] prose prose-lg max-w-none">
            {value.trim() ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mb-4 text-black border-b-2 border-black pb-2">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mb-3 text-black border-b border-black pb-1">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold mb-2 text-black">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-gray-800 leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-1 text-gray-800">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-800">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="ml-4">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-black pl-4 py-2 mb-4 bg-gray-50 italic text-gray-700">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="bg-gray-200 text-black px-1 py-0.5 rounded text-sm font-mono">
                        {children}
                      </code>
                    ) : (
                      <code className={className}>{children}</code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="bg-black text-white p-4 rounded mb-4 overflow-x-auto">
                      {children}
                    </pre>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-blue-600 underline hover:text-blue-800"
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
                    <em className="italic text-gray-700">{children}</em>
                  ),
                  table: ({ children }) => (
                    <table className="w-full border-2 border-black mb-4">
                      {children}
                    </table>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-black text-white">{children}</thead>
                  ),
                  th: ({ children }) => (
                    <th className="border border-black px-4 py-2 font-semibold text-left">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-black px-4 py-2">{children}</td>
                  ),
                }}
              >
                {value}
              </ReactMarkdown>
            ) : (
              <div className="text-gray-500 italic text-center py-16">
                No hay contenido para mostrar. Cambia a la pestaña "Editar" para agregar contenido.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Markdown help */}
      {activeTab === 'edit' && (
        <div className="border-t-2 border-black bg-gray-50 px-4 py-2">
          <details className="text-sm text-gray-600">
            <summary className="cursor-pointer font-semibold hover:text-black">
              💡 Ayuda de Markdown
            </summary>
            <div className="mt-2 space-y-1 text-xs">
              <div><code># Título</code> - Título principal</div>
              <div><code>## Subtítulo</code> - Subtítulo</div>
              <div><code>**negrita**</code> - Texto en <strong>negrita</strong></div>
              <div><code>*cursiva*</code> - Texto en <em>cursiva</em></div>
              <div><code>- Lista</code> - Elemento de lista</div>
              <div><code>1. Lista numerada</code> - Lista numerada</div>
              <div><code>[enlace](url)</code> - Crear enlace</div>
              <div><code>`código`</code> - Código inline</div>
              <div><code>```código```</code> - Bloque de código</div>
              <div><code>&gt; Cita</code> - Cita o blockquote</div>
              <div><code>| Tabla | Columna |</code> - Tabla</div>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'tailwindcss/tailwind.css'; // Asegúrate de importar Tailwind CSS

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="markdown-body text-left">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ children }) => (
            <div className="max-w-[50dvh] md:max-w-[70dvh] overflow-x-auto">
              <table className="bg-slate-400 border border-slate-600  border-none">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-600">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="py-2 px-4 border-b border-slate-400">{children}</th>
          ),
          td: ({ children }) => (
            <td className="py-2 px-4 border-b border-slate-200">{children}</td>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside">{children}</ol>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside">{children}</ul>
          ),
          li: ({ children }) => <li className="mb-2">{children}</li>,
          h3: ({ children }) => (
            <h3 className="text-lg font-extrabold mt-4 mb-2 underline">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="mb-4">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

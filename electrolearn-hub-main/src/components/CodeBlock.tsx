import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

/**
 * Simple syntax highlighting for C/C++ code using CSS classes
 * Highlights keywords, strings, comments, numbers, and function names
 */
const highlightCode = (code: string, language: string): string => {
  if (language !== "cpp" && language !== "c") {
    return code;
  }

  let highlighted = code;

  // Comments (single-line and multi-line)
  highlighted = highlighted.replace(
    /\/\/.*$/gm,
    (match) => `<span class="code-comment">${match}</span>`
  );
  highlighted = highlighted.replace(
    /\/\*[\s\S]*?\*\//g,
    (match) => `<span class="code-comment">${match}</span>`
  );

  // Strings
  highlighted = highlighted.replace(
    /"([^"\\]|\\.)*"/g,
    (match) => `<span class="code-string">${match}</span>`
  );

  // Numbers
  highlighted = highlighted.replace(
    /\b\d+(\.\d+)?\b/g,
    (match) => `<span class="code-number">${match}</span>`
  );

  // Keywords
  const keywords = [
    "void", "int", "const", "char", "bool", "float", "double",
    "if", "else", "for", "while", "do", "switch", "case", "default",
    "return", "break", "continue", "goto",
    "class", "struct", "enum", "typedef", "namespace",
    "public", "private", "protected", "static", "virtual",
    "true", "false", "nullptr", "NULL",
    "include", "define", "ifdef", "endif"
  ];

  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "g");
    highlighted = highlighted.replace(
      regex,
      (match) => `<span class="code-keyword">${match}</span>`
    );
  });

  // Functions (identifier followed by opening parenthesis)
  highlighted = highlighted.replace(
    /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g,
    (match, funcName) => {
      // Don't highlight if it's already highlighted as a keyword
      if (match.includes('class=')) return match;
      return `<span class="code-function">${funcName}</span> `;
    }
  );

  // Preprocessor directives
  highlighted = highlighted.replace(
    /^#\s*\w+/gm,
    (match) => `<span class="code-preprocessor">${match}</span>`
  );

  return highlighted;
};

/**
 * CodeBlock - Displays code with syntax highlighting and copy functionality
 * Uses CSS-based syntax highlighting (beginner-friendly, no external dependencies)
 */
const CodeBlock = ({ code, language = "cpp" }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Highlight the code
  const highlightedCode = highlightCode(code, language);

  return (
    <div className="relative rounded-xl overflow-hidden bg-code-bg border border-border/20 shadow-lg">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/10 bg-code-bg/50">
        <span className="text-sm text-code-foreground/60 font-mono uppercase">
          {language}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 text-code-foreground hover:bg-code-foreground/10 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </>
          )}
        </Button>
      </div>

      {/* Code Content */}
      <pre className="p-4 overflow-x-auto max-h-[600px] overflow-y-auto">
        <code
          className="text-sm font-mono leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>

      {/* Syntax Highlighting Styles */}
      <style>{`
        .code-keyword {
          color: hsl(var(--primary));
          font-weight: 600;
        }
        .code-string {
          color: hsl(142, 71%, 45%);
        }
        .code-comment {
          color: hsl(215, 16%, 47%);
          font-style: italic;
        }
        .code-number {
          color: hsl(221, 83%, 53%);
        }
        .code-function {
          color: hsl(45, 93%, 47%);
        }
        .code-preprocessor {
          color: hsl(271, 91%, 65%);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default CodeBlock;

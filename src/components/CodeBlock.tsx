import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code, language = "cpp" }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-code-bg">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/10">
        <span className="text-sm text-code-foreground/60 font-mono">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 text-code-foreground hover:bg-code-foreground/10"
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
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-code-foreground font-mono leading-relaxed">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";
import { useEffect, useRef } from "react";
import { resolveImage } from "../lib/content";

let mermaidCounter = 0;
let mermaidReady: Promise<typeof import("mermaid")["default"]> | null = null;

function getMermaid() {
  if (!mermaidReady) {
    mermaidReady = import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, theme: "dark" });
      return mermaid;
    });
  }
  return mermaidReady;
}

function MermaidBlock({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const id = `mermaid-${++mermaidCounter}`;
    getMermaid().then((mermaid) => {
      mermaid.render(id, code).then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg;
      });
    });
  }, [code]);

  return <div ref={ref} className="mermaid-block" />;
}

interface Props {
  content: string;
  folder: string;
}

export default function MarkdownRenderer({ content, folder }: Props) {
  const stripped = content.replace(/<!--[\s\S]*?-->/g, "");
  const components: Components = {
    img: ({ src, alt, ...props }) => {
      let resolvedSrc = src;
      if (src && !src.startsWith("http") && !src.startsWith("/")) {
        resolvedSrc = resolveImage(folder, src) ?? src;
      }
      return (
        <img src={resolvedSrc} alt={alt ?? ""} loading="lazy" {...props} />
      );
    },
    code: ({ className, children, ...props }) => {
      const lang = /language-(\w+)/.exec(className ?? "")?.[1];
      if (lang === "mermaid") {
        return <MermaidBlock code={String(children).trim()} />;
      }
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="markdown-body">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {stripped}
      </Markdown>
    </div>
  );
}

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { resolveImage } from "../lib/content";

interface Props {
  content: string;
  folder: string;
}

export default function MarkdownRenderer({ content, folder }: Props) {
  const components: Components = {
    img: ({ src, alt, ...props }) => {
      let resolvedSrc = src;
      if (src && !src.startsWith("http") && !src.startsWith("/")) {
        resolvedSrc = resolveImage(folder, src) ?? src;
      }
      return <img src={resolvedSrc} alt={alt ?? ""} loading="lazy" {...props} />;
    },
  };

  return (
    <div className="markdown-body">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </Markdown>
    </div>
  );
}

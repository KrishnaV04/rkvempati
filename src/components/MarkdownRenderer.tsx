import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";
import { resolveImage } from "../lib/content";

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
      return <img src={resolvedSrc} alt={alt ?? ""} loading="lazy" {...props} />;
    },
  };

  return (
    <div className="markdown-body">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
        {stripped}
      </Markdown>
    </div>
  );
}

import { useParams, Link } from "react-router-dom";
import { getWriting } from "../lib/content";
import MarkdownRenderer from "../components/MarkdownRenderer";

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function WritingDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const writing = slug ? getWriting(slug) : undefined;

  if (!writing) {
    return (
      <div className="not-found">
        <h1>Writing not found</h1>
        <Link to="/writing">Back to writing</Link>
      </div>
    );
  }

  return (
    <div className="writing-detail">
      <Link to="/writing" className="back-link">
        &larr; Back to writing
      </Link>
      <div className="writing-header">
        <div className="writing-header-left">
          <h1>{writing.frontmatter.title}</h1>
          {writing.frontmatter.date && (
            <time className="writing-date">
              {formatDate(writing.frontmatter.date)}
            </time>
          )}
        </div>
      </div>
      <div className="writing-body">
        <MarkdownRenderer content={writing.body} folder={writing.folder} />
      </div>
    </div>
  );
}

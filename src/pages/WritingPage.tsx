import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getWritings, resolveImage } from "../lib/content";

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function WritingPage() {
  const writings = getWritings();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return writings;
    return writings
      .filter(
        (w) =>
          w.frontmatter.title.toLowerCase().includes(q) ||
          (w.frontmatter.summary?.toLowerCase().includes(q) ?? false)
      )
      .sort((a, b) => {
        const aTitle = a.frontmatter.title.toLowerCase().includes(q) ? 0 : 1;
        const bTitle = b.frontmatter.title.toLowerCase().includes(q) ? 0 : 1;
        return aTitle - bTitle;
      });
  }, [search, writings]);

  return (
    <div className="writing-page">
      <h1>Writing</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search writing..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="writing-list">
        {filtered.map((writing) => {
          const imageUrl = writing.frontmatter.image
            ? resolveImage(writing.folder, writing.frontmatter.image)
            : undefined;

          return (
            <Link
              to={`/writing/${writing.slug}`}
              key={writing.slug}
              className="writing-card"
            >
              {imageUrl && (
                <div className="writing-card-image">
                  <img src={imageUrl} alt={writing.frontmatter.title} />
                </div>
              )}
              <div className="writing-card-body">
                <h2>{writing.frontmatter.title}</h2>
                {writing.frontmatter.summary && (
                  <p className="writing-card-summary">
                    {writing.frontmatter.summary}
                  </p>
                )}
              </div>
              <div className="writing-card-right">
                {writing.frontmatter.date && (
                  <time className="writing-card-date">
                    {formatDate(writing.frontmatter.date)}
                  </time>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

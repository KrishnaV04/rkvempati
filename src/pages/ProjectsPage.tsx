import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getProjects, resolveImage } from "../lib/content";

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ProjectsPage() {
  const projects = getProjects();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return projects;
    return projects
      .filter(
        (p) =>
          p.frontmatter.title.toLowerCase().includes(q) ||
          (p.frontmatter.summary?.toLowerCase().includes(q) ?? false)
      )
      .sort((a, b) => {
        const aTitle = a.frontmatter.title.toLowerCase().includes(q) ? 0 : 1;
        const bTitle = b.frontmatter.title.toLowerCase().includes(q) ? 0 : 1;
        return aTitle - bTitle;
      });
  }, [search, projects]);

  return (
    <div className="projects-page">
      <h1>Projects</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="project-list">
        {filtered.map((project) => {
          const imageUrl = project.frontmatter.image
            ? resolveImage(project.folder, project.frontmatter.image)
            : undefined;

          return (
            <Link
              to={`/projects/${project.slug}`}
              key={project.slug}
              className="project-card"
            >
              {imageUrl && (
                <div className="project-card-image">
                  <img src={imageUrl} alt={project.frontmatter.title} />
                </div>
              )}
              <div className="project-card-body">
                <h2>{project.frontmatter.title}</h2>
                {project.frontmatter.summary && (
                  <p className="project-card-summary">
                    {project.frontmatter.summary}
                  </p>
                )}
              </div>
              <div className="project-card-right">
                {project.frontmatter.date && (
                  <time className="project-card-date">
                    {formatDate(project.frontmatter.date)}
                  </time>
                )}
                {project.frontmatter.link && (
                  <a
                    href={project.frontmatter.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

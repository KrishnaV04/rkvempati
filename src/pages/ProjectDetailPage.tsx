import { useParams, Link } from "react-router-dom";
import { getProject } from "../lib/content";
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

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  if (!project) {
    return (
      <div className="not-found">
        <h1>Project not found</h1>
        <Link to="/projects">Back to projects</Link>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <Link to="/projects" className="back-link">
        &larr; Back to projects
      </Link>
      <div className="project-header">
        <div className="project-header-left">
          <h1>{project.frontmatter.title}</h1>
          {project.frontmatter.date && (
            <time className="project-date">
              {formatDate(project.frontmatter.date)}
            </time>
          )}
        </div>
        <div className="project-header-right">
          {project.frontmatter.link && (
            <a
              href={project.frontmatter.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-website-link"
            >
              Project Link
            </a>
          )}
        </div>
      </div>
      <div className="project-body">
        <MarkdownRenderer content={project.body} folder={project.folder} />
      </div>
    </div>
  );
}

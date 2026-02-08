import { useParams, Link } from "react-router-dom";
import { getProject } from "../lib/content";
import MarkdownRenderer from "../components/MarkdownRenderer";

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
      <h1>{project.frontmatter.title}</h1>
      <div className="project-meta">
        {project.frontmatter.date && <time>{project.frontmatter.date}</time>}
        {project.frontmatter.link && (
          <a
            href={project.frontmatter.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View source &rarr;
          </a>
        )}
      </div>
      <MarkdownRenderer content={project.body} folder={project.folder} />
    </div>
  );
}

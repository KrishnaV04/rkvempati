import { Link } from "react-router-dom";
import { getProjects, resolveImage } from "../lib/content";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="projects-page">
      <h1>Projects</h1>
      <div className="project-list">
        {projects.map((project) => {
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
                {project.frontmatter.date && (
                  <time className="project-card-date">
                    {project.frontmatter.date}
                  </time>
                )}
                {project.frontmatter.summary && (
                  <p className="project-card-summary">
                    {project.frontmatter.summary}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

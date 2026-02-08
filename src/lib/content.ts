// Frontmatter parser — does what gray-matter does, but without the Node.js dependency.
// Parses YAML-style key: "value" pairs between --- delimiters.

export interface ProjectFrontmatter {
  title: string;
  summary?: string;
  image?: string;
  link?: string;
  date?: string;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  body: string;
  folder: string;
}

function parseFrontmatter(raw: string): { attributes: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { attributes: {}, body: raw };

  const attributes: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    attributes[key] = value;
  }

  return { attributes, body: match[2] };
}

// Glob-import all markdown files from projects as raw strings
const projectMdFiles = import.meta.glob('/src/data/projects/*/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

// Glob-import all images from the data folder
const dataImages = import.meta.glob('/src/data/**/*.{png,jpg,jpeg,gif,webp,svg}', { eager: true, import: 'default' }) as Record<string, string>;

// Glob-import home markdown
const homeMdFiles = import.meta.glob('/src/data/home/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

// Resolve a relative image path (e.g. "./preview.png") given the folder of the markdown file
export function resolveImage(folder: string, relativePath: string): string | undefined {
  // Strip leading ./ if present
  const filename = relativePath.replace(/^\.\//, '');
  // Build the full source path
  const fullPath = `${folder}/${filename}`;
  return dataImages[fullPath];
}

// Get all project data
export function getProjects(): Project[] {
  const projects: Project[] = [];

  for (const [path, raw] of Object.entries(projectMdFiles)) {
    // path looks like: /src/data/projects/autonomous-robot-arm/project.md
    const parts = path.split('/');
    const slug = parts[parts.length - 2]; // folder name = slug
    const folder = parts.slice(0, -1).join('/');
    const { attributes, body } = parseFrontmatter(raw);

    projects.push({
      slug,
      frontmatter: {
        title: attributes.title || slug,
        summary: attributes.summary,
        image: attributes.image,
        link: attributes.link,
        date: attributes.date,
      },
      body,
      folder,
    });
  }

  // Sort by date descending (most recent first)
  projects.sort((a, b) => {
    if (!a.frontmatter.date) return 1;
    if (!b.frontmatter.date) return -1;
    return b.frontmatter.date.localeCompare(a.frontmatter.date);
  });

  return projects;
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

// Get homepage markdown content
export function getHomeContent(): { body: string; folder: string } {
  const entries = Object.entries(homeMdFiles);
  if (entries.length === 0) return { body: '', folder: '/src/data/home' };
  const [path, raw] = entries[0];
  const folder = path.split('/').slice(0, -1).join('/');
  return { body: raw, folder };
}

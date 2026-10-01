import type { Project } from '../data/portfolio';
import { ArrowUpRight } from './Icons';
import { ProjectVisual } from './ProjectVisual';

export function ProjectCard({ project }: { project: Project }) {
  const linkLabel = project.visual === 'performance' ? 'View case study' : 'Explore projects';

  return (
    <article className={`project-card${project.featured ? ' project-card--featured' : ''}`}>
      <div className="project-card__visual">
        <ProjectVisual type={project.visual} />
      </div>
      <div className="project-card__content">
        <div className="project-card__meta">
          <span>{project.number}</span>
          <span>{project.category}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-card__footer">
          <ul className="tag-list" aria-label="Technologies and focus areas">
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <a href="#contact" className="text-link" aria-label={`${linkLabel}: ${project.title}`}>
            {linkLabel} <ArrowUpRight />
          </a>
        </div>
      </div>
    </article>
  );
}

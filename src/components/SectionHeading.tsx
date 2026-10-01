type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  invert?: boolean;
};

export function SectionHeading({ eyebrow, title, intro, invert = false }: SectionHeadingProps) {
  return (
    <header className={`section-heading${invert ? ' section-heading--invert' : ''}`}>
      <p className="section-heading__eyebrow"><span aria-hidden="true" />{eyebrow}</p>
      <div className="section-heading__content">
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
    </header>
  );
}

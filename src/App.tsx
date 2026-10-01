import { Header } from './components/Header';
import { ArrowDown, ArrowUpRight, CheckIcon, PlusIcon } from './components/Icons';
import { ProjectBriefDialog } from './components/ProjectBriefDialog';
import { ProjectCard } from './components/ProjectCard';
import { Reveal } from './components/Reveal';
import { SectionHeading } from './components/SectionHeading';
import {
  capabilities,
  experienceAreas,
  faqs,
  problems,
  processSteps,
  projects,
} from './data/portfolio';

function HeroDashboard() {
  return (
    <div className="hero-dashboard" aria-label="Frontend developer profile summary">
      <div className="hero-dashboard__top">
        <span className="status"><i /> Available for selected projects</span>
        <span>IND / 2026</span>
      </div>
      <div className="hero-dashboard__statement">
        <span>BUILDING WITH</span>
        <strong>Precision.</strong>
        <strong>Purpose.</strong>
        <strong>Performance.</strong>
      </div>
      <div className="hero-dashboard__meta">
        <div><span>Experience</span><strong>6 years</strong></div>
        <div><span>Projects</span><strong>15+</strong></div>
        <div><span>Focus</span><strong>UI + Frontend</strong></div>
      </div>
      <div className="hero-dashboard__ticker" aria-hidden="true">
        <span>WORDPRESS</span><i />
        <span>GUTENBERG</span><i />
        <span>JAVASCRIPT</span><i />
        <span>REACT</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__eyebrow">
          <span className="eyebrow-index">01</span>
          <p>UI & Frontend Developer<br />WordPress · React · JavaScript</p>
        </div>
        <h1 id="hero-title">
          Frontend & UI Developer Building <span>Fast, Modern</span> Web Experiences
        </h1>
        <div className="hero__bottom">
          <p>I’m Arbaz Mulla, a UI Developer with 6 years of professional experience creating responsive websites and interfaces with WordPress, Gutenberg, JavaScript and React.</p>
          <div className="hero__actions">
            <a className="button button--primary" href="#work">View my work <ArrowDown /></a>
            <a className="button button--secondary" href="#contact">Let’s work together <ArrowUpRight /></a>
          </div>
        </div>
        <HeroDashboard />
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="container">
        <Reveal>
          <header className="section-heading">
            <p className="section-heading__eyebrow"><span aria-hidden="true" />Selected work</p>
            <div className="section-heading__content">
              <h2 id="work-title">Built around results,<br />not just screenshots.</h2>
              <p>Good frontend development should create measurable improvements. These selected areas show how I combine technical implementation with thoughtful UI.</p>
            </div>
          </header>
        </Reveal>
        <div className="work-grid">
          {projects.map((project) => (
            <Reveal key={project.number} className={project.featured ? 'work-grid__featured' : ''}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="work-proof">
            <p>Performance improvement on Aciana</p>
            <div><span>Desktop</span><strong>57 <i>→</i> 95</strong></div>
            <div><span>Mobile</span><strong>45 <i>→</i> 90</strong></div>
            <a className="text-link" href="#contact">Discuss a similar project <ArrowUpRight /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal>
          <div className="about__heading">
            <p className="section-heading__eyebrow"><span aria-hidden="true" />About the work</p>
            <h2 id="about-title">Websites should do more than <em>look good.</em></h2>
          </div>
        </Reveal>
        <Reveal>
          <div className="about__content">
            <p className="lead">A website can look impressive and still create a poor experience.</p>
            <p>Slow performance, inconsistent layouts, difficult content management and weak responsive design can turn good ideas into frustrating experiences.</p>
            <p>I focus on building interfaces that balance <strong>design, usability, performance and maintainability.</strong></p>
            <a className="text-link text-link--large" href="#contact">Have a website that needs improvement? <ArrowUpRight /></a>
          </div>
        </Reveal>
        <Reveal className="about__problems-wrap">
          <div className="about__problems">
            <p className="mini-label">What I help solve</p>
            <ul>
              {problems.map((problem) => (
                <li key={problem}><CheckIcon /><span>{problem}</span></li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section className="section expertise" id="expertise" aria-labelledby="expertise-title">
      <div className="container">
        <Reveal>
          <header className="section-heading section-heading--invert">
            <p className="section-heading__eyebrow"><span aria-hidden="true" />Core capabilities</p>
            <div className="section-heading__content">
              <h2 id="expertise-title">From design to a better digital experience.</h2>
              <p>Practical WordPress expertise combined with modern frontend principles—so every interface is polished, responsive, reusable and easier to maintain.</p>
            </div>
          </header>
        </Reveal>
        <div className="capabilities-list">
          {capabilities.map((capability) => (
            <Reveal key={capability.number}>
              <article className="capability-row">
                <span className="capability-row__number">{capability.number}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <span className="capability-row__icon" aria-hidden="true"><PlusIcon /></span>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="expertise__footer">
            <p>Need the right mix for your next project?</p>
            <a className="button button--light" href="#contact">Let’s work together <ArrowUpRight /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section experience" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Experience & process"
            title="Experience that connects design and development."
            intro="I’ve worked across the practical side of web development—from implementing designs and building WordPress interfaces to creating reusable components and improving performance."
          />
        </Reveal>

        <Reveal>
          <div className="metrics" aria-label="Professional experience metrics">
            <div><strong>6</strong><span>Years of professional<br />UI development</span></div>
            <div><strong>15<span>+</span></strong><span>Professional websites<br />and projects</span></div>
            <div><strong>95</strong><span>Desktop PageSpeed<br />achieved on Aciana</span></div>
          </div>
        </Reveal>

        <div className="experience-areas">
          {experienceAreas.map((area, index) => (
            <Reveal key={area.title}>
              <article>
                <span>0{index + 1}</span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="process-heading">
            <p className="section-heading__eyebrow"><span aria-hidden="true" />How I work</p>
            <h2>My approach to building better websites.</h2>
          </div>
        </Reveal>
        <div className="process-list">
          {processSteps.map((step) => (
            <Reveal key={step.number}>
              <article className="process-step">
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="faq-block">
          <Reveal>
            <div className="faq-block__heading">
              <p className="section-heading__eyebrow"><span aria-hidden="true" />Good to know</p>
              <h2>Frequently asked questions.</h2>
              <p>Answers about the projects, platforms and opportunities I work with.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details key={faq.question} name="portfolio-faq">
                  <summary><span>0{index + 1}</span>{faq.question}<PlusIcon /></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact__inner">
        <div className="contact__topline">
          <p className="section-heading__eyebrow"><span aria-hidden="true" />Start a conversation</p>
          <span>Available for selected freelance, contract & professional opportunities</span>
        </div>
        <Reveal>
          <h2 id="contact-title">Let’s build<br /><em>something better.</em></h2>
        </Reveal>
        <Reveal>
          <div className="contact__bottom">
            <p>Whether you’re launching a new website, improving an existing WordPress project or looking for a frontend developer, I can help turn requirements into a polished digital experience.</p>
            <div className="contact__actions">
              <ProjectBriefDialog />
              <a className="button button--ghost-dark" href="#work">View my portfolio <ArrowUpRight /></a>
            </div>
          </div>
        </Reveal>
        <div className="contact__principles" aria-label="Working principles">
          <span>Clear goals.</span><i />
          <span>Thoughtful UI.</span><i />
          <span>Practical development.</span><i />
          <span>Better experiences.</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <a className="brand brand--footer" href="#top" aria-label="Back to top">
          <span className="brand__mark" aria-hidden="true">AM</span>
          <span><strong>Arbaz Mulla</strong><small>UI & Frontend Developer</small></span>
        </a>
        <nav aria-label="Footer navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#expertise">Expertise</a>
          <a href="#experience">Experience</a>
        </nav>
        <a className="back-to-top" href="#top">Back to top <ArrowUpRight /></a>
      </div>
      <div className="container site-footer__legal">
        <span>© {new Date().getFullYear()} Arbaz Mulla</span>
        <span>Designed with purpose. Built for performance.</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Work />
        <About />
        <Expertise />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

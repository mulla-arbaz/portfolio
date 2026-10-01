import type { ReactNode } from 'react';
import type { Project } from '../data/portfolio';
import { CheckIcon } from './Icons';

function BrowserFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="browser-frame" role="img" aria-label={label}>
      <div className="browser-frame__bar">
        <span /><span /><span />
        <div className="browser-frame__address">arbaz / interface</div>
      </div>
      <div className="browser-frame__body">{children}</div>
    </div>
  );
}

function PerformanceVisual() {
  return (
    <BrowserFrame label="Performance report showing Aciana PageSpeed improvements to 95 on desktop and 90 on mobile">
      <div className="performance-ui">
        <div className="performance-ui__header">
          <div>
            <span className="ui-kicker">PERFORMANCE REPORT</span>
            <strong>Core experience</strong>
          </div>
          <span className="status"><i /> Optimized</span>
        </div>
        <div className="score-grid">
          <div className="score-card">
            <div className="score-ring score-ring--95"><span>95</span></div>
            <div><strong>Desktop</strong><small>from 57</small></div>
          </div>
          <div className="score-card">
            <div className="score-ring score-ring--90"><span>90</span></div>
            <div><strong>Mobile</strong><small>from 45</small></div>
          </div>
        </div>
        <div className="performance-bars" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span /><span />
        </div>
      </div>
    </BrowserFrame>
  );
}

function WordPressVisual() {
  return (
    <BrowserFrame label="Flexible WordPress and Gutenberg component system">
      <div className="blocks-ui">
        <aside>
          <span className="blocks-ui__logo">W</span>
          <span /><span /><span /><span />
        </aside>
        <div className="blocks-ui__canvas">
          <div className="blocks-ui__top"><span>PAGE / HOME</span><i>Publish</i></div>
          <div className="blocks-ui__block blocks-ui__block--hero">
            <small>HERO BLOCK</small>
            <span /><span />
            <button type="button" tabIndex={-1}>Action</button>
          </div>
          <div className="blocks-ui__columns">
            <div><CheckIcon /><span /></div>
            <div><CheckIcon /><span /></div>
            <div><CheckIcon /><span /></div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function ReactVisual() {
  return (
    <BrowserFrame label="Responsive component-based React user interface">
      <div className="react-ui">
        <div className="react-ui__rail">
          <span className="react-ui__logo">R</span>
          <i /><i /><i />
        </div>
        <div className="react-ui__main">
          <div className="react-ui__header">
            <div><small>OVERVIEW</small><strong>Good morning.</strong></div>
            <span>AM</span>
          </div>
          <div className="react-ui__stats">
            <div><small>Components</small><strong>24</strong><em>+8%</em></div>
            <div><small>Coverage</small><strong>96%</strong><em>Stable</em></div>
          </div>
          <div className="react-ui__chart">
            <small>INTERACTION QUALITY</small>
            <svg viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,68 C35,60 45,35 78,45 C112,55 125,18 160,30 C194,42 208,10 242,20 C270,27 284,5 300,8" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M0,68 C35,60 45,35 78,45 C112,55 125,18 160,30 C194,42 208,10 242,20 C270,27 284,5 300,8 L300,80 L0,80Z" fill="currentColor" opacity=".08" />
            </svg>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function ProjectVisual({ type }: { type: Project['visual'] }) {
  if (type === 'performance') return <PerformanceVisual />;
  if (type === 'wordpress') return <WordPressVisual />;
  return <ReactVisual />;
}

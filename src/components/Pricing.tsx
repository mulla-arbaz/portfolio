import { ArrowUpRight, CheckIcon } from './Icons';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { pricingPackages } from '../data/portfolio';

export function Pricing() {
  return (
    <section className="section pricing" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Website development packages"
            title="Clear, transparent pricing for modern websites."
            intro="Tailored packages designed for high performance, thoughtful UI, and dependable results—from focused landing pages to full-scale custom web experiences."
          />
        </Reveal>

        <div className="pricing-grid">
          {pricingPackages.map((pkg) => (
            <Reveal
              key={pkg.id}
              className={pkg.popular ? 'pricing-grid__item pricing-grid__item--popular' : 'pricing-grid__item'}
            >
              <article
                className={`pricing-card${pkg.popular ? ' pricing-card--popular' : ''}`}
                aria-label={`${pkg.name} package`}
              >
                <div className="pricing-card__header">
                  <div className="pricing-card__title-row">
                    <h3 className="pricing-card__name">{pkg.name}</h3>
                    {pkg.badge && (
                      <span className="pricing-card__badge" aria-label={`Badge: ${pkg.badge}`}>
                        {pkg.badge}
                      </span>
                    )}
                  </div>
                  <p className="pricing-card__ideal">{pkg.idealFor}</p>

                  <div className="pricing-card__price-box">
                    <span className="pricing-card__price-prefix">Starting at</span>
                    <div className="pricing-card__price-value">
                      <strong>{pkg.price}</strong>
                    </div>
                  </div>
                </div>

                <div className="pricing-card__body">
                  <p className="pricing-card__features-title">What’s included</p>
                  <ul className="pricing-card__features" aria-label={`${pkg.name} features`}>
                    {pkg.features.map((feature) => (
                      <li key={feature}>
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pricing-card__footer">
                  <a
                    href="#contact"
                    className={`button ${pkg.popular ? 'button--primary' : 'button--secondary'} pricing-card__cta`}
                  >
                    {pkg.ctaLabel} <ArrowUpRight />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="pricing-note">
            <p>
              Every project is different. Final pricing depends on design complexity, features and project requirements.
            </p>
            <a className="text-link" href="#contact">
              Have a custom scope in mind? Let’s talk <ArrowUpRight />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


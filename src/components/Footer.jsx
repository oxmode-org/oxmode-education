import React from 'react';
import { footerLinks } from '../data/content';
import ConstellationField from './ui/ConstellationField';

const CONNECT_ICONS = {
  footerConnectEmail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M5.5 7.5 12 12.5l6.5-5" />
    </svg>
  ),
  footerConnectWebsite: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.8 12h16.4M12 3.8c2.5 2.3 3.9 5.2 3.9 8.2s-1.4 5.9-3.9 8.2c-2.5-2.3-3.9-5.2-3.9-8.2S9.5 6.1 12 3.8Z" />
    </svg>
  ),
  footerConnectFacebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.44 20v-6.83h2.3l.35-2.66h-2.65V8.8c0-.77.21-1.3 1.31-1.3H16.2V5.13c-.25-.03-1.1-.1-2.08-.1-2.06 0-3.47 1.26-3.47 3.57v1.99H8.31v2.66h2.34V20h2.79Z" />
    </svg>
  ),
  footerConnectLinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.43 8.86a1.7 1.7 0 1 1 0-3.39 1.7 1.7 0 0 1 0 3.4ZM4.96 19V10.4h2.94V19H4.96Zm4.79 0V10.4h2.82v1.18h.04c.39-.74 1.35-1.52 2.79-1.52 2.98 0 3.53 1.96 3.53 4.5V19h-2.94v-3.94c0-.94-.02-2.15-1.31-2.15-1.31 0-1.51 1.02-1.51 2.08V19H9.75Z" />
    </svg>
  ),
};

const COMPANY_INFO_ICONS = {
  tax: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  ),
  address: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M12 21s-6-5.2-6-11a6 6 0 1 1 12 0c0 5.8-6 11-6 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M5.5 7.5 12 12.5l6.5-5" />
    </svg>
  ),
};

const getLinkProps = (href) => {
  if (!href || !href.startsWith('http')) {
    return {};
  }

  return {
    target: '_blank',
    rel: 'noreferrer',
  };
};

/**
 * OXMODE — Operations Console Footer
 * Blueprint/technical aesthetic × bold editorial typography.
 */
const Footer = ({ id = 'contact', lead = null, linkBase = '', compact = false }) => {
  const year = new Date().getFullYear();
  const connectLinks = footerLinks.connect.filter((channel) => !channel.isLang);
  const hrefFor = (href) => (linkBase && href?.startsWith('#') ? `${linkBase}${href}` : href);

  return (
    <footer className={`ox-footer${compact ? ' is-edu' : ''}`} id={id}>
      {compact ? null : (
        <ConstellationField
          color="#2EFCFF"
          goldColor="#E6C879"
          density={1.1}
          className="oxf-constellation"
        />
      )}
      {compact ? null : (
        <div className="oxf-backdrop" aria-hidden="true">
          <div className="oxf-backdrop__grid" />
          <div className="oxf-backdrop__glow" />
        </div>
      )}

      <div className="oxf-inner">
        {lead}
        {compact ? null : (
        <header className="oxf-hero">
          <h2 className="oxf-hero__title">
            <span className="oxf-hero__line">
              OXMODE
            </span>
            <span className="oxf-hex" aria-hidden="true" />
          </h2>
        </header>
        )}

        {compact ? null : (
        <div className="oxf-rule" role="presentation">
          <span className="oxf-rule__line" />
        </div>
        )}

        {compact ? null : (
          <div className="oxf-stage">
            <section className="oxf-stage__studio">
              <h3 className="oxf-stage__title oxf-stage__title--studio">
                <span data-i18n="footerColStudio">Studio</span>
                <span className="oxf-hex" aria-hidden="true" />
              </h3>

              <div className="oxf-company" aria-label="Company details">
                <p className="oxf-company__name" data-i18n="footerCompanyName">
                  CÔNG TY TNHH TRÍ TUỆ HỢP NHẤT
                </p>

                <ul className="oxf-company__list">
                  <li className="oxf-company__item">
                    <span className="oxf-company__icon">{COMPANY_INFO_ICONS.tax}</span>
                    <span className="oxf-company__value" data-i18n="footerCompanyTaxValue">0319570734</span>
                  </li>

                  <li className="oxf-company__item">
                    <span className="oxf-company__icon">{COMPANY_INFO_ICONS.address}</span>
                    <span className="oxf-company__value" data-i18n="footerCompanyAddressValue">
                      118A Nguyễn Thái Sơn · Phường Hạnh Thông · TP.HCM · Việt Nam
                    </span>
                  </li>

                  <li className="oxf-company__item">
                    <span className="oxf-company__icon">{COMPANY_INFO_ICONS.email}</span>
                    <a href="mailto:hello@oxmode.ai" className="oxf-company__value oxf-company__value--link" data-i18n="footerCompanyEmailValue">
                      hello@oxmode.ai
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            <section className="oxf-stage__services-hero" aria-hidden="true">
              <h3 className="oxf-stage__title oxf-stage__title--services">
                <span data-i18n="footerColServices">Service</span>
                <span className="oxf-hex" aria-hidden="true" />
              </h3>
            </section>

            <section className="oxf-stage__services-list">
              <ul className="oxf-services">
                {footerLinks.services.map((service, index) => (
                  <li key={service.key} className="oxf-svc">
                    <a href={hrefFor(service.href)} className="oxf-svc__link">
                      <span className="oxf-svc__num">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="oxf-svc__label" data-i18n={service.key}>
                        {service.text}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="oxf-stage__work">
              <a href={hrefFor('#work')} className="oxf-work__link" aria-label="See selected work">
                <h2 className="oxf-work__title">
                  Work<span className="oxf-hex" aria-hidden="true" />
                </h2>
              </a>
              <div className="oxf-work__actions">
                <div className="oxf-socials">
                  {connectLinks.map((channel) => (
                    <a
                      key={channel.key}
                      href={hrefFor(channel.href)}
                      className="oxf-social"
                      {...getLinkProps(channel.href)}
                    >
                      <span className="oxf-social__icon">
                        {CONNECT_ICONS[channel.key]}
                      </span>
                      <span className="oxf-social__label" data-i18n={channel.key}>
                        {channel.text}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="oxf-baseline">
                <span className="oxf-baseline__item">© {year} OXMODE</span>
                <span className="oxf-baseline__divider" aria-hidden="true">·</span>
                <button
                  type="button"
                  className="oxf-baseline__partner"
                  onClick={() => window.dispatchEvent(new CustomEvent('oxmode:openPartner'))}
                  data-i18n="footerPartner"
                >
                  Đối tác chính thức của NocoBase tại Việt Nam
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;

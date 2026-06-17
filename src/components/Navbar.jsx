import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage';
import { LANGUAGES } from '../i18n/languages';
import { openWhatsAppReservation } from '../utils/whatsapp';

const PAGE_LINKS = [
  { key: 'gallery', to: '/galeri' },
  { key: 'info',    to: '/bilgi'  },
];

function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleReservationClick = () => {
    openWhatsAppReservation(t('reservationWhatsApp.message'));
    setMenuOpen(false);
  };

  const selectLanguage = (code) => {
    setLanguage(code);
    setLangMenuOpen(false);
  };

  const currentLanguage = LANGUAGES.find((lang) => lang.code === language) ?? LANGUAGES[0];

  const navLinkClass = ({ isActive }) =>
    `font-body cursor-pointer transition-all duration-300 ${
      isActive ? 'text-gold' : 'text-cream hover:text-gold'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-wood shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Brand */}
        <Link
          to="/"
          className="font-display text-xl sm:text-2xl font-bold text-cream cursor-pointer transition-all duration-300 hover:text-gold"
        >
          {t('nav.brand')}
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {PAGE_LINKS.map(({ key, to }) => (
            <NavLink key={key} to={to} className={navLinkClass}>
              {t(`navLinks.${key}`)}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={handleReservationClick}
              className="bg-gold text-wood font-body font-bold px-5 py-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-cream hover:scale-105"
            >
              {t('nav.cta')}
            </button>
          </div>

          {/* Language Switcher */}
          <div className="relative z-50" ref={langMenuRef}>
            <button
              onClick={() => setLangMenuOpen((prev) => !prev)}
              className="flex items-center gap-1 font-body font-bold text-cream text-sm sm:text-base cursor-pointer transition-all duration-300 hover:text-gold"
              aria-label={t('nav.languageLabel')}
            >
              {currentLanguage.label}
              <span
                className={`text-xs transition-transform duration-300 ${
                  langMenuOpen ? 'rotate-180' : ''
                }`}
              >
                ▾
              </span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 bg-wood border border-gold/30 rounded-xl shadow-lg overflow-hidden min-w-[120px] animate-fade-in">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => selectLanguage(lang.code)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-2 text-left font-body text-sm cursor-pointer transition-all duration-300 hover:bg-wood-light hover:text-gold ${
                      lang.code === language ? 'text-gold' : 'text-cream'
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span className="text-xs">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-cream text-3xl cursor-pointer transition-all duration-300 z-50"
            aria-label={t('nav.menuToggle')}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <div
        className={`fixed inset-0 bg-wood flex flex-col items-center justify-center gap-8 transition-all duration-300 lg:hidden ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {PAGE_LINKS.map(({ key, to }) => (
          <NavLink
            key={key}
            to={to}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `font-display text-2xl cursor-pointer transition-all duration-300 ${
                isActive ? 'text-gold' : 'text-cream hover:text-gold'
              }`
            }
          >
            {t(`navLinks.${key}`)}
          </NavLink>
        ))}
        <button
          onClick={handleReservationClick}
          className="bg-gold text-wood font-body font-bold px-8 py-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-cream hover:scale-105 mt-4"
        >
          {t('nav.cta')}
        </button>
      </div>
    </header>
  );
}

export default Navbar;

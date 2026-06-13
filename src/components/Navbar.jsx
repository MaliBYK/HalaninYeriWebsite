import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Ana Sayfa', id: 'hero' },
  { label: 'Hakkımızda', id: 'about' },
  { label: 'Olanaklar', id: 'amenities' },
  { label: 'Galeri', id: 'gallery' },
  { label: 'SSS', id: 'faq' },
  { label: 'İletişim', id: 'contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-wood shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => scrollToSection('hero')}
          className="font-display text-xl sm:text-2xl font-bold text-cream cursor-pointer transition-all duration-300"
        >
          🏕️ Hala'nın Yeri
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-body text-cream hover:text-gold cursor-pointer transition-all duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <button
            onClick={() => scrollToSection('reservation')}
            className="bg-gold text-wood font-body font-bold px-5 py-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-cream hover:scale-105"
          >
            Rezervasyon Yap
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-cream text-3xl cursor-pointer transition-all duration-300 z-50"
          aria-label="Menüyü aç/kapat"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Overlay Menu */}
      <div
        className={`fixed inset-0 bg-wood flex flex-col items-center justify-center gap-8 transition-all duration-300 lg:hidden ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className="font-display text-2xl text-cream hover:text-gold cursor-pointer transition-all duration-300"
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => scrollToSection('reservation')}
          className="bg-gold text-wood font-body font-bold px-8 py-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-cream hover:scale-105 mt-4"
        >
          Rezervasyon Yap
        </button>
      </div>
    </header>
  );
}

export default Navbar;

const QUICK_LINKS = [
  { label: 'Ana Sayfa', id: 'hero' },
  { label: 'Hakkımızda', id: 'about' },
  { label: 'Olanaklar', id: 'amenities' },
  { label: 'Galeri', id: 'gallery' },
  { label: 'SSS', id: 'faq' },
  { label: 'İletişim', id: 'contact' },
];

function Footer() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-wood text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Logo + slogan + social */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-3">
              🏕️ Hala'nın Yeri
            </h3>
            <p className="font-body text-cream/70 text-sm mb-5">
              Portakal Ağaçları Altında Kamp Deneyimi
            </p>
            <div className="flex items-center gap-4 text-2xl">
              <a
                href="https://instagram.com/halaninyericamping"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-all duration-300 hover:text-gold"
                aria-label="Instagram"
              >
                📸
              </a>
              <a
                href="https://wa.me/905078508806"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-all duration-300 hover:text-gold"
                aria-label="WhatsApp"
              >
                💬
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">
              Hızlı Linkler
            </h4>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="font-body text-cream/70 cursor-pointer transition-all duration-300 hover:text-gold"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">İletişim</h4>
            <ul className="flex flex-col gap-2 font-body text-cream/70 text-sm">
              <li>📍 Olympos Köyü, Kumluca, Antalya</li>
              <li>
                <a
                  href="https://wa.me/905078508806"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer transition-all duration-300 hover:text-gold"
                >
                  📞 +90 507 850 8806
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/halaninyericamping"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer transition-all duration-300 hover:text-gold"
                >
                  📸 @halaninyericamping
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6">
        <p className="text-center font-body text-cream/60 text-sm px-4">
          © 2025 Hala'nın Yeri Camping · Olympos, Antalya
        </p>
      </div>
    </footer>
  );
}

export default Footer;

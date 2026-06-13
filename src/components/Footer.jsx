import { useLanguage } from '../i18n/useLanguage';

const QUICK_LINK_IDS = ['hero', 'about', 'amenities', 'gallery', 'faq', 'contact'];

function Footer() {
  const { t } = useLanguage();

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
              {t('footer.brand')}
            </h3>
            <p className="font-body text-cream/70 text-sm mb-5">
              {t('footer.slogan')}
            </p>
            <div className="flex items-center gap-4 text-2xl">
              <a
                href="https://instagram.com/halaninyericampingg"
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
              {t('footer.quickLinksTitle')}
            </h4>
            <ul className="flex flex-col gap-2">
              {QUICK_LINK_IDS.map((id) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className="font-body text-cream/70 cursor-pointer transition-all duration-300 hover:text-gold"
                  >
                    {t(`navLinks.${id}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">{t('footer.contactTitle')}</h4>
            <ul className="flex flex-col gap-2 font-body text-cream/70 text-sm">
              <li>{t('footer.address')}</li>
              <li>
                <a
                  href="tel:+905078508806"
                  className="cursor-pointer transition-all duration-300 hover:text-gold"
                >
                  📞 +90 507 850 8806
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/halaninyericampingg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer transition-all duration-300 hover:text-gold"
                >
                  {t('footer.instagramHandle')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6">
        <p className="text-center font-body text-cream/60 text-sm px-4">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}

export default Footer;

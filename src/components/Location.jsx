import { useLanguage } from '../i18n/useLanguage';

function Location() {
  const { t } = useLanguage();
  const infoItems = t('location.items');

  return (
    <section id="location" className="fade-section bg-cream py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-wood text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">
          {t('location.title')}
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left info */}
          <div className="flex flex-col gap-4">
            {infoItems.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-4 bg-white/50 border border-gold/30 rounded-2xl p-5 transition-all duration-300 hover:border-gold hover:shadow-lg"
              >
                <span className="text-2xl sm:text-3xl">{item.icon}</span>
                <span className="font-body text-wood text-sm sm:text-base">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Right map */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden shadow-lg flex-1 min-h-[300px]">
              <iframe
                title={t('location.mapTitle')}
                src="https://www.google.com/maps?q=36.3967,30.4689&z=14&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href="https://maps.google.com/?q=Hala'nın+Yeri+Camping+Olympos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-center bg-gold text-wood font-body font-bold px-8 py-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-wood hover:text-cream"
            >
              {t('location.mapCta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;

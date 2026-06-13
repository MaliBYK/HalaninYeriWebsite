import { useLanguage } from '../i18n/useLanguage';

function Amenities() {
  const { t } = useLanguage();
  const amenities = t('amenities.items');

  return (
    <section id="amenities" className="fade-section bg-cream py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-wood text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">
          {t('amenities.title')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((item) => (
            <div
              key={item.title}
              className="bg-wood text-cream border-2 border-transparent rounded-2xl p-6 transition-all duration-300 hover:border-gold hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-3xl sm:text-4xl mb-3">{item.icon}</div>
              <h3 className="font-display text-lg sm:text-xl font-bold mb-2">
                {item.title}
              </h3>
              <p className="font-body text-cream/80 text-sm sm:text-base">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Amenities;

import { useLanguage } from '../i18n/useLanguage';

function Hero() {
  const { t } = useLanguage();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layer (placeholder for a photo) */}
      <div className="absolute inset-0 bg-gradient-to-br from-wood-light via-forest to-wood" />

      {/* Gradient overlay: forest -> wood, opacity 0.75 */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest to-wood opacity-75" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fade-in">
        <span className="text-gold font-body text-sm sm:text-base font-bold tracking-[0.3em] uppercase mb-4">
          {t('hero.badge')}
        </span>

        <h1 className="font-display text-white text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          {t('hero.title')}
        </h1>

        <p className="font-body text-cream text-base sm:text-lg lg:text-xl max-w-2xl mb-10">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => scrollToSection('reservation')}
            className="bg-gold text-wood font-body font-bold text-lg px-8 py-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-cream hover:scale-105 shadow-lg"
          >
            {t('hero.cta')}
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="bg-transparent border-2 border-white text-white font-body font-bold text-lg px-8 py-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-white hover:text-wood"
          >
            {t('hero.explore')}
          </button>
        </div>
      </div>

      {/* Rating badge */}
      <div className="absolute bottom-6 right-6 z-10 bg-cream/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg animate-fade-in">
        <p className="font-body text-wood font-bold text-sm sm:text-base">
          {t('hero.rating')}
        </p>
      </div>
    </section>
  );
}

export default Hero;

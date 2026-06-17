import { useLanguage } from '../i18n/useLanguage';
import { openWhatsAppReservation } from '../utils/whatsapp';
import AnimatedBg from './AnimatedBg';

function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <AnimatedBg />

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
            onClick={() => openWhatsAppReservation(t('reservationWhatsApp.message'))}
            className="bg-gold text-wood font-body font-bold text-lg px-8 py-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-cream hover:scale-105 shadow-lg"
          >
            🏕️ {t('hero.cta')}
          </button>
          <a
            href="#about"
            className="bg-transparent border-2 border-white text-white font-body font-bold text-lg px-8 py-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-white hover:text-wood"
          >
            {t('hero.explore')}
          </a>
        </div>
      </div>

      {/* Rating badge → scrolls to Reviews */}
      <button
        onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-6 right-6 z-10 bg-cream/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg animate-fade-in cursor-pointer transition-all duration-300 hover:bg-cream hover:scale-105"
      >
        <p className="font-body text-wood font-bold text-sm sm:text-base">
          {t('hero.rating')}
        </p>
      </button>
    </section>
  );
}

export default Hero;

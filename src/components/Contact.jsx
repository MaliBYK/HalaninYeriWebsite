import { useLanguage } from '../i18n/useLanguage';
import { getWhatsAppUrl } from '../utils/whatsapp';

const CARD_LINKS = [
  { href: 'https://wa.me/905078508806', external: true },
  { href: 'tel:+905078508806', external: false },
  { href: 'https://instagram.com/halaninyericampingg', external: true },
];

function Contact() {
  const { t } = useLanguage();
  const cards = t('contact.cards').map((card, index) => ({
    ...card,
    ...CARD_LINKS[index],
    ...(index === 0 ? { href: getWhatsAppUrl(t('infoWhatsApp.message')) } : {}),
  }));

  return (
    <section id="contact" className="fade-section bg-cream py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-wood text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">
          {t('contact.title')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              {...(card.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="bg-wood text-cream rounded-2xl p-8 sm:p-10 flex flex-col items-center text-center gap-3 cursor-pointer transition-all duration-300 hover:bg-wood-light hover:-translate-y-2 hover:shadow-2xl"
            >
              <span className="text-4xl sm:text-5xl">{card.icon}</span>
              <h3 className="font-display text-xl sm:text-2xl font-bold">
                {card.title}
              </h3>
              <p className="font-body text-cream/80 text-sm sm:text-base">
                {card.subtitle}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;

import { useState } from 'react';
import { useLanguage } from '../i18n/useLanguage';

function FAQ() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(null);
  const items = t('faq.items');

  const toggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="fade-section bg-wood py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-cream text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">
          {t('faq.title')}
        </h2>

        <div className="flex flex-col gap-4">
          {items.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={item.question}
                className="bg-wood-light/50 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left cursor-pointer transition-all duration-300"
                >
                  <span className="font-body font-bold text-cream text-sm sm:text-base">
                    {item.question}
                  </span>
                  <span
                    className={`text-gold text-xl flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                  <p className="font-body text-cream/80 text-sm sm:text-base px-5 sm:px-6 pb-5">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;

import { useLanguage } from '../i18n/useLanguage';

function Reviews() {
  const { t } = useLanguage();
  const reviews = t('reviews.items');

  return (
    <section id="reviews" className="fade-section bg-cream py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-wood text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('reviews.title')}
          </h2>
          <p className="font-body text-wood-light text-base sm:text-lg">
            {t('reviews.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-wood text-cream rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-gold text-lg">{'⭐'.repeat(review.rating)}</div>
              <p className="font-body text-cream/90 text-sm sm:text-base leading-relaxed flex-1">
                “{review.text}”
              </p>
              <p className="font-display font-bold text-gold text-sm sm:text-base">
                {review.name}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://maps.google.com/?q=Hala'nın+Yeri+Camping+Olympos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-wood font-body font-bold px-8 py-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-wood hover:text-cream"
          >
            {t('reviews.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Reviews;

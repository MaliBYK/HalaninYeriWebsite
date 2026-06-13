function InfoBand() {
  const items = [
    { icon: '📍', text: 'Olympos, Antalya' },
    { icon: '⭐', text: '4.4/5 · 232 Yorum' },
    { icon: '🏕️', text: 'Çadır Alanları' },
  ];

  return (
    <section className="bg-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {items.map((item) => (
            <div
              key={item.text}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 font-body font-bold text-wood text-sm sm:text-base transition-all duration-300"
            >
              <span className="text-xl sm:text-2xl">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}

          <a
            href="tel:+905078508806"
            className="flex flex-col sm:flex-row items-center justify-center gap-2 font-body font-bold text-wood text-sm sm:text-base cursor-pointer transition-all duration-300 hover:text-cream"
          >
            <span className="text-xl sm:text-2xl">📞</span>
            <span>+90 507 850 8806</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default InfoBand;

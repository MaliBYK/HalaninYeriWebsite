function About() {
  const scrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: '🍊',
      title: 'Portakal Bahçesi',
      desc: 'Serinlik ve doğal gölge',
    },
    {
      icon: '🏛️',
      title: 'Antik Kent Yakını',
      desc: '10 dk yürüyüş',
    },
    {
      icon: '🔥',
      title: 'Ateş Alanı',
      desc: 'Unutulmaz kamp geceleri',
    },
    {
      icon: '🌿',
      title: 'Huzurlu Ortam',
      desc: 'Şehir gürültüsünden uzak',
    },
  ];

  return (
    <section id="about" className="fade-section bg-cream py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div>
          <span className="inline-block text-gold font-body font-bold text-sm tracking-[0.2em] uppercase mb-3">
            Hakkımızda
          </span>
          <h2 className="font-display text-wood text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Doğayla İç İçe, Tarihin Yanı Başında
          </h2>
          <p className="font-body text-wood-light text-base sm:text-lg leading-relaxed mb-8">
            Olympos antik kentine 10 dakika yürüme mesafesinde, portakal
            bahçesinin serinliğinde huzurlu bir kamp deneyimi sizi bekliyor.
            Zincir marketlere yakın konumumuzda ateş alanı, ahşap platformlar
            ve ortak mutfak imkânlarıyla doğanın tam kalbinde, konforunuzdan
            ödün vermeden unutulmaz bir tatil geçirebilirsiniz.
          </p>
          <button
            onClick={scrollToReservation}
            className="bg-gold text-wood font-body font-bold px-8 py-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-wood hover:text-cream"
          >
            Rezervasyon Yap →
          </button>
        </div>

        {/* Right column - feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border-2 border-gold rounded-2xl p-6 bg-white/40 transition-all duration-300 hover:bg-gold hover:scale-105 hover:shadow-xl group"
            >
              <div className="text-3xl sm:text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-display text-wood text-lg sm:text-xl font-bold mb-2 group-hover:text-cream">
                {feature.title}
              </h3>
              <p className="font-body text-wood-light text-sm sm:text-base group-hover:text-cream">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;

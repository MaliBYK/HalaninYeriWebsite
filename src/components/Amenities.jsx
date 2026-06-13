function Amenities() {
  const amenities = [
    { icon: '📶', title: 'Ücretsiz Wi-Fi', desc: 'Kamp boyunca bağlantıda kalın' },
    { icon: '🪵', title: 'Ahşap Platformlar', desc: 'Çadırınız için hazır zemin' },
    { icon: '🚿', title: 'Duş & WC', desc: 'Temiz ortak kullanım alanları' },
    { icon: '🍳', title: 'Ortak Mutfak', desc: 'Yemeklerinizi hazırlayın' },
    { icon: '🔥', title: 'Ateş Alanı', desc: 'Güvenli ateş yakma bölgesi' },
    { icon: '⚡', title: 'Elektrik', desc: 'Şarj ve aydınlatma imkânı' },
    { icon: '🚗', title: 'Ücretsiz Otopark', desc: 'Saha içi ve yol kenarı' },
    { icon: '💧', title: 'Akan Su', desc: '7/24 temiz su erişimi' },
    { icon: '👨‍👩‍👧', title: 'Aile İndirimi', desc: 'Çocuklar için özel fiyat' },
  ];

  return (
    <section id="amenities" className="fade-section bg-cream py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-wood text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">
          Konforunuz İçin Her Şey Düşünüldü
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

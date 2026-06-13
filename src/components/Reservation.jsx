import { useState } from 'react';

// BotFather'dan alınan token ve getUpdates ile bulunan chat_id buraya girilir
const TELEGRAM_BOT_TOKEN = '8797435117:AAE82yOFdkA0VJtejqwfMSqi0c7WtBggGro';
const TELEGRAM_CHAT_ID = '7727326281';

const initialFormData = {
  adSoyad: '',
  telefon: '',
  girisTarihi: '',
  cikisTarihi: '',
  kisiSayisi: 1,
  cadirSayisi: 1,
  notlar: '',
};

function Reservation() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.adSoyad.trim()) {
      newErrors.adSoyad = 'Ad Soyad alanı zorunludur.';
    }
    if (!formData.telefon.trim()) {
      newErrors.telefon = 'Telefon alanı zorunludur.';
    }
    if (!formData.girisTarihi) {
      newErrors.girisTarihi = 'Giriş tarihi zorunludur.';
    }
    if (!formData.cikisTarihi) {
      newErrors.cikisTarihi = 'Çıkış tarihi zorunludur.';
    }
    if (
      formData.girisTarihi &&
      formData.cikisTarihi &&
      formData.cikisTarihi <= formData.girisTarihi
    ) {
      newErrors.cikisTarihi = 'Çıkış tarihi, giriş tarihinden sonra olmalıdır.';
    }
    if (
      !formData.kisiSayisi ||
      Number(formData.kisiSayisi) < 1 ||
      Number(formData.kisiSayisi) > 20
    ) {
      newErrors.kisiSayisi = 'Kişi sayısı 1 ile 20 arasında olmalıdır.';
    }
    if (!formData.cadirSayisi || Number(formData.cadirSayisi) < 1) {
      newErrors.cadirSayisi = 'Çadır sayısı en az 1 olmalıdır.';
    }

    return newErrors;
  };

  const sendToTelegram = async (mesaj) => {
    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: mesaj }),
      });
    } catch {
      // Telegram bildirimi başarısız olsa da WhatsApp akışı devam eder
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const mesaj = `🏕️ Hala'nın Yeri Camping - Rezervasyon Talebi

👤 Ad Soyad: ${formData.adSoyad}
📱 Telefon: ${formData.telefon}
📅 Giriş: ${formData.girisTarihi}
📅 Çıkış: ${formData.cikisTarihi}
👥 Kişi Sayısı: ${formData.kisiSayisi}
⛺ Çadır Sayısı: ${formData.cadirSayisi}
📝 Notlar: ${formData.notlar || '-'}`;

    sendToTelegram(mesaj);

    window.open(
      `https://wa.me/905078508806?text=${encodeURIComponent(mesaj)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const infoCards = [
    { icon: '✅', text: 'Anında Onay' },
    { icon: '✅', text: 'Ücretsiz İptal (48 saat öncesi)' },
    { icon: '✅', text: 'Güvenli Ödeme' },
    { icon: '📞', text: 'Telefon ile de rezervasyon yapılabilir' },
  ];

  const inputClass =
    'w-full bg-cream text-wood font-body px-4 py-3 rounded-lg border-2 border-transparent focus:border-gold focus:outline-none transition-all duration-300';

  const labelClass = 'block font-body font-bold text-cream mb-2';

  const errorClass = 'text-red-400 text-sm mt-1 font-body';

  return (
    <section
      id="reservation"
      className="fade-section bg-gradient-to-br from-wood via-wood-light to-wood py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-cream text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Yerinizi Ayırtın
          </h2>
          <p className="font-body text-cream/80 text-base sm:text-lg">
            Formu doldurun, WhatsApp'tan anında onaylayalım
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-wood-light/50 rounded-2xl p-6 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="adSoyad">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  id="adSoyad"
                  name="adSoyad"
                  value={formData.adSoyad}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Adınız ve Soyadınız"
                />
                {errors.adSoyad && <p className={errorClass}>{errors.adSoyad}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="telefon">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="telefon"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="05XX XXX XX XX"
                />
                {errors.telefon && <p className={errorClass}>{errors.telefon}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="girisTarihi">
                  Giriş Tarihi
                </label>
                <input
                  type="date"
                  id="girisTarihi"
                  name="girisTarihi"
                  value={formData.girisTarihi}
                  onChange={handleChange}
                  min={today}
                  className={inputClass}
                />
                {errors.girisTarihi && (
                  <p className={errorClass}>{errors.girisTarihi}</p>
                )}
              </div>

              <div>
                <label className={labelClass} htmlFor="cikisTarihi">
                  Çıkış Tarihi
                </label>
                <input
                  type="date"
                  id="cikisTarihi"
                  name="cikisTarihi"
                  value={formData.cikisTarihi}
                  onChange={handleChange}
                  min={formData.girisTarihi || today}
                  className={inputClass}
                />
                {errors.cikisTarihi && (
                  <p className={errorClass}>{errors.cikisTarihi}</p>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="kisiSayisi">
                  Kişi Sayısı
                </label>
                <input
                  type="number"
                  id="kisiSayisi"
                  name="kisiSayisi"
                  value={formData.kisiSayisi}
                  onChange={handleChange}
                  min={1}
                  max={20}
                  className={inputClass}
                />
                {errors.kisiSayisi && (
                  <p className={errorClass}>{errors.kisiSayisi}</p>
                )}
              </div>

              <div>
                <label className={labelClass} htmlFor="cadirSayisi">
                  Çadır Sayısı
                </label>
                <input
                  type="number"
                  id="cadirSayisi"
                  name="cadirSayisi"
                  value={formData.cadirSayisi}
                  onChange={handleChange}
                  min={1}
                  className={inputClass}
                />
                {errors.cadirSayisi && (
                  <p className={errorClass}>{errors.cadirSayisi}</p>
                )}
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="notlar">
                Notlar
              </label>
              <textarea
                id="notlar"
                name="notlar"
                value={formData.notlar}
                onChange={handleChange}
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Eklemek istediğiniz bir not var mı? (opsiyonel)"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold text-wood font-body font-bold text-lg px-8 py-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-cream hover:scale-[1.02]"
            >
              WhatsApp ile Rezervasyon Yap 💬
            </button>
          </form>

          {/* Info cards */}
          <div className="flex flex-col gap-4">
            {infoCards.map((card) => (
              <div
                key={card.text}
                className="bg-cream/10 border border-gold/40 rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:bg-cream/20"
              >
                <span className="text-2xl sm:text-3xl">{card.icon}</span>
                <span className="font-body text-cream text-sm sm:text-base">
                  {card.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reservation;

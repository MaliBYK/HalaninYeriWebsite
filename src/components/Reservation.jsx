import { useState } from 'react';
import { useLanguage } from '../i18n/useLanguage';

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
  const { t } = useLanguage();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.adSoyad.trim()) {
      newErrors.adSoyad = t('reservation.errors.adSoyad');
    }
    if (!formData.telefon.trim()) {
      newErrors.telefon = t('reservation.errors.telefon');
    }
    if (!formData.girisTarihi) {
      newErrors.girisTarihi = t('reservation.errors.girisTarihi');
    }
    if (!formData.cikisTarihi) {
      newErrors.cikisTarihi = t('reservation.errors.cikisTarihi');
    }
    if (
      formData.girisTarihi &&
      formData.cikisTarihi &&
      formData.cikisTarihi <= formData.girisTarihi
    ) {
      newErrors.cikisTarihi = t('reservation.errors.cikisTarihiAfter');
    }
    if (
      !formData.kisiSayisi ||
      Number(formData.kisiSayisi) < 1 ||
      Number(formData.kisiSayisi) > 20
    ) {
      newErrors.kisiSayisi = t('reservation.errors.kisiSayisi');
    }
    if (!formData.cadirSayisi || Number(formData.cadirSayisi) < 1) {
      newErrors.cadirSayisi = t('reservation.errors.cadirSayisi');
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
      // Bildirim başarısız olsa da kullanıcıya başarı mesajı gösterilir
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

    setFormData(initialFormData);
    setShowSuccess(true);
  };

  const infoCards = t('reservation.infoCards');

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
            {t('reservation.title')}
          </h2>
          <p className="font-body text-cream/80 text-base sm:text-lg">
            {t('reservation.subtitle')}
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
                  {t('reservation.labels.adSoyad')}
                </label>
                <input
                  type="text"
                  id="adSoyad"
                  name="adSoyad"
                  value={formData.adSoyad}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder={t('reservation.placeholders.adSoyad')}
                />
                {errors.adSoyad && <p className={errorClass}>{errors.adSoyad}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="telefon">
                  {t('reservation.labels.telefon')}
                </label>
                <input
                  type="tel"
                  id="telefon"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder={t('reservation.placeholders.telefon')}
                />
                {errors.telefon && <p className={errorClass}>{errors.telefon}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="girisTarihi">
                  {t('reservation.labels.girisTarihi')}
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
                  {t('reservation.labels.cikisTarihi')}
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
                  {t('reservation.labels.kisiSayisi')}
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
                  {t('reservation.labels.cadirSayisi')}
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
                {t('reservation.labels.notlar')}
              </label>
              <textarea
                id="notlar"
                name="notlar"
                value={formData.notlar}
                onChange={handleChange}
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder={t('reservation.placeholders.notlar')}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold text-wood font-body font-bold text-lg px-8 py-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-cream hover:scale-[1.02]"
            >
              {t('reservation.submit')}
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

      {/* Success popup */}
      {showSuccess && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="relative bg-cream rounded-2xl p-8 sm:p-10 max-w-md w-full text-center animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 text-wood text-2xl cursor-pointer transition-all duration-300 hover:text-gold"
              aria-label={t('reservation.success.close')}
            >
              ✕
            </button>

            <svg
              className="w-20 h-20 mx-auto mb-4"
              viewBox="0 0 52 52"
              fill="none"
            >
              <circle
                className="success-circle"
                cx="26"
                cy="26"
                r="25"
                stroke="#5A7A3A"
                strokeWidth="2"
              />
              <path
                className="success-check"
                stroke="#5A7A3A"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 27l7 7 17-17"
              />
            </svg>

            <h3 className="font-display text-wood text-2xl sm:text-3xl font-bold mb-3">
              {t('reservation.success.title')}
            </h3>
            <p className="font-body text-wood-light text-sm sm:text-base leading-relaxed">
              {t('reservation.success.message')}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Reservation;

import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/useLanguage';

function WhatsAppFloat() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <div className="relative group">
        {/* Tooltip */}
        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap bg-wood text-cream font-body text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          {t('whatsappFloat.tooltip')}
        </span>

        <a
          href="https://wa.me/905078508806"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-full shadow-lg cursor-pointer animate-pulse transition-all duration-300 hover:scale-110 hover:animate-none"
          aria-label={t('whatsappFloat.ariaLabel')}
        >
          <svg
            viewBox="0 0 448 512"
            className="w-7 h-7 sm:w-8 sm:h-8 fill-white"
            aria-hidden="true"
          >
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.2 10.2 76.6 28.3 109.3L0 480l128.2-33.6c31.8 17.4 67.5 26.7 103.9 26.7h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115.2-67.4-153zm-157 341.6c-32.4 0-64.4-8.6-92.4-25.2l-6.6-3.9-66.3 17.4 17.7-64.6-4.3-6.8c-18.2-29-27.8-62.4-27.8-96.7 0-101.5 82.7-184.1 184.4-184.1 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5-.1 101.6-82.8 184.3-184.5 184.3zm101.7-138c-5.6-2.8-33-16.3-38.1-18.1-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18.1-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.6-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-1.8-9.7-2.8-2.8-9.7-23.5-13.1-32-3.5-8.4-7-7.2-9.7-7.4-2.5-.2-5.4-.2-8.3-.2-2.9 0-7.6 1.1-11.6 5.3-4 4.2-15.3 15-15.3 36.3 0 21.3 15.5 41.9 17.6 44.8 2.1 2.9 29.2 44.6 70.7 60.8 35 13.7 42.1 11 49.7 9.2 7.6-1.8 23.8-10.6 27.1-20.9 3.3-10.3 3.3-19.1 2.3-20.9-1-1.8-3.5-2.8-7.4-4.7z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default WhatsAppFloat;

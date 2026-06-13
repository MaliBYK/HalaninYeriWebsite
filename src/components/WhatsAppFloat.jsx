import { useState, useEffect } from 'react';

function WhatsAppFloat() {
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
          Rezervasyon için yazın!
        </span>

        <a
          href="https://wa.me/905078508806"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-full shadow-lg cursor-pointer animate-pulse transition-all duration-300 hover:scale-110 hover:animate-none"
          aria-label="WhatsApp ile iletişime geç"
        >
          <span className="text-2xl sm:text-3xl">💬</span>
        </a>
      </div>
    </div>
  );
}

export default WhatsAppFloat;

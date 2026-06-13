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
          <svg
            viewBox="0 0 32 32"
            className="w-8 h-8 sm:w-9 sm:h-9 fill-white"
            aria-hidden="true"
          >
            <path d="M16.004 3C9.374 3 4 8.373 4 15.002c0 2.39.654 4.625 1.93 6.583L4 29l7.59-1.992a11.93 11.93 0 0 0 4.413.852h.001c6.629 0 12.003-5.373 12.003-12.001C28.007 8.373 22.633 3 16.004 3Zm0 21.785h-.001a9.74 9.74 0 0 1-4.96-1.361l-.356-.21-3.692.969.985-3.602-.232-.37a9.75 9.75 0 0 1-1.502-5.21c0-5.39 4.388-9.778 9.78-9.778 2.612 0 5.067 1.018 6.913 2.866a9.71 9.71 0 0 1 2.864 6.915c0 5.39-4.389 9.781-9.799 9.781Zm5.366-7.328c-.294-.147-1.74-.858-2.01-.957-.27-.098-.467-.147-.664.148-.196.294-.76.957-.932 1.153-.171.196-.343.22-.637.073-.294-.147-1.24-.457-2.362-1.46-.873-.778-1.462-1.74-1.634-2.034-.171-.294-.018-.453.13-.6.147-.147.343-.343.514-.539.171-.196.196-.343.293-.539.098-.196.049-.367-.024-.514-.073-.147-.318-.834-.466-1.243-.147-.394-.318-.343-.466-.343-.123 0-.294.025-.466.025-.171 0-.392.073-.515.22-.122.147-.49.514-.49 1.234 0 .72.515 1.413.587 1.51.073.098.98 1.487 2.378 2.652 1.398 1.165 2.5 1.553 2.937 1.733.439.18 1.026.171 1.392-.073.366-.245.93-.95 1.078-1.27.147-.319.147-.587.098-.657-.049-.073-.196-.122-.39-.22Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default WhatsAppFloat;

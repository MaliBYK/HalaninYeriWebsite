import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/useLanguage';

const GALLERY_STYLES = [
  { gradient: 'from-forest to-gold', span: 'row-span-2' },
  { gradient: 'from-wood to-wood-light', span: '' },
  { gradient: 'from-wood-light to-gold', span: 'sm:col-span-2' },
  { gradient: 'from-gold to-wood', span: '' },
  { gradient: 'from-forest to-wood-light', span: '' },
  { gradient: 'from-wood to-forest', span: 'row-span-2' },
];

function Gallery() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);

  const items = t('gallery.items').map((item, index) => ({
    ...item,
    ...GALLERY_STYLES[index],
  }));

  useEffect(() => {
    if (selected === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelected(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected]);

  return (
    <section id="gallery" className="fade-section bg-wood py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-cream text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">
          {t('gallery.title')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[180px] sm:auto-rows-[200px] grid-flow-dense">
          {items.map((item, index) => (
            <div
              key={item.label}
              onClick={() => setSelected(index)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group bg-gradient-to-br ${item.gradient} ${item.span} flex items-center justify-center transition-all duration-300`}
            >
              <span className="font-display text-white text-lg sm:text-xl font-bold text-center px-4">
                {item.label}
              </span>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-wood/0 group-hover:bg-wood/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="font-body text-cream text-lg font-bold">
                  {t('gallery.zoom')}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://instagram.com/halaninyericamping"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-wood font-body font-bold px-8 py-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-cream hover:scale-105"
          >
            {t('gallery.instagramCta')}
          </a>
        </div>
      </div>

      {/* Lightbox modal */}
      {selected !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className={`relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden bg-gradient-to-br ${items[selected].gradient} flex items-center justify-center`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-display text-white text-2xl sm:text-3xl font-bold text-center px-6">
              {items[selected].label}
            </span>

            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-white text-3xl cursor-pointer transition-all duration-300 hover:text-gold"
              aria-label={t('gallery.close')}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;

'use client';
import { REVIEWS } from '../../../lib/content';
import { GOOGLE_REVIEWS_URL, INSTAGRAM_HANDLE } from '../../../lib/config';
import useStore from '../../../store/useStore';

function Stars({ n }) {
  return (
    <span className="text-[#D4870A] text-sm">
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </span>
  );
}

export default function GalleryOverlay() {
  const isActive = useStore((s) => s.activeSection === 'gallery');

  return (
    <div
      className="h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden"
      style={{
        opacity: isActive ? 1 : 0.5,
        transform: isActive ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="text-center mb-3 sm:mb-6">
          <p className="font-body text-[#D4870A] text-xs tracking-[0.22em] uppercase mb-1 sm:mb-2">
            Misafirlerimiz
          </p>
          <h2 className="font-display text-cream text-2xl sm:text-4xl">
            Misafirlerimiz Ne Diyor?
          </h2>
          <p className="font-body text-cream/50 text-xs sm:text-sm mt-1 sm:mt-2">
            ⭐ 4.4 · Google&apos;da 232 değerlendirme
          </p>
        </div>

        {/*
          Review cards — responsive count:
          mobile  (1 col): 3 cards shown (rows 0-2)
          sm      (2 col): 4 cards shown (rows 0-3), 5th hidden
          lg      (3 col): 6 cards shown (all)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 pointer-events-auto">
          {REVIEWS.map((r, i) => (
            <div
              key={r.name}
              className={[
                'glass rounded-xl p-3 sm:p-4 flex flex-col gap-2 sm:gap-2.5',
                i === 3 ? 'hidden sm:flex sm:flex-col' : '',
                i === 4 ? 'hidden sm:flex sm:flex-col' : '',
                i === 5 ? 'hidden lg:flex lg:flex-col' : '',
              ].join(' ')}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#D4870A]/20 flex items-center justify-center text-[#D4870A] font-display text-sm font-bold flex-shrink-0">
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-body text-cream text-sm font-semibold">{r.name}</p>
                  <Stars n={r.rating} />
                </div>
              </div>
              <p className="font-body text-cream/65 text-xs leading-relaxed line-clamp-3 sm:line-clamp-4">
                {r.text}
              </p>
            </div>
          ))}
        </div>

        {/* Links row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-3 sm:mt-5">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-[#D4870A] hover:text-[#E89B1A] transition-colors duration-200 pointer-events-auto"
          >
            Google&apos;da Tüm Yorumları Gör →
          </a>
          <span className="hidden sm:block text-cream/20">|</span>
          <a
            href={`https://www.instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-body text-sm text-white transition-opacity duration-200 hover:opacity-90 pointer-events-auto"
            style={{
              background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @{INSTAGRAM_HANDLE}
          </a>
        </div>

      </div>
    </div>
  );
}

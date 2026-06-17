'use client';
import { REVIEWS } from '../../../lib/content';
import { GOOGLE_REVIEWS_URL } from '../../../lib/config';
import useStore from '../../../store/useStore';

function Stars({ n }) {
  return (
    <span className="text-[#D4870A] text-sm">
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </span>
  );
}

export default function GalleryOverlay() {
  const activeSection = useStore((s) => s.activeSection);
  const isActive = activeSection === 'gallery';

  return (
    <section id="gallery-section" className="relative h-[400vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
        <div
          className="w-full max-w-5xl transition-all duration-700"
          style={{
            opacity: isActive ? 1 : 0.5,
            transform: isActive ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <p className="font-body text-[#D4870A] text-xs tracking-[0.22em] uppercase mb-2">
              Misafirlerimiz
            </p>
            <h2 className="font-display text-cream text-3xl sm:text-4xl">
              Misafirlerimiz Ne Diyor?
            </h2>
            <p className="font-body text-cream/50 text-sm mt-2">
              ⭐ 4.4 · Google&apos;da 232 değerlendirme
            </p>
          </div>

          {/* Review cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pointer-events-auto">
            {REVIEWS.map((r) => (
              <div key={r.name} className="glass rounded-xl p-4 flex flex-col gap-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#D4870A]/20 flex items-center justify-center text-[#D4870A] font-display text-sm font-bold flex-shrink-0">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-body text-cream text-sm font-semibold">{r.name}</p>
                    <Stars n={r.rating} />
                  </div>
                </div>
                <p className="font-body text-cream/65 text-xs leading-relaxed line-clamp-4">
                  {r.text}
                </p>
              </div>
            ))}
          </div>

          {/* Google link */}
          <div className="text-center mt-5">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-[#D4870A] hover:text-[#E89B1A] transition-colors duration-200 pointer-events-auto"
            >
              Google&apos;da Tüm Yorumları Gör →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

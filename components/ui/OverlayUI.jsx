'use client';
import HeroOverlay from './sections/HeroOverlay';
import AboutOverlay from './sections/AboutOverlay';
import GalleryOverlay from './sections/GalleryOverlay';
import BookingOverlay from './sections/BookingOverlay';

export default function OverlayUI() {
  return (
    <main className="relative z-10 pointer-events-none">
      <HeroOverlay />
      <AboutOverlay />
      <GalleryOverlay />
      <BookingOverlay />
    </main>
  );
}

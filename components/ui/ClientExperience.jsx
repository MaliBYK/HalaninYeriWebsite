'use client';
import Experience from '../canvas/Experience';
import OverlayUI from './OverlayUI';
import Loader from './Loader';
import GrainVignette from './GrainVignette';
import WhatsAppFab from './WhatsAppFab';
import { useQualityTier } from '../../hooks/useQualityTier';
import { useLenisScroll } from '../../hooks/useLenisScroll';

export default function ClientExperience() {
  useQualityTier();
  useLenisScroll();

  return (
    <>
      {/* Scroll track: gives Lenis a scrollable range so progress maps 0→1 */}
      <div aria-hidden="true" style={{ height: '400vh' }} />
      <Loader />
      <Experience />
      <GrainVignette />
      <OverlayUI />
      <WhatsAppFab />
    </>
  );
}

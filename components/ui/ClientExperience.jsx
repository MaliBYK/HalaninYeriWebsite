'use client';
import Experience from '../canvas/Experience';
import OverlayUI from './OverlayUI';
import Loader from './Loader';
import GrainVignette from './GrainVignette';
import WhatsAppFab from './WhatsAppFab';
import InstagramFab from './InstagramFab';
import ClockWidget from './ClockWidget';
import { useQualityTier } from '../../hooks/useQualityTier';
import { useLenisScroll } from '../../hooks/useLenisScroll';

export default function ClientExperience() {
  useQualityTier();
  useLenisScroll();

  return (
    <>
      <Loader />
      <Experience />
      <GrainVignette />
      <OverlayUI />
      <ClockWidget />
      <WhatsAppFab />
      <InstagramFab />
    </>
  );
}

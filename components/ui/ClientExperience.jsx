'use client';
import Experience from '../canvas/Experience';
import OverlayUI from './OverlayUI';
import Loader from './Loader';
import GrainVignette from './GrainVignette';
import WhatsAppFab from './WhatsAppFab';
import InstagramFab from './InstagramFab';
import { useQualityTier } from '../../hooks/useQualityTier';
import { useLenisScroll } from '../../hooks/useLenisScroll';
import { useAntalyaTime } from '../../hooks/useAntalyaTime';
import ClockWidget from './ClockWidget';

export default function ClientExperience() {
  useQualityTier();
  useLenisScroll();
  useAntalyaTime();

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

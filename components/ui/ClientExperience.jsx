'use client';
import Experience from '../canvas/Experience';
import OverlayUI from './OverlayUI';
import Loader from './Loader';
import { useQualityTier } from '../../hooks/useQualityTier';
import { useLenisScroll } from '../../hooks/useLenisScroll';

export default function ClientExperience() {
  useQualityTier();
  useLenisScroll();

  return (
    <>
      <Loader />
      <Experience />
      <OverlayUI />
    </>
  );
}

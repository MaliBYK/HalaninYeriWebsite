import { create } from 'zustand';

const useStore = create((set) => ({
  scrollProgress: 0,
  qualityTier: 'mid',
  activeSection: 'hero',
  selectedPlatformId: null,
  booking: { checkIn: '', checkOut: '', guests: 2, name: '', phone: '' },

  setScrollProgress: (v) => set({ scrollProgress: v }),
  setQualityTier: (tier) => set({ qualityTier: tier }),
  setActiveSection: (section) => set({ activeSection: section }),
  setSelectedPlatform: (id) => set({ selectedPlatformId: id }),
  setBooking: (data) => set((s) => ({ booking: { ...s.booking, ...data } })),
}));

export default useStore;

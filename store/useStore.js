import { create } from 'zustand';

const useStore = create((set) => ({
  scrollProgress: 0,
  qualityTier: 'mid',
  activeSection: 'hero',
  sectionIndex: 0,
  selectedPlatformId: null,
  booking: { checkIn: '', checkOut: '', guests: 2, name: '', phone: '' },
  goTo: null,
  timeOfDay: 12,

  setScrollProgress:  (v)    => set({ scrollProgress: v }),
  setQualityTier:     (tier) => set({ qualityTier: tier }),
  setActiveSection:   (s)    => set({ activeSection: s }),
  setSectionIndex:    (i)    => set({ sectionIndex: i }),
  setSelectedPlatform:(id)   => set({ selectedPlatformId: id }),
  setBooking: (data) => set((s) => ({ booking: { ...s.booking, ...data } })),
  setGoTo:    (fn)   => set({ goTo: fn }),
  setTimeOfDay: (t)  => set({ timeOfDay: t }),
}));

export default useStore;

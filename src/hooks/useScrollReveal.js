import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    const sections = document.querySelectorAll('.fade-section');
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
}

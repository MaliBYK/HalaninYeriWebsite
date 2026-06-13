import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfoBand from './components/InfoBand';
import About from './components/About';
import Amenities from './components/Amenities';
import Gallery from './components/Gallery';
import Reservation from './components/Reservation';
import Location from './components/Location';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const sections = document.querySelectorAll('.fade-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <InfoBand />
      <About />
      <Amenities />
      <Gallery />
      <Reservation />
      <Location />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default App;

import { useScrollReveal } from '../hooks/useScrollReveal';
import Hero from '../components/Hero';
import InfoBand from '../components/InfoBand';
import About from '../components/About';
import Amenities from '../components/Amenities';
import Reviews from '../components/Reviews';
import Reservation from '../components/Reservation';
import Contact from '../components/Contact';

function HomePage() {
  useScrollReveal();

  return (
    <>
      <Hero />
      <InfoBand />
      <About />
      <Amenities />
      <Reviews />
      <Reservation />
      <Contact />
    </>
  );
}

export default HomePage;

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import InfoPage from './pages/InfoPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/galeri" element={<GalleryPage />} />
        <Route path="/bilgi" element={<InfoPage />} />
      </Routes>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default App;

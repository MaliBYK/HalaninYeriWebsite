import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../i18n/useLanguage';
import PageHeader from '../components/PageHeader';
import Gallery from '../components/Gallery';

function GalleryPage() {
  useScrollReveal();
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        title={t('navLinks.gallery')}
        subtitle={t('gallery.title')}
      />
      <Gallery />
    </>
  );
}

export default GalleryPage;

import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../i18n/useLanguage';
import PageHeader from '../components/PageHeader';
import Location from '../components/Location';
import FAQ from '../components/FAQ';

function InfoPage() {
  useScrollReveal();
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        title={t('navLinks.info')}
        subtitle={t('navLinks.infoSubtitle')}
      />
      <Location />
      <FAQ />
    </>
  );
}

export default InfoPage;

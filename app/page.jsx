import dynamic from 'next/dynamic';

const ClientExperience = dynamic(
  () => import('../components/ui/ClientExperience'),
  { ssr: false }
);

export default function Home() {
  return <ClientExperience />;
}

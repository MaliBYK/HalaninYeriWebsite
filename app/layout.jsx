import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700', '900'],
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '700'],
  display: 'swap',
});

export const metadata = {
  title: "Hala'nın Yeri — Olympos, Antalya",
  description:
    'Portakal ağaçları altında, Olympos antik kentine 10 dakika mesafede eşsiz kamp deneyimi.',
  keywords: ['kamp', 'olympos', 'antalya', 'çadır', 'doğa', 'hala'],
  openGraph: {
    title: "Hala'nın Yeri",
    description: 'Portakal ağaçları altında kamp deneyimi — Olympos, Antalya',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${playfair.variable} ${lato.variable}`}>
      <body className="bg-[#050D04] overflow-x-hidden">{children}</body>
    </html>
  );
}

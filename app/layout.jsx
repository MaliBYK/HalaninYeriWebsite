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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata = {
  title: "Hala'nın Yeri Camping | Olimpos Kamp Alanı Antalya",
  description: "Olimpos antik kentine 10 dk yürüme mesafesinde, portakal bahçesi içinde huzurlu kamp deneyimi. Çadır alanları, ahşap platformlar, ateş alanı, duş, WC. Antalya'nın en doğal kamp alanı.",
  keywords: [
    'olimpos kamp alanı',
    'antalya kamp alanları',
    'olympos camping',
    'olimpos çadır',
    'kumluca kamp',
    'antalya doğa tatili',
    'çadırlı kamp',
    'hanın yerı kamp',
    'olimpos konaklama',
    'antalya kamp yerleri',
    'olimpos bungalow',
    'ulupınar kamp',
    'cirali kamp',
    'tahta platform kamp',
    'portakal bahçesi kamp',
    'antalya kamp fiyatları',
    'olimpos kamp rezervasyon'
  ],
  authors: [{ name: "Hala'nın Yeri Camping" }],
  creator: "Hala'nın Yeri Camping",
  publisher: "Hala'nın Yeri Camping",

  openGraph: {
    title: "Hala'nın Yeri Camping | Olimpos Kamp Alanı - Antalya",
    description: "Olimpos antik kentine 10 dk, portakal bahçesinde huzurlu kamp deneyimi. Çadır alanları, ahşap platformlar, ateş alanı ve daha fazlası.",
    url: "https://halaninyeriamping.com",
    siteName: "Hala'nın Yeri Camping",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hala'nın Yeri Camping - Olimpos"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Hala'nın Yeri Camping | Olimpos Kamp Alanı",
    description: "Olimpos antik kentine 10 dk, portakal bahçesinde huzurlu kamp deneyimi.",
    images: ["/twitter-image.jpg"]
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: "GOOGLE_SEARCH_CONSOLE_KODU_BURAYA",
  }
};

export default function RootLayout({ children }) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        "@id": "https://halaninyeriamping.com/#organization",
        "name": "Hala'nın Yeri Camping",
        "url": "https://halaninyeriamping.com",
        "logo": "https://halaninyeriamping.com/logo.png",
        "image": "https://halaninyeriamping.com/hero-bg.jpg",
        "description": "Olimpos antik kentine 10 dk yürüme mesafesinde, portakal bahçesi içinde huzurlu kamp deneyimi.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Olimpos Yolu, Ulupınar Mevkii",
          "addressLocality": "Kumluca",
          "addressRegion": "Antalya",
          "postalCode": "07375",
          "addressCountry": "TR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "36.388920",
          "longitude": "30.459787"
        },
        "telephone": "+90-507-850-8806",
        "email": "info@halaninyeriamping.com",
        "priceRange": "₺₺",
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "Çadır Alanları", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Ahşap Platformlar", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Ateş Alanı", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Duş", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "WC", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Wi-Fi", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Elektrik", "value": true }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "150"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://halaninyeriamping.com/#local",
        "name": "Hala'nın Yeri Camping",
        "url": "https://halaninyeriamping.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kumluca",
          "addressRegion": "Antalya",
          "addressCountry": "TR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "36.388920",
          "longitude": "30.459787"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "08:00",
          "closes": "23:00"
        }
      },
      {
        "@type": "TouristAttraction",
        "@id": "https://halaninyeriamping.com/#attraction",
        "name": "Olimpos Kamp Alanı - Hala'nın Yeri",
        "url": "https://halaninyeriamping.com",
        "description": "Olimpos antik kentine yakın, portakal bahçesi içinde doğa ile iç içe kamp deneyimi",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "36.388920",
          "longitude": "30.459787"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kumluca",
          "addressRegion": "Antalya",
          "addressCountry": "TR"
        },
        "touristType": ["Doğa Severler", "Kamp Tutkunları", "Aileler", "Backpackers"]
      },
      {
        "@type": "FAQPage",
        "@id": "https://halaninyeriamping.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Olimpos kamp alanına nasıl gidilir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Hala'nın Yeri Camping, Olimpos antik kentine 10 dakika yürüme mesafesindedir. Antalya'dan Kumluca yönüne gelerek Olimpos sapağından dönülerek ulaşılır."
            }
          },
          {
            "@type": "Question",
            "name": "Kamp alanında neler var?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Çadır alanları, ahşap platformlar, ateş alanı, ortak kullanım alanı, duş, WC, Wi-Fi ve elektrik bulunmaktadır."
            }
          },
          {
            "@type": "Question",
            "name": "Kamp fiyatları ne kadar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Kişi başı günlük kamp ücretleri ve çadır kiralama seçenekleri için rezervasyon yaptırabilirsiniz."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://halaninyeriamping.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Ana Sayfa",
            "item": "https://halaninyeriamping.com"
          }
        ]
      }
    ]
  };

  return (
    <html lang="tr" className={`${playfair.variable} ${lato.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="bg-[#050D04] overflow-x-hidden">{children}</body>
    </html>
  );
}

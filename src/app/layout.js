import "./globals.css";
import AOSProvider from "@/components/AOSProvider";
import { AppProvider } from "@/components/AppContext";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL("https://decordazzlers.in"),
  title: {
    default: "Decor Dazzlers | Premium Luxury Event & Birthday Decorations in Hyderabad",
    template: "%s | Decor Dazzlers",
  },
  description:
    "Transforming celebrations into magical memories. Decor Dazzlers provides luxury balloon decorations, wedding stages, birthdays, baby showers, naming ceremonies, corporate events, and house warming decorations in Hyderabad.",
  keywords: [
    "Decor Dazzlers",
    "Luxury event decoration Hyderabad",
    "Birthday decoration Hyderabad",
    "Balloon decorator near me",
    "Baby shower decoration",
    "Wedding stage decoration",
    "Naming ceremony decor",
    "House warming balloon decoration",
    "Same day decoration setup Hyderabad",
  ],
  authors: [{ name: "Decor Dazzlers", url: "https://decordazzlers.in" }],
  creator: "Decor Dazzlers",
  publisher: "Decor Dazzlers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://decordazzlers.in",
  },
  openGraph: {
    title: "Decor Dazzlers | Premium Luxury Event & Birthday Decorations in Hyderabad",
    description:
      "Transforming celebrations into magical memories. Bespoke balloon art, luxury backdrops, and same-day decoration services in Hyderabad.",
    url: "https://decordazzlers.in",
    siteName: "Decor Dazzlers",
    images: [
      {
        url: "/images/birthday_decor.png",
        width: 1200,
        height: 630,
        alt: "Decor Dazzlers Premium Decorations",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Decor Dazzlers | Premium Luxury Event Decorations",
    description:
      "Transforming celebrations into magical memories in Hyderabad. Same day setup available.",
    images: ["/images/birthday_decor.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-site-verification-placeholder",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EventPlanningCompany",
  "name": "Decor Dazzlers",
  "image": "https://decordazzlers.in/logo.png",
  "@id": "https://decordazzlers.in",
  "url": "https://decordazzlers.in",
  "telephone": "+919876543210",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "addressCountry": "IN",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 17.385044,
    "longitude": 78.486671,
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    "opens": "08:00",
    "closes": "22:00",
  },
  "sameAs": [
    "https://www.instagram.com/decordazzlers",
    "https://www.facebook.com/decordazzlers",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden max-w-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-brand-cream text-brand-plum min-h-screen flex flex-col antialiased overflow-x-hidden max-w-full">
        <AppProvider>
          <AOSProvider>
            <MainLayoutWrapper>
              {children}
            </MainLayoutWrapper>
          </AOSProvider>
        </AppProvider>
      </body>
    </html>
  );
}


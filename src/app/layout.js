import "./globals.css";
import AOSProvider from "@/components/AOSProvider";
import { AppProvider } from "@/components/AppContext";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Decor Dazzlers | Premium Luxury Event Decorations",
  description: "Transforming celebrations into magical memories. We design luxury decorations for weddings, birthdays, baby showers, naming ceremonies, stage events, corporate showrooms, festivals, and other special occasions.",
  keywords: "luxury decoration, event decorator, stage decoration, baby shower decor, birthday party decor, festival decorations, naming ceremony, house warming decoration",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden max-w-full">
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

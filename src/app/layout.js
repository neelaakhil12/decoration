import "./globals.css";
import AOSProvider from "@/components/AOSProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Decor Dazzlers | Premium Luxury Event Decorations",
  description: "Transforming celebrations into magical memories. We design luxury decorations for weddings, birthdays, baby showers, naming ceremonies, stage events, corporate showrooms, festivals, and other special occasions.",
  keywords: "luxury decoration, event decorator, stage decoration, baby shower decor, birthday party decor, festival decorations, naming ceremony, house warming decoration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-brand-cream text-brand-plum min-h-screen flex flex-col antialiased">
        <AOSProvider>
          <Navbar />
          <main className="flex-grow pt-24">
            {children}
          </main>
          <Footer />
          <FloatingActions />
        </AOSProvider>
      </body>
    </html>
  );
}

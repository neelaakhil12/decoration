import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import { Sparkles, Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | Decor Dazzlers",
  description: "Get in touch with Decor Dazzlers for luxury event decorations. Pre-fill your booking details or connect directly on WhatsApp/Call.",
};

export default function ContactPage() {
  const whatsappUrl = "https://wa.me/919848677418?text=Hello%20Decor%20Dazzlers!%20I'm%20interested%20in%20a%20luxury%20decoration%20consultation.";

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-brand-plum text-brand-cream py-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/20 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-brand-gold" />
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-brand-cream">
              Get Connected
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-cream leading-tight">
            Book A Design <span className="text-gold-gradient italic">Consultation</span>
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details Column (5/12 cols) */}
            <div className="lg:col-span-5 space-y-8" data-aos="fade-right">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-plum">
                  Let's Discuss <span className="text-gold-gradient italic">Your Vision</span>
                </h2>
                <p className="text-brand-plum/80 font-sans text-sm sm:text-base leading-relaxed">
                  We look forward to translating your ideas into physical luxury. Reach out through our booking portal, call our hotline, or start a WhatsApp chat instantly.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-6">
                {/* Phone Call */}
                <div className="flex items-start space-x-4 bg-white p-5 rounded-2xl border border-brand-rosegold/10 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-brand-gold/10 p-3 rounded-full border border-brand-gold/25 shrink-0">
                    <Phone className="h-5 w-5 text-brand-gold" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs uppercase tracking-widest font-sans font-bold text-brand-plum/60 mb-1">
                      Call Support
                    </h4>
                    <a href="tel:+919848677418" className="text-sm sm:text-base font-serif font-semibold text-brand-plum hover:text-brand-gold transition-colors block break-words">
                      +91 98486 77418
                    </a>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start space-x-4 bg-white p-5 rounded-2xl border border-brand-rosegold/10 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-brand-gold/10 p-3 rounded-full border border-brand-gold/25 shrink-0">
                    <Mail className="h-5 w-5 text-brand-gold" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs uppercase tracking-widest font-sans font-bold text-brand-plum/60 mb-1">
                      Email Address
                    </h4>
                    <a href="mailto:info@decordazzlers.com" className="text-sm sm:text-base font-serif font-semibold text-brand-plum hover:text-brand-gold transition-colors block break-all">
                      info@decordazzlers.com
                    </a>
                  </div>
                </div>

                {/* Physical Location */}
                <div className="flex items-start space-x-4 bg-white p-5 rounded-2xl border border-brand-rosegold/10 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-brand-gold/10 p-3 rounded-full border border-brand-gold/25 shrink-0">
                    <MapPin className="h-5 w-5 text-brand-gold" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs uppercase tracking-widest font-sans font-bold text-brand-plum/60 mb-1">
                      Design Studio
                    </h4>
                    <p className="text-sm font-sans font-bold text-brand-plum leading-relaxed">
                      Sonu balloons & Party shop
                    </p>
                    <p className="text-xs font-sans text-brand-plum/80 leading-relaxed mt-1">
                      New Nagole Main Rd, Samathapuri Colony, Kothapet, Hyderabad, Telangana 500035
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout Button */}
              <div className="bg-emerald-50 border border-emerald-200/50 p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-4">
                <div className="text-center sm:text-left space-y-1">
                  <h4 className="text-sm font-serif font-bold text-emerald-800">
                    Prefer direct messaging?
                  </h4>
                  <p className="text-xs text-emerald-700/80 font-sans">
                    Chat with our design planners instantly on WhatsApp without filling the form.
                  </p>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs tracking-wider uppercase font-bold py-3 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 shrink-0 text-center w-full sm:w-auto"
                >
                  Chat Now
                </a>
              </div>
            </div>

            {/* Suspense Wrapped Form Column (7/12 cols) */}
            <div className="lg:col-span-7" data-aos="fade-left">
              <Suspense fallback={
                <div className="bg-white p-8 rounded-3xl border border-brand-rosegold/15 h-[500px] flex items-center justify-center">
                  <p className="text-sm text-brand-plum/60 font-sans animate-pulse">Loading form details...</p>
                </div>
              }>
                <ContactForm />
              </Suspense>
            </div>
          </div>

          {/* Google Maps block (Full Width below) */}
          <div className="mt-16 rounded-3xl overflow-hidden border border-brand-gold/30 shadow-2xl h-96 w-full" data-aos="zoom-in">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.8286915152865!2d78.5492477!3d17.3719001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99281a8ef1bf%3A0xe543e03d7cd7c992!2sNagole%20Main%20Rd%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Decor Dazzlers Location Map"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

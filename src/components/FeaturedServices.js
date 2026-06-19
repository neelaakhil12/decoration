import Link from "next/link";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";

export default function FeaturedServices() {
  const services = [
    {
      title: "Birthday Decoration",
      description: "Custom balloon arches, personalized backdrops, and theme-based styling to make birthdays truly spectacular.",
      image: "/images/birthday_decor.png",
    },
    {
      title: "Baby Shower Decoration",
      description: "Dreamy floral designs, pastel color schemes, and charming photo booths to welcome new bundles of joy.",
      image: "/images/baby_shower_decor.png",
    },
    {
      title: "Stage Decoration",
      description: "Grand floral arrangements, royal seating backdrops, and luxury lighting setups for weddings and grand receptions.",
      image: "/images/stage_decor.png",
    },
    {
      title: "Anniversary Decoration",
      description: "Romantic setups with candle-lit elements, rose-gold accents, and cozy canopies for intimate love celebrations.",
      image: "/images/anniversary_decor.png",
    },
  ];

  return (
    <section className="py-24 bg-brand-cream relative">
      <div className="absolute inset-0 bg-[radial-gradient(#D4A64A_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <div className="inline-flex items-center space-x-2 bg-brand-rosegold/10 border border-brand-rosegold/20 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-brand-gold" />
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-brand-plum">
              Handcrafted Elegance
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-plum mb-6 leading-tight">
            Our Featured <span className="text-gold-gradient italic">Decorations</span>
          </h2>
          <p className="text-brand-plum/80 font-sans max-w-xl mx-auto text-sm sm:text-base">
            Explore our most sought-after decoration categories, curated with custom themes to bring festive energy to your events.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl overflow-hidden border border-brand-rosegold/10 hover:border-brand-gold/60 transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col h-full group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Image Container with Zoom */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-plum/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white text-xs tracking-wider uppercase font-semibold flex items-center space-x-1.5">
                    <span>View Category Details</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif font-bold text-brand-plum group-hover:text-brand-gold transition-colors duration-300 mb-3">
                  {service.title}
                </h3>
                <p className="text-brand-plum/70 text-sm font-sans leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                <Link
                  href="/contact"
                  className="w-full text-center bg-brand-pink/30 hover:bg-gold-gradient text-brand-plum font-sans text-xs tracking-wider uppercase font-bold py-3 px-4 rounded-xl transition-all duration-300 border border-brand-rosegold/20 hover:border-brand-gold group-hover:shadow-md"
                >
                  Enquire Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-14" data-aos="fade-up">
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 bg-brand-plum text-brand-cream hover:bg-gold-gradient hover:text-brand-plum px-8 py-4 rounded-full font-sans text-sm tracking-wider uppercase font-bold shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Explore All 13 Services</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Decoration Services | Decor Dazzlers",
  description: "Browse our 13 luxury event decoration services: Birthdays, Weddings, Stages, Baby Showers, Naming Ceremonies, Corporate Showrooms, Festivals, and more.",
};

const allServices = [
  {
    title: "Birthday Decoration",
    category: "Birthday",
    description: "Custom balloon arches, personalized backdrops, photo booths, and theme-based styling to make birthdays truly spectacular.",
    image: "/images/birthday_decor.png",
  },
  {
    title: "Kids Birthday Decoration",
    category: "Birthday",
    description: "Whimsical cartoon, jungle, and fairy tale themes with child-safe structural props and play zones.",
    image: "/images/kids_birthday_decor.png",
  },
  {
    title: "Baby Shower Decoration",
    category: "Baby Shower",
    description: "Dreamy floral designs, pastel color schemes, cozy canopies, and charming photobooths to welcome mothers-to-be.",
    image: "/images/baby_shower_decor.png",
  },
  {
    title: "Stage Decoration",
    category: "Stage & Wedding",
    description: "Grand floral arrangements, royal seating backdrops, and luxury LED lighting setups for weddings and grand receptions.",
    image: "/images/stage_decor.png",
  },
  {
    title: "Welcome Baby Decoration",
    category: "Baby Shower",
    description: "Charming home entry balloons, custom crib decoration, and welcoming signage for the little star.",
    image: "/images/welcome_baby_decor.png",
  },
  {
    title: "Naming Ceremony Decoration",
    category: "Traditional",
    description: "Elegant traditional flower patterns, marigold drapes, and customized brass pot arrangements.",
    image: "/images/house_warming_decor.png",
  },
  {
    title: "Anniversary Decoration",
    category: "Romantic",
    description: "Romantic setups with candle-lit elements, rose-gold accents, and cozy canopies for intimate love celebrations.",
    image: "/images/anniversary_decor.png",
  },
  {
    title: "House Warming Decoration",
    category: "Traditional",
    description: "Auspicious mango leaf garlands, floral thresholds, and positive energy drapes for your brand new home.",
    image: "/images/house_warming_decor.png",
  },
  {
    title: "First Night Decoration",
    category: "Romantic",
    description: "Exquisite bed decorations, aromatic candle setups, red rose petal pathways, and luxurious satin drapery.",
    image: "/images/anniversary_decor.png",
  },
  {
    title: "Corporate Showroom Decoration",
    category: "Corporate",
    description: "Sophisticated branding-colored balloon columns, grand opening ribbons, and elegant entrance arches.",
    image: "/images/birthday_decor.png",
  },
  {
    title: "Car Decoration",
    category: "Specialty",
    description: "Fresh orchid, rose, and ribbon styling for wedding cars, showroom deliveries, or surprise celebrations.",
    image: "/images/car_decor.png",
  },
  {
    title: "Pet Decoration",
    category: "Specialty",
    description: "Cute customized dog/cat birthday setups with pet-friendly balloon materials and photo backdrops.",
    image: "/images/pet_decor.png",
  },
  {
    title: "Festival Decoration",
    category: "Traditional",
    description: "Splendid lights and traditional decorations for Diwali, Christmas, Eid, Ganesha Chaturthi, and Navratri.",
    image: "/images/festival_decor.png",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-brand-plum text-brand-cream py-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-rosegold/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/20 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-brand-gold" />
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-brand-cream">
              Exclusive Packages
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-brand-cream leading-tight">
            Our Luxury <span className="text-gold-gradient italic">Decoration Services</span>
          </h1>
          <p className="text-brand-pink/80 font-sans max-w-xl mx-auto mt-4 text-sm sm:text-base leading-relaxed">
            We provide full-service decorative planning and setups for 13 distinct types of celebrations, transforming spaces into beautiful magical realms.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, index) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl overflow-hidden border border-brand-rosegold/10 hover:border-brand-gold/60 transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col h-full group"
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 100}
              >
                {/* Image Container with Zoom */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
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
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="w-full text-center bg-brand-pink/30 hover:bg-gold-gradient text-brand-plum font-sans text-xs tracking-wider uppercase font-bold py-3 px-4 rounded-xl transition-all duration-300 border border-brand-rosegold/20 hover:border-brand-gold group-hover:shadow-md flex items-center justify-center space-x-2"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA Section */}
      <section className="py-20 bg-cream-gradient relative overflow-hidden text-center border-t border-brand-rosegold/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-plum mb-6 leading-tight">
            Didn't Find Your Exact Theme?
          </h2>
          <p className="text-brand-plum/80 font-sans max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            We specialize in bespoke custom designs. Let's arrange a telephone call or virtual consultation to draft your custom theme!
          </p>
          <div className="flex justify-center">
            <Link
              href="/contact?service=Custom%20Theme"
              className="bg-gold-gradient text-brand-plum px-10 py-4 rounded-full font-sans text-xs tracking-wider uppercase font-bold shadow-lg hover:shadow-xl gold-glow-hover transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <Calendar className="h-4 w-4 shrink-0" />
              <span>Contact Design Studio</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

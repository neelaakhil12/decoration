import { Crown, Palette, Tag, Zap, Sliders } from "lucide-react";

export default function WhyChooseUs() {
  const items = [
    {
      title: "Creative Theme Designs",
      description: "Our artists draft custom concepts and layouts, ensuring your celebration is completely unique and aesthetically magnificent.",
      icon: Palette,
      delay: 100,
    },
    {
      title: "Affordable Packages",
      description: "Get premium luxury styling that aligns perfectly with your budget. We offer transparent pricing structures without compromise.",
      icon: Tag,
      delay: 200,
    },
    {
      title: "Fast Setup",
      description: "Our dedicated on-field crew sets up layouts swiftly and meticulously, guaranteeing ready stages before guests arrive.",
      icon: Zap,
      delay: 300,
    },
    {
      title: "Customized Decorations",
      description: "Tailor every color shade, balloon setup, and floral pattern. We collaborate with you to paint your personal story in details.",
      icon: Sliders,
      delay: 400,
    },
    {
      title: "Premium Quality Service",
      description: "We use top-grade fabrics, fresh luxury flowers, premium balloons, and safe structural supports for pristine visual impact.",
      icon: Crown,
      delay: 500,
    },
  ];

  return (
    <section className="py-24 bg-brand-plum text-brand-cream relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-rosegold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <span className="text-xs uppercase tracking-widest font-sans font-bold text-brand-gold bg-brand-gold/10 px-4 py-1.5 rounded-full border border-brand-gold/20 inline-block mb-4">
            Why Decor Dazzlers
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-cream leading-tight">
            Crafting Celebrations <span className="text-gold-gradient italic">With Perfection</span>
          </h2>
          <p className="text-brand-pink/70 font-sans max-w-lg mx-auto mt-4 text-sm sm:text-base">
            We are dedicated to bringing your dreams to life with quality resources, efficient planning, and creative elegance.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-brand-cream/5 border border-brand-gold/15 p-6 rounded-2xl hover:bg-brand-cream/10 hover:border-brand-gold transition-all duration-300 transform hover:-translate-y-2 text-center flex flex-col items-center group shadow-sm hover:shadow-2xl"
                data-aos="fade-up"
                data-aos-delay={item.delay}
              >
                {/* Icon wrapper */}
                <div className="bg-brand-gold/10 p-4 rounded-full border border-brand-gold/20 group-hover:bg-brand-gold/25 transition-all duration-300 mb-6">
                  <Icon className="h-6 w-6 text-brand-gold group-hover:scale-110 transition-transform" />
                </div>
                {/* Title */}
                <h3 className="text-lg font-serif font-bold text-brand-cream mb-3 tracking-wide">
                  {item.title}
                </h3>
                {/* Description */}
                <p className="text-brand-pink/70 text-xs font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

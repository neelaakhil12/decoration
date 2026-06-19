import { Sparkles, Heart, Target, Eye, Users, Calendar, Award } from "lucide-react";

export const metadata = {
  title: "About Us | Decor Dazzlers",
  description: "Learn about the story, mission, and vision of Decor Dazzlers, a premium luxury event decoration service specialized in creating magical memories.",
};

export default function AboutPage() {
  const stats = [
    { label: "Years Experience", value: "8+", icon: Calendar },
    { label: "Events Completed", value: "1,500+", icon: Award },
    { label: "Happy Families", value: "1,200+", icon: Users },
  ];

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-brand-plum text-brand-cream py-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/20 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-brand-gold" />
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-brand-cream">
              Our Legacy
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-brand-cream leading-tight">
            Crafting Dreamy <span className="text-gold-gradient italic">Celebrations</span>
          </h1>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story Image wrapper */}
            <div className="relative h-[450px] w-full rounded-3xl overflow-hidden border border-brand-gold/25 shadow-2xl" data-aos="fade-right">
              <img
                src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&auto=format&fit=crop&q=80"
                alt="Luxury Stage Decoration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-plum/40 to-transparent" />
            </div>

            {/* Story Text */}
            <div className="space-y-6" data-aos="fade-left">
              <div className="inline-flex items-center space-x-2 bg-brand-plum/5 border border-brand-rosegold/20 px-3 py-1.5 rounded-full">
                <Heart className="h-4 w-4 text-brand-rosegold" />
                <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-brand-plum">
                  How We Started
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-plum leading-tight">
                From A Simple Spark To <span className="text-gold-gradient italic">Luxury Halls</span>
              </h2>
              <p className="text-brand-plum/85 font-sans text-sm sm:text-base leading-relaxed">
                Decor Dazzlers was founded with a clear objective: to rescue event decoration from standard, repetitive patterns and inject high-end luxury styling and emotional energy into celebrations. 
              </p>
              <p className="text-brand-plum/75 font-sans text-sm leading-relaxed">
                We believe that decorations are not just backgrounds; they are the visual canvas of your memories. Over the last eight years, we have grown from a boutique balloon planner to a grand, full-service event decoration studio, catering to over 1,500 milestone occasions across the region.
              </p>

              {/* Statistics Display */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-rosegold/20">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="text-center">
                      <div className="flex justify-center mb-1">
                        <Icon className="h-5 w-5 text-brand-gold" />
                      </div>
                      <p className="text-xl sm:text-2xl font-serif font-extrabold text-brand-plum">
                        {stat.value}
                      </p>
                      <p className="text-brand-plum/60 text-[10px] sm:text-xs font-sans tracking-wide uppercase mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-brand-plum text-brand-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#D4A64A_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission Card */}
            <div className="bg-brand-cream/5 border border-brand-gold/15 p-8 rounded-3xl space-y-4" data-aos="fade-up" data-aos-delay="100">
              <div className="bg-brand-gold/10 p-3.5 rounded-full border border-brand-gold/25 w-fit">
                <Target className="h-6 w-6 text-brand-gold" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-cream">
                Our Mission
              </h3>
              <p className="text-brand-pink/80 font-sans text-sm leading-relaxed">
                To transform ordinary physical spaces into beautiful emotional environments. We strive to craft bespoke designs that perfectly reflect each family's culture and joy, delivering high-end quality within accessible budgets.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-brand-cream/5 border border-brand-gold/15 p-8 rounded-3xl space-y-4" data-aos="fade-up" data-aos-delay="200">
              <div className="bg-brand-gold/10 p-3.5 rounded-full border border-brand-gold/25 w-fit">
                <Eye className="h-6 w-6 text-brand-gold" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-cream">
                Our Vision
              </h3>
              <p className="text-brand-pink/80 font-sans text-sm leading-relaxed">
                To become the leading name in premium luxury event decorations, known for our innovative custom themes, sustainable decorating materials, fast setups, and the visual wow factor that guests speak about for years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Customers Trust Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-plum">
              Why Customers <span className="text-gold-gradient italic">Trust Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-brand-rosegold/10 shadow-sm space-y-4" data-aos="zoom-in" data-aos-delay="100">
              <h4 className="text-lg font-serif font-bold text-brand-plum">Bespoke Design Customization</h4>
              <p className="text-brand-plum/70 font-sans text-xs sm:text-sm leading-relaxed">
                No copy-pasting. Every single detail is drawn and color-matched to align with your personal aesthetic wishes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-brand-rosegold/10 shadow-sm space-y-4" data-aos="zoom-in" data-aos-delay="200">
              <h4 className="text-lg font-serif font-bold text-brand-plum">Premium Quality Standards</h4>
              <p className="text-brand-plum/70 font-sans text-xs sm:text-sm leading-relaxed">
                We strictly use brand-certified latex balloons, freshly cut top-tier flowers, and premium dust-free drapes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-brand-rosegold/10 shadow-sm space-y-4" data-aos="zoom-in" data-aos-delay="300">
              <h4 className="text-lg font-serif font-bold text-brand-plum">On-Time Execution Guarantee</h4>
              <p className="text-brand-plum/70 font-sans text-xs sm:text-sm leading-relaxed">
                Our strict operational tracking ensures our team finishes the entire stage setup 1 hour before your event schedule.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

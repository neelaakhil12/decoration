"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Sparkles } from "lucide-react";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") || "";

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    eventType: "",
    eventDate: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (serviceParam) {
      setFormData((prev) => ({ ...prev, eventType: serviceParam }));
    }
  }, [serviceParam]);

  const eventTypes = [
    "Birthday Decoration",
    "Kids Birthday Decoration",
    "Baby Shower Decoration",
    "Stage Decoration",
    "Welcome Baby Decoration",
    "Naming Ceremony Decoration",
    "Anniversary Decoration",
    "House Warming Decoration",
    "First Night Decoration",
    "Corporate Showroom Decoration",
    "Car Decoration",
    "Pet Decoration",
    "Festival Decoration",
    "Other Custom Theme"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct pre-filled WhatsApp link with input data
    const messageText = `Hello Decor Dazzlers! I would like to book a decoration:
- Name: ${formData.fullName}
- Phone: ${formData.phoneNumber}
- Event Type: ${formData.eventType}
- Event Date: ${formData.eventDate}
- Message: ${formData.message}`;

    const whatsappUrl = `https://wa.me/917075555987?text=${encodeURIComponent(messageText)}`;

    // Show success state
    setIsSubmitted(true);

    // Open WhatsApp after a short delay
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitted(false);
      // Reset form
      setFormData({
        fullName: "",
        phoneNumber: "",
        eventType: "",
        eventDate: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-brand-rosegold/15 shadow-xl relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />

      {isSubmitted ? (
        <div className="py-16 text-center space-y-4 animate-fade-in">
          <div className="bg-brand-gold/15 p-4 rounded-full border border-brand-gold/30 w-fit mx-auto animate-pulse">
            <Sparkles className="h-8 w-8 text-brand-gold" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-brand-plum">
            Booking Details Pre-Filled!
          </h3>
          <p className="text-brand-plum/70 font-sans text-sm max-w-sm mx-auto">
            Opening WhatsApp to complete your design consultation directly with our creative director...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-2xl font-serif font-bold text-brand-plum mb-6 flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-brand-gold shrink-0" />
            <span>Send Booking Enquiry</span>
          </h3>

          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-xs uppercase tracking-widest font-sans font-bold text-brand-plum/80">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-brand-rosegold/20 focus:outline-none focus:border-brand-gold bg-brand-cream/10 text-sm font-sans"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="block text-xs uppercase tracking-widest font-sans font-bold text-brand-plum/80">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="e.g. +91 98765 43210"
              className="w-full px-4 py-3 rounded-xl border border-brand-rosegold/20 focus:outline-none focus:border-brand-gold bg-brand-cream/10 text-sm font-sans"
            />
          </div>

          {/* Event Type & Date (Grid on tablet+) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Type Select */}
            <div className="space-y-2">
              <label htmlFor="eventType" className="block text-xs uppercase tracking-widest font-sans font-bold text-brand-plum/80">
                Event Type
              </label>
              <select
                id="eventType"
                name="eventType"
                required
                value={formData.eventType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brand-rosegold/20 focus:outline-none focus:border-brand-gold bg-brand-cream/10 text-sm font-sans text-brand-plum"
              >
                <option value="" disabled>Select Celebration Type</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Event Date */}
            <div className="space-y-2">
              <label htmlFor="eventDate" className="block text-xs uppercase tracking-widest font-sans font-bold text-brand-plum/80">
                Event Date
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                required
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brand-rosegold/20 focus:outline-none focus:border-brand-gold bg-brand-cream/10 text-sm font-sans text-brand-plum"
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-xs uppercase tracking-widest font-sans font-bold text-brand-plum/80">
              Your Requirements / Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your design wishes, balloon colors, theme style..."
              className="w-full px-4 py-3 rounded-xl border border-brand-rosegold/20 focus:outline-none focus:border-brand-gold bg-brand-cream/10 text-sm font-sans"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gold-gradient text-brand-plum py-4 rounded-full font-sans text-xs tracking-wider uppercase font-bold shadow-md hover:shadow-xl gold-glow transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Send className="h-4 w-4" />
            <span>Send Enquiry to WhatsApp</span>
          </button>
        </form>
      )}
    </div>
  );
}

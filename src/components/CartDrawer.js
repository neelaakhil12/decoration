"use client";
import { X, ShoppingBag, Plus, Minus, Trash2, Calendar, ShieldCheck, Sparkles } from "lucide-react";
import { useApp } from "./AppContext";

export default function CartDrawer() {
  const {
    cart,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    openBookingModal
  } = useApp();

  if (!isCartOpen) return null;

  const handleSendWhatsAppOrder = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    const cartSummary = cart.map((i) => `${i.title} (x${i.quantity})`).join(", ");
    openBookingModal({ title: `Cart Items (${cartCount}): ${cartSummary} - ₹${cartTotal}` });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Drawer Panel */}
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full transform transition-transform duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-brand-cream">
            <div className="flex items-center gap-2.5">
              <div className="relative p-2 bg-brand-gold/10 rounded-full text-brand-gold">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full text-[9px] font-black h-4.5 w-4.5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-serif text-lg font-black text-brand-plum">Your Cart</h3>
                <p className="text-xs text-brand-plum/60 font-sans">Hyderabad Decoration Setup</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 text-brand-plum hover:text-brand-gold transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4 scroll-bar-remove">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-gray-50 border border-gray-100 rounded-2xl group transition-all duration-300 hover:shadow-sm"
                >
                  {/* Image */}
                  <div className="h-20 w-20 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-200/60">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-grow flex flex-col justify-between text-left">
                    <div>
                      <h4 className="text-xs sm:text-sm font-sans font-bold text-brand-plum line-clamp-1 leading-tight group-hover:text-brand-gold transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-brand-plum/50 font-sans mt-0.5">ID: {item.id}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs sm:text-sm font-sans font-black text-brand-plum">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>

                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-200 bg-white rounded-full">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-brand-plum/60 hover:text-brand-plum hover:bg-gray-100 rounded-full transition-all"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-black font-sans text-brand-plum min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-brand-plum/60 hover:text-brand-plum hover:bg-gray-100 rounded-full transition-all"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove action */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 hover:text-red-500 text-brand-plum/30 transition-colors self-start shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                <div className="p-5 bg-brand-gold/5 rounded-full border border-brand-gold/15">
                  <ShoppingBag className="h-10 w-10 text-brand-gold" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-black text-brand-plum">Your cart is empty</h4>
                  <p className="text-xs text-brand-plum/60 font-sans max-w-[220px] mx-auto mt-1 leading-relaxed">
                    Explore our trending themes and add setups to your cart to begin booking!
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-brand-plum hover:bg-brand-gold text-white hover:text-brand-plum font-sans text-xs font-black tracking-wider uppercase px-6 py-2.5 rounded-full transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Checkout Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-3 py-1 text-left border-b border-gray-200/50 pb-3">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-brand-gold" />
                  <span className="text-[10px] font-sans font-bold text-brand-plum/80 leading-none">Book 90 Days Ahead</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-gold" />
                  <span className="text-[10px] font-sans font-bold text-brand-plum/80 leading-none">Verified Artists Only</span>
                </div>
              </div>

              {/* Pricing details */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-brand-plum/60 font-sans">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-xs text-brand-plum/60 font-sans">
                  <span>Setup & Delivery (Hyderabad)</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-base font-serif font-black text-brand-plum pt-1.5 border-t border-dashed border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-brand-plum font-sans text-lg">₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* WhatsApp Checkout CTA */}
              <button
                onClick={handleSendWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3.5 rounded-full font-sans text-sm font-black tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Book Setup on WhatsApp</span>
              </button>

              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-brand-plum/40 hover:text-red-500 font-sans font-bold underline transition-colors"
              >
                Clear All Items
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

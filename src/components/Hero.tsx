import React, { useState } from 'react';
import { Search, ShieldCheck, ArrowRight, Truck, CheckCircle2, Clock, Lock } from 'lucide-react';

interface HeroProps {
  onOpenTracking: (trackingNumber?: string) => void;
  onStartBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTracking, onStartBooking }) => {
  const [trackNum, setTrackNum] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenTracking(trackNum.trim() || undefined);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#BFE3F7] via-[#E2F2FC] to-[#8FCBEA] border-b border-[#BFE3F7]/80 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-[#1D4F91]/10 rounded-full blur-xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headlines & Reassurance */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Trust badge pill */}
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full shadow-xs border border-sky-200 text-xs font-semibold text-[#152A4E]">
              <ShieldCheck className="w-4 h-4 text-[#2FAE60]" />
              <span>Texas Registered Freight Courier & Logistics</span>
              <span className="text-gray-300">|</span>
              <span className="text-[#1D4F91] font-bold">100% Guaranteed Delivery</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl xl:text-5xl font-extrabold text-[#152A4E] leading-tight tracking-tight">
              Ship from USA to Nigeria <br className="hidden sm:inline" />
              and from Nigeria to USA
            </h1>

            {/* Subtitle */}
            <p className="font-body text-base sm:text-lg text-[#22262E]/90 max-w-2xl font-normal leading-relaxed">
              Reliable and Affordable Shipping Services To Give You The Peace Of Mind You Deserve.
              <span className="font-semibold text-[#152A4E] block mt-1">
                No hidden customs fees. No lost packages. Real-time updates every step of the way.
              </span>
            </p>

            {/* Key Trust Checklist */}
            <div className="pt-1 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-[#152A4E]">
              <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2FAE60] shrink-0" />
                <span>On-time Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2FAE60] shrink-0" />
                <span>Careful Handling</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2FAE60] shrink-0" />
                <span>Real-time Updates</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2FAE60] shrink-0" />
                <span>Clear Communication</span>
              </div>
            </div>
          </div>

          {/* Right Column: Tracking Box & Instant Action (styled after reference prompt) */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-lg border border-white/80 space-y-4">
              
              {/* Tab Header */}
              <div className="text-xs font-semibold text-gray-500 flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-[#152A4E] font-bold uppercase tracking-wider text-[11px]">
                  Track Your Shipment • Ship Now • Get a Quote
                </span>
                <span className="text-[#2FAE60] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#2FAE60] animate-pulse"></span>
                  Live System
                </span>
              </div>

              {/* Tracking Input Form */}
              <form onSubmit={handleTrackSubmit} className="space-y-3">
                <label className="block text-xs font-semibold text-[#152A4E]">
                  Enter Tracking / Booking Reference:
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter Tracking Number... (e.g. KL-TEX-892410-NG)"
                      value={trackNum}
                      onChange={(e) => setTrackNum(e.target.value)}
                      className="w-full pl-3.5 pr-3 py-2.5 text-sm font-medium rounded-xl border border-gray-300 focus:border-[#152A4E] focus:ring-2 focus:ring-[#152A4E]/20 bg-gray-50/50 focus:bg-white transition-all text-[#22262E] placeholder-gray-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#152A4E] hover:bg-[#1D4F91] active:scale-98 text-white px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all shrink-0 cursor-pointer"
                  >
                    <span>TRACK</span>
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Sample Quick Tracking Links */}
              <div className="pt-1 text-xs">
                <div className="text-gray-500 font-medium mb-1.5 flex items-center justify-between">
                  <span>Try demo tracking numbers:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => onOpenTracking('KL-TEX-892410-NG')}
                    className="bg-sky-50 hover:bg-sky-100 text-[#152A4E] text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-sky-200 transition-colors"
                  >
                    KL-TEX-892410-NG (Container)
                  </button>
                  <button
                    onClick={() => onOpenTracking('KL-883920-LOS')}
                    className="bg-sky-50 hover:bg-sky-100 text-[#152A4E] text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-sky-200 transition-colors"
                  >
                    KL-883920-LOS (Air)
                  </button>
                  <button
                    onClick={() => onOpenTracking('KL-774011-ABJ')}
                    className="bg-sky-50 hover:bg-sky-100 text-[#152A4E] text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-sky-200 transition-colors"
                  >
                    KL-774011-ABJ (Delivered)
                  </button>
                </div>
              </div>

              {/* Instant CTA to jump to form */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">Need a instant shipping quote?</span>
                <button
                  onClick={onStartBooking}
                  className="text-xs font-bold text-[#152A4E] hover:text-[#1D4F91] flex items-center gap-1 hover:underline"
                >
                  Start Booking Form Below ↓
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

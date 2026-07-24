import React from 'react';
import { ShieldCheck, FileText, Anchor, Truck, Plane, CheckCircle2, Phone, AlertCircle, HelpCircle } from 'lucide-react';

interface ResourcesSectionProps {
  onStartBooking: () => void;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({ onStartBooking }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4 animate-in fade-in duration-200">
      
      {/* Hero Callout Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 bg-sky-100 text-[#152A4E] text-xs font-bold px-3 py-1 rounded-full">
          <ShieldCheck className="w-4 h-4 text-[#2FAE60]" />
          <span>You Deserve A Shipping Provider You Can Trust</span>
        </div>

        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#152A4E]">
          Why Texas & Nigerian Businesses Choose Kingz Logistics
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
          Shipping across oceans shouldn't be stressful. We counter the distrust common in West African freight logistics by guaranteeing transparent pricing, careful handling, zero hidden charges, and direct communication from our Texas and Lagos dispatch centers.
        </p>

        {/* 4 Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 bg-sky-50/60 rounded-2xl border border-sky-100 space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-[#152A4E] text-white flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="font-heading font-bold text-sm text-[#152A4E]">On-Time Delivery</h4>
            <p className="text-xs text-gray-500 leading-snug">
              Direct vessel & flight schedules from Houston and Lagos without unnecessary delays.
            </p>
          </div>

          <div className="p-4 bg-sky-50/60 rounded-2xl border border-sky-100 space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-[#152A4E] text-white flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="font-heading font-bold text-sm text-[#152A4E]">Careful Handling</h4>
            <p className="text-xs text-gray-500 leading-snug">
              Rigid protective crating and trained loaders prevent damage to fragile or high-value items.
            </p>
          </div>

          <div className="p-4 bg-sky-50/60 rounded-2xl border border-sky-100 space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-[#152A4E] text-white flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="font-heading font-bold text-sm text-[#152A4E]">Real-Time Updates</h4>
            <p className="text-xs text-gray-500 leading-snug">
              Tracking codes and WhatsApp milestone notifications at every stage of transit.
            </p>
          </div>

          <div className="p-4 bg-sky-50/60 rounded-2xl border border-sky-100 space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-[#152A4E] text-white flex items-center justify-center font-bold text-xs">
              04
            </div>
            <h4 className="font-heading font-bold text-sm text-[#152A4E]">Clear Communication</h4>
            <p className="text-xs text-gray-500 leading-snug">
              Dedicated Houston desk officers available to speak directly with you by phone or WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* Customs Guidelines & Prohibited Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Customs Requirements */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-3">
          <h3 className="font-heading font-bold text-lg text-[#152A4E] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#1D4F91]" />
            USA ↔ Nigeria Customs Regulations
          </h3>

          <ul className="space-y-2 text-xs text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2FAE60] shrink-0 mt-0.5" />
              <span><strong>Commercial Cargo:</strong> Requires commercial invoice, packing list, and Form M / PAAR for Nigeria imports above $5,000 value.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2FAE60] shrink-0 mt-0.5" />
              <span><strong>Vehicle RoRo Clearance:</strong> Vehicles shipping from USA to Nigeria must present original Title, Bill of Sale, and Clean Lien release.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2FAE60] shrink-0 mt-0.5" />
              <span><strong>Personal Goods & Foodstuff:</strong> Dry foodstuff (cereal, spices, dried fish) must be sealed and labeled to pass US Customs & FDA inspection.</span>
            </li>
          </ul>
        </div>

        {/* Prohibited Items */}
        <div className="bg-amber-50/70 rounded-2xl p-6 border border-amber-200 space-y-3">
          <h3 className="font-heading font-bold text-lg text-amber-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            Restricted & Prohibited Items
          </h3>

          <p className="text-xs text-amber-900/80">
            To ensure zero delays or confiscation by maritime or customs authorities, the following items cannot be shipped in regular containers:
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs text-amber-950 font-medium">
            <div className="bg-white/80 p-2 rounded-lg border border-amber-200">❌ Firearms & Munitions</div>
            <div className="bg-white/80 p-2 rounded-lg border border-amber-200">❌ Unlabeled Chemicals</div>
            <div className="bg-white/80 p-2 rounded-lg border border-amber-200">❌ Cash & Banknotes</div>
            <div className="bg-white/80 p-2 rounded-lg border border-amber-200">❌ Illegal Substances</div>
            <div className="bg-white/80 p-2 rounded-lg border border-amber-200">❌ Explosives / Fireworks</div>
            <div className="bg-white/80 p-2 rounded-lg border border-amber-200">❌ Counterfeit Currencies</div>
          </div>
        </div>

      </div>

      {/* CTA Banner */}
      <div className="bg-[#152A4E] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-heading font-extrabold text-xl text-white">
            Ready to ship your cargo with complete confidence?
          </h3>
          <p className="text-xs text-sky-200 mt-1">
            Calculate your rate live and generate your official Kingz booking reference in under 2 minutes.
          </p>
        </div>

        <button
          onClick={onStartBooking}
          className="bg-[#2FAE60] hover:bg-emerald-600 text-white font-heading font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
        >
          Book Shipment Now
        </button>
      </div>

    </div>
  );
};

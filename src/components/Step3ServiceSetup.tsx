import React from 'react';
import { BookingFormData, ServiceSpeed, DeliveryMode, PaymentMethod } from '../types';
import { calculateShippingRates } from '../data/constants';
import { Clock, ShieldCheck, Home, Warehouse, CreditCard, Landmark, Banknote, CheckCircle2, ArrowLeft, Send, AlertCircle } from 'lucide-react';

interface Step3Props {
  formData: BookingFormData;
  updateFormData: (fields: Partial<BookingFormData>) => void;
  onSubmitBooking: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export const Step3ServiceSetup: React.FC<Step3Props> = ({
  formData,
  updateFormData,
  onSubmitBooking,
  onBack,
  isSubmitting = false,
}) => {
  const rates = calculateShippingRates(formData);

  const speedOptions = [
    {
      id: 'standard' as ServiceSpeed,
      title: 'Standard Freight Speed',
      time: formData.method === 'air' ? '7–10 Days' : '18–25 Days',
      badge: 'Most Popular',
      desc: 'Regular scheduled vessel/flight departure with standard customs processing.',
      surcharge: 'Standard Rate',
    },
    {
      id: 'express' as ServiceSpeed,
      title: 'Express Priority Cargo',
      time: formData.method === 'air' ? '3–5 Days' : '14–18 Days',
      badge: 'Fastest',
      desc: 'Priority space booking on the next outgoing departure with express clearance.',
      surcharge: '+35% Speed Tier',
    },
    {
      id: 'economy' as ServiceSpeed,
      title: 'Economy Saver Route',
      time: formData.method === 'air' ? '10–14 Days' : '30–45 Days',
      badge: 'Budget Choice',
      desc: 'Cost-effective consolidated shipping option for non-urgent shipments.',
      surcharge: '15% Discount',
    },
  ];

  const isFormValid = formData.termsAccepted;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Step Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#1D4F91]">
          Step 3 of 3
        </span>
        <h2 className="font-heading font-extrabold text-2xl text-[#152A4E]">
          Service Speed, Protection & Payment
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Finalize your preferred delivery speed, insurance coverage, and payment option to complete your booking.
        </p>
      </div>

      {/* SERVICE SPEED SELECTION */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-[#152A4E] uppercase tracking-wider">
          1. Select Service Speed & Transit Tier
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {speedOptions.map((opt) => {
            const isSelected = formData.serviceSpeed === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => updateFormData({ serviceSpeed: opt.id })}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#152A4E] bg-sky-50/50 ring-2 ring-[#152A4E]/10 shadow-xs'
                    : 'border-gray-200 bg-white hover:border-sky-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-heading font-bold text-sm text-[#152A4E]">
                      {opt.title}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-[#1D4F91] shrink-0">
                      {opt.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D4F91] my-1">
                    <Clock className="w-4 h-4" />
                    <span>Est. Transit: {opt.time}</span>
                  </div>

                  <p className="text-xs text-gray-500 mt-1 leading-snug">
                    {opt.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100 text-[11px] font-semibold text-gray-600">
                  {opt.surcharge}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* INSURANCE & DELIVERY MODE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Insurance Protection Toggle */}
        <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#2FAE60]" />
              <div>
                <span className="font-heading font-bold text-sm text-[#152A4E] block">
                  Add Cargo Insurance
                </span>
                <span className="text-xs text-[#2FAE60] font-semibold">
                  ✔ Protect your goods for full peace of mind
                </span>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={formData.addInsurance}
                onChange={(e) => updateFormData({ addInsurance: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2FAE60]"></div>
            </label>
          </div>

          <p className="text-xs text-gray-600 leading-snug pt-1">
            Covers 100% of declared cargo value (${formData.declaredValue.toLocaleString()} USD) against ocean loss, fire, or transit damage. Rate: 1.5% of declared value (${rates.insuranceFee} USD).
          </p>
        </div>

        {/* Door-to-Door vs Warehouse Station Toggle */}
        <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-200 space-y-2">
          <span className="font-heading font-bold text-sm text-[#152A4E] block">
            2. Delivery Handover Preference
          </span>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => updateFormData({ deliveryMode: 'door_to_door' })}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                formData.deliveryMode === 'door_to_door'
                  ? 'bg-[#152A4E] text-white border-[#152A4E] font-bold shadow-xs'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-sky-300'
              }`}
            >
              <Home className="w-4 h-4 shrink-0" />
              <div>
                <span className="block leading-tight">Door-to-Door</span>
                <span className="text-[10px] opacity-80 block">Direct Address Delivery</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => updateFormData({ deliveryMode: 'warehouse_pickup' })}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                formData.deliveryMode === 'warehouse_pickup'
                  ? 'bg-[#152A4E] text-white border-[#152A4E] font-bold shadow-xs'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-sky-300'
              }`}
            >
              <Warehouse className="w-4 h-4 shrink-0" />
              <div>
                <span className="block leading-tight">Port Station</span>
                <span className="text-[10px] opacity-80 block">Self Hub Pickup</span>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* PAYMENT METHOD SELECTION */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-[#152A4E] uppercase tracking-wider">
          3. Preferred Payment Method
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Card */}
          <div
            onClick={() => updateFormData({ paymentMethod: 'card' })}
            className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
              formData.paymentMethod === 'card'
                ? 'border-[#152A4E] bg-sky-50/50 ring-2 ring-[#152A4E]/10'
                : 'border-gray-200 bg-white hover:border-sky-300'
            }`}
          >
            <div className="p-2 rounded-lg bg-sky-100 text-[#152A4E]">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-bold text-xs text-[#152A4E] block">
                Credit / Debit Card
              </span>
              <span className="text-[11px] text-gray-500">Visa, Mastercard, Amex</span>
            </div>
          </div>

          {/* Bank Transfer */}
          <div
            onClick={() => updateFormData({ paymentMethod: 'bank_transfer' })}
            className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
              formData.paymentMethod === 'bank_transfer'
                ? 'border-[#152A4E] bg-sky-50/50 ring-2 ring-[#152A4E]/10'
                : 'border-gray-200 bg-white hover:border-sky-300'
            }`}
          >
            <div className="p-2 rounded-lg bg-sky-100 text-[#152A4E]">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-bold text-xs text-[#152A4E] block">
                Bank Transfer / Zelle
              </span>
              <span className="text-[11px] text-gray-500">US Bank ACH or Direct Deposit</span>
            </div>
          </div>

          {/* Pay on Delivery (Nigeria side) */}
          <div
            onClick={() => updateFormData({ paymentMethod: 'pay_on_delivery' })}
            className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
              formData.paymentMethod === 'pay_on_delivery'
                ? 'border-[#152A4E] bg-sky-50/50 ring-2 ring-[#152A4E]/10'
                : 'border-gray-200 bg-white hover:border-sky-300'
            }`}
          >
            <div className="p-2 rounded-lg bg-emerald-100 text-[#2FAE60]">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-bold text-xs text-[#152A4E] block">
                Pay on Handover
              </span>
              <span className="text-[11px] text-gray-500">Naira / USD at Hub Pickup</span>
            </div>
          </div>

        </div>
      </div>

      {/* ORDER NOTES */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-[#152A4E]">
          Special Delivery Instructions or Notes <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <textarea
          rows={2}
          value={formData.orderNotes}
          onChange={(e) => updateFormData({ orderNotes: e.target.value })}
          placeholder="e.g. Call receiver before delivery, deliver only between 10am-4pm, gate access code 4092..."
          className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#152A4E] text-[#22262E]"
        ></textarea>
      </div>

      {/* TERMS & CONDITIONS CHECKBOX */}
      <div className="pt-2 border-t border-gray-100 space-y-3">
        <label className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer hover:bg-sky-50/30 transition-colors">
          <input
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={(e) => updateFormData({ termsAccepted: e.target.checked })}
            className="mt-1 rounded-xs text-[#152A4E] focus:ring-[#152A4E] w-4 h-4"
          />
          <span className="text-xs text-gray-700 leading-snug">
            I agree to the <strong className="text-[#152A4E]">Kingz Logistics Terms of Service & Safety Regulations</strong>. I authorize Kingz Logistics Houston/Lagos team to inspect and process this shipment in accordance with maritime & aviation cargo rules.
          </span>
        </label>
      </div>

      {/* REASSURANCE TRUST STRIP NEAR SUBMIT BUTTON (As requested in Section 4 & 6) */}
      <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 flex flex-wrap items-center justify-around gap-2 text-xs font-semibold text-[#152A4E]">
        <span className="flex items-center gap-1 text-[#2FAE60]">
          <CheckCircle2 className="w-4 h-4" /> ✔ On-time delivery
        </span>
        <span className="flex items-center gap-1 text-[#2FAE60]">
          <CheckCircle2 className="w-4 h-4" /> ✔ Careful handling
        </span>
        <span className="flex items-center gap-1 text-[#2FAE60]">
          <CheckCircle2 className="w-4 h-4" /> ✔ Real-time updates
        </span>
        <span className="flex items-center gap-1 text-[#2FAE60]">
          <CheckCircle2 className="w-4 h-4" /> ✔ Clear communication
        </span>
      </div>

      {/* Bottom Action Bar */}
      <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-heading font-semibold text-xs sm:text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back: Sender/Receiver</span>
        </button>

        <button
          type="button"
          disabled={!isFormValid || isSubmitting}
          onClick={onSubmitBooking}
          className={`w-full sm:w-auto px-10 py-3.5 rounded-xl font-heading font-extrabold text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
            isFormValid && !isSubmitting
              ? 'bg-[#152A4E] hover:bg-[#1D4F91] text-white active:scale-98 shadow-sky-900/20'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating Booking Reference...</span>
            </>
          ) : (
            <>
              <span>Book Shipment</span>
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

    </div>
  );
};

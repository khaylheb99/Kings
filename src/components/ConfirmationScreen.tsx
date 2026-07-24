import React, { useState } from 'react';
import { BookingFormData, ShipmentRecord } from '../types';
import { calculateShippingRates } from '../data/constants';
import { Check, Copy, CheckCircle2, ArrowRight, Printer, Share2, MessageCircle, Anchor, Plane, Truck, Package, ShieldCheck } from 'lucide-react';

interface ConfirmationScreenProps {
  formData: BookingFormData;
  bookingRef: string;
  onOpenTracking: (ref: string) => void;
  onResetForm: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  formData,
  bookingRef,
  onOpenTracking,
  onResetForm,
}) => {
  const [copied, setCopied] = useState(false);
  const rates = calculateShippingRates(formData);
  const isUsaToNg = formData.direction === 'USA_TO_NG';

  const handleCopyRef = () => {
    navigator.clipboard.writeText(bookingRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in zoom-in-95 duration-200">
      
      {/* Top Banner Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-slate-700 shadow-md text-center space-y-4 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#152A4E] via-[#1D4F91] to-[#2FAE60]"></div>

        {/* Checkmark Icon Lockup */}
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#BFE3F7] to-[#8FCBEA] dark:from-sky-900 dark:to-sky-800 flex items-center justify-center p-2 shadow-inner">
          <div className="w-14 h-14 rounded-full bg-[#152A4E] text-[#2FAE60] flex items-center justify-center shadow-md">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
        </div>

        {/* Reassuring Headline & Subtitle */}
        <div className="space-y-1.5">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#152A4E] dark:text-white">
            You're All Set — We've Got This Handled!
          </h2>
          <p className="text-sm text-gray-600 dark:text-slate-300 max-w-xl mx-auto font-body">
            Thank you for trusting <strong className="text-[#152A4E] dark:text-sky-300">Kingz Logistics</strong>. Your shipment request has been logged and our Houston dispatch team is preparing your consignment.
          </p>
        </div>

        {/* Generated Reference Number & Barcode Box */}
        <div className="bg-sky-50/80 dark:bg-slate-900/60 border border-sky-200/80 dark:border-slate-700 rounded-2xl p-4 sm:p-5 max-w-md mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 block">
            Shipment Tracking Reference
          </span>

          <div className="flex items-center justify-center gap-2">
            <span className="font-mono font-extrabold text-xl sm:text-2xl text-[#152A4E] dark:text-sky-300 tracking-wider select-all">
              {bookingRef}
            </span>
            <button
              onClick={handleCopyRef}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-sky-300 dark:border-slate-600 text-[#152A4E] dark:text-sky-200 hover:bg-sky-100 dark:hover:bg-slate-700 transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer"
              title="Copy tracking code"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#2FAE60]" />
                  <span className="text-[#2FAE60]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Simulated Barcode graphic */}
          <div className="pt-2 flex flex-col items-center">
            <div className="h-9 w-48 bg-gray-900 dark:bg-slate-950 opacity-90 rounded-xs flex items-center justify-between px-2 gap-1 border dark:border-slate-800">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-full bg-white dark:bg-slate-200 ${
                    i % 3 === 0 ? 'w-1' : i % 5 === 0 ? 'w-1.5' : 'w-0.5'
                  }`}
                ></div>
              ))}
            </div>
            <span className="text-[10px] font-mono text-gray-500 dark:text-slate-400 mt-1">
              KINGZ HOUSTON DISPATCH BARCODE
            </span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onOpenTracking(bookingRef)}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#152A4E] dark:bg-sky-600 hover:bg-[#1D4F91] dark:hover:bg-sky-500 text-white font-heading font-bold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
          >
            <span>Track Your Shipment</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 font-heading font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save Receipt</span>
          </button>
        </div>

      </div>

      {/* Booking Summary Recap Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700 pb-3">
          <h3 className="font-heading font-bold text-base text-[#152A4E] dark:text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2FAE60]" />
            Booking Confirmation Summary
          </h3>
          <span className="text-xs font-bold text-[#2FAE60] bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            ✔ Confirmed & Logged
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          {/* Route & Cargo */}
          <div className="space-y-2 bg-gray-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-gray-200/80 dark:border-slate-700">
            <span className="font-bold text-[#152A4E] dark:text-sky-300 uppercase text-[11px] block border-b border-gray-200 dark:border-slate-700 pb-1">
              Route & Cargo Specifications
            </span>
            <div className="space-y-1 text-gray-700 dark:text-slate-300">
              <div><strong>Route:</strong> {isUsaToNg ? '🇺🇸 Houston, TX → 🇳🇬 Lagos, NG' : '🇳🇬 Lagos, NG → 🇺🇸 Houston, TX'}</div>
              <div><strong>Method:</strong> <span className="capitalize">{formData.method} Shipping</span></div>
              <div><strong>Cargo:</strong> {formData.quantity}x {formData.packageType} ({formData.weight} {formData.weightUnit})</div>
              <div><strong>Declared Value:</strong> ${formData.declaredValue.toLocaleString()} USD</div>
              <div><strong>Speed:</strong> <span className="capitalize">{formData.serviceSpeed}</span> ({rates.estimatedDays})</div>
            </div>
          </div>

          {/* Sender & Receiver */}
          <div className="space-y-2 bg-gray-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-gray-200/80 dark:border-slate-700">
            <span className="font-bold text-[#152A4E] dark:text-sky-300 uppercase text-[11px] block border-b border-gray-200 dark:border-slate-700 pb-1">
              Parties & Addresses
            </span>
            <div className="space-y-1 text-gray-700 dark:text-slate-300">
              <div><strong>Sender:</strong> {formData.sender.fullName} ({formData.sender.phone})</div>
              <div><strong>Pickup:</strong> {formData.sender.address.street}, {formData.sender.address.city}, {formData.sender.address.state}</div>
              <div className="pt-1 border-t border-gray-200 dark:border-slate-700"><strong>Receiver:</strong> {formData.receiver.fullName} ({formData.receiver.phone})</div>
              <div><strong>Delivery:</strong> {formData.receiver.address.street}, {formData.receiver.address.city}, {formData.receiver.address.state}</div>
            </div>
          </div>

        </div>

        {/* Cost & Payment */}
        <div className="bg-sky-50/80 dark:bg-slate-900/60 p-4 rounded-xl border border-sky-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-[#152A4E] dark:text-sky-200 block">Payment Selection: <span className="capitalize">{formData.paymentMethod.replace('_', ' ')}</span></span>
            <span className="text-gray-500 dark:text-slate-400">Insurance Protection: {formData.addInsurance ? '✔ Active ($' + rates.insuranceFee + ' USD)' : 'Not selected'}</span>
          </div>
          <div className="text-right">
            <span className="text-gray-500 dark:text-slate-400 block text-[11px]">Total Estimated Quote</span>
            <span className="font-heading font-extrabold text-2xl text-[#2FAE60]">
              ${rates.estimatedTotal.toLocaleString('en-US')} USD
            </span>
          </div>
        </div>

      </div>

      {/* Reassurance Footer & Next Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={onResetForm}
          className="text-xs font-bold text-[#152A4E] dark:text-sky-300 hover:text-[#1D4F91] dark:hover:text-sky-200 underline cursor-pointer"
        >
          ← Book Another Shipment
        </button>

        <a
          href="https://wa.me/18325555464?text=Hi%20Kingz%20Logistics%20Team%2C%20I%20just%20completed%20booking%20reference%20"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#2FAE60] hover:bg-emerald-600 text-white font-semibold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Need Instant Help? Chat on WhatsApp</span>
        </a>
      </div>

    </div>
  );
};

import React from 'react';
import { BookingFormData } from '../types';
import { calculateShippingRates, SHIPPING_METHODS } from '../data/constants';
import { ShieldCheck, Truck, Clock, CheckCircle2, Info, ArrowRight, Anchor, Plane, Package, MapPin } from 'lucide-react';

interface ShipmentSummaryProps {
  formData: BookingFormData;
  currentStep: number;
}

export const ShipmentSummary: React.FC<ShipmentSummaryProps> = ({ formData, currentStep }) => {
  const rates = calculateShippingRates(formData);
  const selectedMethodObj = SHIPPING_METHODS.find((m) => m.id === formData.method) || SHIPPING_METHODS[0];

  const getMethodIcon = () => {
    switch (formData.method) {
      case 'container':
        return <Anchor className="w-5 h-5 text-[#152A4E]" />;
      case 'roro':
        return <Truck className="w-5 h-5 text-[#152A4E]" />;
      case 'air':
        return <Plane className="w-5 h-5 text-[#152A4E]" />;
      case 'local':
        return <Package className="w-5 h-5 text-[#152A4E]" />;
    }
  };

  const isUsaToNg = formData.direction === 'USA_TO_NG';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/90 dark:border-slate-700 overflow-hidden sticky top-20 transition-all">
      {/* Header Banner */}
      <div className="bg-[#152A4E] text-white p-4.5 sm:p-5 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-sky-200 font-bold block">
            Real-Time Summary
          </span>
          <h3 className="font-heading font-bold text-lg text-white leading-tight">
            Shipment Summary
          </h3>
        </div>
        <div className="bg-white/10 p-2 rounded-xl backdrop-blur-xs">
          {getMethodIcon()}
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        
        {/* Route Badge */}
        <div className="bg-sky-50/80 dark:bg-slate-900/60 border border-sky-100 dark:border-slate-700 rounded-xl p-3 flex items-center justify-between text-xs font-semibold text-[#152A4E] dark:text-sky-300">
          <div className="flex items-center gap-2">
            <span className="text-base">{isUsaToNg ? '🇺🇸' : '🇳🇬'}</span>
            <div>
              <span className="text-gray-500 dark:text-slate-400 text-[10px] block uppercase font-bold">Origin</span>
              <span>{isUsaToNg ? (formData.sender.address.city || 'Houston, TX') : (formData.sender.address.city || 'Lagos, NG')}</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <ArrowRight className="w-4 h-4 text-[#1D4F91] dark:text-sky-400" />
            <span className="text-[9px] text-gray-400 dark:text-slate-500 font-mono">DIRECT</span>
          </div>

          <div className="flex items-center gap-2 text-right">
            <div>
              <span className="text-gray-500 dark:text-slate-400 text-[10px] block uppercase font-bold">Destination</span>
              <span>{isUsaToNg ? (formData.receiver.address.city || 'Lagos, NG') : (formData.receiver.address.city || 'Houston, TX')}</span>
            </div>
            <span className="text-base">{isUsaToNg ? '🇳🇬' : '🇺🇸'}</span>
          </div>
        </div>

        {/* Cargo Specification Grid */}
        <div className="space-y-2 text-xs divide-y divide-gray-100 dark:divide-slate-700">
          <div className="flex justify-between py-1.5">
            <span className="text-gray-500 dark:text-slate-400">Shipping Method:</span>
            <span className="font-semibold text-[#152A4E] dark:text-sky-300 flex items-center gap-1">
              {selectedMethodObj.title}
            </span>
          </div>

          <div className="flex justify-between py-1.5">
            <span className="text-gray-500 dark:text-slate-400">Cargo Type:</span>
            <span className="font-semibold text-gray-800 dark:text-slate-200">
              {formData.quantity}x {formData.packageType}
            </span>
          </div>

          <div className="flex justify-between py-1.5">
            <span className="text-gray-500 dark:text-slate-400">Weight:</span>
            <span className="font-semibold text-gray-800 dark:text-slate-200">
              {formData.weight} {formData.weightUnit} ({Math.round(formData.weightUnit === 'lb' ? formData.weight * 0.453592 : formData.weight)} kg)
            </span>
          </div>

          {formData.hasDimensions && (
            <div className="flex justify-between py-1.5">
              <span className="text-gray-500 dark:text-slate-400">Dimensions:</span>
              <span className="font-semibold text-gray-800 dark:text-slate-200">
                {formData.dimensions.length}×{formData.dimensions.width}×{formData.dimensions.height} {formData.dimensions.unit}
              </span>
            </div>
          )}

          <div className="flex justify-between py-1.5">
            <span className="text-gray-500 dark:text-slate-400">Service Speed:</span>
            <span className="font-semibold text-[#1D4F91] dark:text-sky-400 capitalize flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#1D4F91] dark:text-sky-400" />
              {formData.serviceSpeed} ({rates.estimatedDays})
            </span>
          </div>

          <div className="flex justify-between py-1.5">
            <span className="text-gray-500 dark:text-slate-400">Declared Value:</span>
            <span className="font-semibold text-gray-800 dark:text-slate-200">
              ${formData.declaredValue.toLocaleString('en-US')} USD
            </span>
          </div>

          <div className="flex justify-between py-1.5">
            <span className="text-gray-500 dark:text-slate-400">Insurance Protection:</span>
            <span className={`font-semibold ${formData.addInsurance ? 'text-[#2FAE60]' : 'text-amber-500'}`}>
              {formData.addInsurance ? '✔ Covered' : 'Not Selected'}
            </span>
          </div>

          <div className="flex justify-between py-1.5">
            <span className="text-gray-500 dark:text-slate-400">Delivery Mode:</span>
            <span className="font-semibold text-gray-800 dark:text-slate-200">
              {formData.deliveryMode === 'door_to_door' ? 'Door-to-Door' : 'Warehouse Pickup'}
            </span>
          </div>
        </div>

        {/* Special Handling Badges */}
        {Object.values(formData.specialHandling).some(Boolean) && (
          <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/50 rounded-xl p-2.5 text-xs space-y-1">
            <span className="font-semibold text-amber-900 dark:text-amber-200 block">Special Care Handling:</span>
            <div className="flex flex-wrap gap-1">
              {formData.specialHandling.fragile && <span className="bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-md font-medium text-[11px]">Fragile</span>}
              {formData.specialHandling.perishable && <span className="bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-md font-medium text-[11px]">Perishable</span>}
              {formData.specialHandling.highValue && <span className="bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-md font-medium text-[11px]">High Value</span>}
              {formData.specialHandling.refrigerated && <span className="bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-md font-medium text-[11px]">Refrigerated</span>}
              {formData.specialHandling.hazardous && <span className="bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-200 px-2 py-0.5 rounded-md font-medium text-[11px]">Hazardous</span>}
            </div>
          </div>
        )}

        {/* Cost Calculation Breakdown */}
        <div className="bg-gray-50 dark:bg-slate-900/80 rounded-xl p-3.5 border border-gray-200/80 dark:border-slate-700 space-y-2">
          <div className="text-xs font-bold text-[#152A4E] dark:text-sky-300 uppercase tracking-wider border-b border-gray-200 dark:border-slate-700 pb-1.5">
            Cost Calculation Breakdown
          </div>
          
          <div className="space-y-1 text-xs text-gray-600 dark:text-slate-300">
            <div className="flex justify-between">
              <span>Base Freight Fee:</span>
              <span className="font-mono text-gray-800 dark:text-slate-100">${rates.baseRate}</span>
            </div>
            {rates.weightCost > 0 && (
              <div className="flex justify-between">
                <span>Weight Charge ({formData.weight}{formData.weightUnit}):</span>
                <span className="font-mono text-gray-800 dark:text-slate-100">${rates.weightCost}</span>
              </div>
            )}
            {rates.speedSurcharge !== 0 && (
              <div className="flex justify-between">
                <span>Speed Tier ({formData.serviceSpeed}):</span>
                <span className="font-mono text-gray-800 dark:text-slate-100">
                  {rates.speedSurcharge > 0 ? `+$${rates.speedSurcharge}` : `-$${Math.abs(rates.speedSurcharge)}`}
                </span>
              </div>
            )}
            {rates.insuranceFee > 0 && (
              <div className="flex justify-between">
                <span>Shipment Protection:</span>
                <span className="font-mono text-gray-800 dark:text-slate-100">${rates.insuranceFee}</span>
              </div>
            )}
            {rates.doorDeliveryFee > 0 && (
              <div className="flex justify-between">
                <span>Door Delivery Handling:</span>
                <span className="font-mono text-gray-800 dark:text-slate-100">${rates.doorDeliveryFee}</span>
              </div>
            )}
            {rates.specialHandlingFee > 0 && (
              <div className="flex justify-between">
                <span>Special Care Handling:</span>
                <span className="font-mono text-gray-800 dark:text-slate-100">${rates.specialHandlingFee}</span>
              </div>
            )}
          </div>

          {/* Grand Total Display */}
          <div className="pt-2.5 border-t border-gray-300 dark:border-slate-700 flex items-baseline justify-between">
            <div>
              <span className="text-xs font-bold text-[#152A4E] dark:text-sky-300 block">Total Estimated Cost</span>
              <span className="text-[10px] text-gray-500 dark:text-slate-400">USD (Clearance Included)</span>
            </div>
            <div className="text-right">
              <span className="font-heading text-2xl font-extrabold text-[#2FAE60] dark:text-emerald-400">
                ${rates.estimatedTotal.toLocaleString('en-US')}
              </span>
              <span className="text-[10px] text-gray-400 dark:text-slate-500 block font-mono">USD</span>
            </div>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="flex items-start gap-2 text-[11px] text-gray-500 dark:text-slate-400 bg-sky-50/50 dark:bg-slate-900/50 p-2.5 rounded-lg border border-sky-100 dark:border-slate-700">
          <Info className="w-4 h-4 text-[#1D4F91] dark:text-sky-400 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong className="text-[#152A4E] dark:text-sky-300">Estimated quote</strong> — final rate is confirmed by our Houston/Lagos logistics desk upon physical cargo weight verification.
          </p>
        </div>

        {/* Reassurance Trust Strip */}
        <div className="pt-2 border-t border-gray-100 dark:border-slate-700 space-y-1.5 text-xs text-[#152A4E] dark:text-slate-300 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2FAE60] shrink-0" />
            <span>✔ On-time delivery guarantee</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2FAE60] shrink-0" />
            <span>✔ Careful handling & zero-loss policy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2FAE60] shrink-0" />
            <span>✔ Real-time tracking & WhatsApp updates</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2FAE60] shrink-0" />
            <span>✔ Transparent & clear communication</span>
          </div>
        </div>

      </div>
    </div>
  );
};

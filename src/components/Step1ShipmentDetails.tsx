import React from 'react';
import { BookingFormData, ShippingMethod, WeightUnit, DimensionUnit, PackageType } from '../types';
import { SHIPPING_METHODS, PACKAGE_TYPES } from '../data/constants';
import { Anchor, Truck, Plane, Package, AlertTriangle, ArrowRightLeft, Info, HelpCircle } from 'lucide-react';

interface Step1Props {
  formData: BookingFormData;
  updateFormData: (fields: Partial<BookingFormData>) => void;
  onNext: () => void;
}

export const Step1ShipmentDetails: React.FC<Step1Props> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const getMethodIcon = (id: ShippingMethod) => {
    switch (id) {
      case 'container':
        return <Anchor className="w-6 h-6 text-[#152A4E]" />;
      case 'roro':
        return <Truck className="w-6 h-6 text-[#152A4E]" />;
      case 'air':
        return <Plane className="w-6 h-6 text-[#152A4E]" />;
      case 'local':
        return <Package className="w-6 h-6 text-[#152A4E]" />;
    }
  };

  const isFormValid =
    formData.quantity > 0 &&
    formData.weight > 0 &&
    formData.declaredValue >= 0 &&
    formData.itemDescription.trim().length >= 5;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Step Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#1D4F91]">
          Step 1 of 3
        </span>
        <h2 className="font-heading font-extrabold text-2xl text-[#152A4E]">
          Shipment Details
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Select your shipping method and tell us what you're sending so we can assign the proper care and route.
        </p>
      </div>

      {/* Direction Selection Toggle */}
      <div className="bg-sky-50/80 p-3.5 rounded-2xl border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-[#152A4E]" />
          <div>
            <span className="text-xs font-bold text-[#152A4E] block">Shipping Route Direction</span>
            <span className="text-xs text-gray-500">We operate daily direct shipments both ways</span>
          </div>
        </div>

        <div className="inline-flex rounded-xl p-1 bg-white border border-sky-200 shadow-xs w-full sm:w-auto">
          <button
            type="button"
            onClick={() => updateFormData({ direction: 'USA_TO_NG' })}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              formData.direction === 'USA_TO_NG'
                ? 'bg-[#152A4E] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#152A4E]'
            }`}
          >
            🇺🇸 USA → 🇳🇬 Nigeria
          </button>
          <button
            type="button"
            onClick={() => updateFormData({ direction: 'NG_TO_USA' })}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              formData.direction === 'NG_TO_USA'
                ? 'bg-[#152A4E] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#152A4E]'
            }`}
          >
            🇳🇬 Nigeria → 🇺🇸 USA
          </button>
        </div>
      </div>

      {/* Shipment Method Cards */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-[#152A4E]">
          Select Shipment Method <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SHIPPING_METHODS.map((method) => {
            const isSelected = formData.method === method.id;
            return (
              <div
                key={method.id}
                onClick={() => updateFormData({ method: method.id })}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                  isSelected
                    ? 'border-[#152A4E] bg-sky-50/40 ring-2 ring-[#152A4E]/10 shadow-xs'
                    : 'border-gray-200 bg-white hover:border-sky-300 hover:bg-sky-50/20'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl ${
                    isSelected ? 'bg-[#152A4E] text-white' : 'bg-gray-100 text-[#152A4E]'
                  }`}
                >
                  {getMethodIcon(method.id)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-sm text-[#152A4E]">
                      {method.title}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-[#1D4F91]">
                      {method.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                    {method.subtitle}
                  </p>
                  <span className="inline-block mt-2 text-[11px] font-semibold text-[#1D4F91]">
                    ⏱ Est. Transit: {method.transit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Package Type, Quantity & Weight Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Package Type */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#152A4E]">
            Package Type <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.packageType}
            onChange={(e) => updateFormData({ packageType: e.target.value as PackageType })}
            className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-gray-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#152A4E]"
          >
            {PACKAGE_TYPES.map((pt) => (
              <option key={pt.value} value={pt.value}>
                {pt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#152A4E]">
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            value={formData.quantity}
            onChange={(e) => updateFormData({ quantity: Math.max(1, parseInt(e.target.value) || 1) })}
            className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-gray-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#152A4E]"
          />
        </div>

        {/* Total Estimated Weight */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-bold text-[#152A4E]">
              Total Weight <span className="text-red-500">*</span>
            </label>
            <div className="inline-flex text-[11px] font-bold border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
              <button
                type="button"
                onClick={() => updateFormData({ weightUnit: 'lb' })}
                className={`px-2 py-0.5 ${formData.weightUnit === 'lb' ? 'bg-[#152A4E] text-white' : 'text-gray-600'}`}
              >
                lb
              </button>
              <button
                type="button"
                onClick={() => updateFormData({ weightUnit: 'kg' })}
                className={`px-2 py-0.5 ${formData.weightUnit === 'kg' ? 'bg-[#152A4E] text-white' : 'text-gray-600'}`}
              >
                kg
              </button>
            </div>
          </div>
          <input
            type="number"
            min="0.5"
            step="0.5"
            value={formData.weight}
            onChange={(e) => updateFormData({ weight: Math.max(0.1, parseFloat(e.target.value) || 0) })}
            className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-gray-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#152A4E]"
            placeholder="e.g. 50"
          />
        </div>

      </div>

      {/* Item Description (Reassuring prompt as specified in prompt) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-[#152A4E]">
          Item Description & Contents <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={3}
          value={formData.itemDescription}
          onChange={(e) => updateFormData({ itemDescription: e.target.value })}
          placeholder="Tell us what you're shipping so we can handle it with the right care (e.g. 3 boxes of electronics, personal clothing, foodstuff, auto spare parts)"
          className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-gray-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#152A4E] text-[#22262E] placeholder-gray-400"
        ></textarea>
        {formData.itemDescription.trim().length > 0 && formData.itemDescription.trim().length < 5 && (
          <p className="text-xs text-amber-600">Please provide a brief item description (at least 5 characters).</p>
        )}
      </div>

      {/* Declared Value (USD) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#152A4E]">
            Declared Cargo Value (USD $) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
            <input
              type="number"
              min="0"
              value={formData.declaredValue}
              onChange={(e) => updateFormData({ declaredValue: Math.max(0, parseFloat(e.target.value) || 0) })}
              className="w-full pl-8 pr-3.5 py-2.5 text-sm font-medium rounded-xl border border-gray-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#152A4E]"
              placeholder="500"
            />
          </div>
          <p className="text-[11px] text-gray-500">
            Used for insurance calculation and customs declaration.
          </p>
        </div>

        {/* Dimensions Switch Toggle */}
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#152A4E] block">Add Specific Dimensions?</span>
            <span className="text-[11px] text-gray-500">Recommended for oversized or boxed cargo</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasDimensions}
              onChange={(e) => updateFormData({ hasDimensions: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#152A4E]"></div>
          </label>
        </div>
      </div>

      {/* Optional Specific Dimensions Form */}
      {formData.hasDimensions && (
        <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-100 space-y-3 animate-in fade-in duration-150">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#152A4E]">Package Dimensions per Item:</span>
            <div className="inline-flex text-[11px] font-bold border border-gray-300 rounded-lg overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => updateFormData({ dimensions: { ...formData.dimensions, unit: 'cm' } })}
                className={`px-2 py-0.5 ${formData.dimensions.unit === 'cm' ? 'bg-[#152A4E] text-white' : 'text-gray-600'}`}
              >
                cm
              </button>
              <button
                type="button"
                onClick={() => updateFormData({ dimensions: { ...formData.dimensions, unit: 'in' } })}
                className={`px-2 py-0.5 ${formData.dimensions.unit === 'in' ? 'bg-[#152A4E] text-white' : 'text-gray-600'}`}
              >
                in
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-600">Length</label>
              <input
                type="number"
                value={formData.dimensions.length}
                onChange={(e) =>
                  updateFormData({
                    dimensions: { ...formData.dimensions, length: parseFloat(e.target.value) || 0 },
                  })
                }
                className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-600">Width</label>
              <input
                type="number"
                value={formData.dimensions.width}
                onChange={(e) =>
                  updateFormData({
                    dimensions: { ...formData.dimensions, width: parseFloat(e.target.value) || 0 },
                  })
                }
                className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-600">Height</label>
              <input
                type="number"
                value={formData.dimensions.height}
                onChange={(e) =>
                  updateFormData({
                    dimensions: { ...formData.dimensions, height: parseFloat(e.target.value) || 0 },
                  })
                }
                className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Special Handling Checkboxes */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <label className="block text-xs font-bold text-[#152A4E]">
          Special Handling & Care Requirements:
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <label className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 bg-white cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={formData.specialHandling.fragile}
              onChange={(e) =>
                updateFormData({
                  specialHandling: { ...formData.specialHandling, fragile: e.target.checked },
                })
              }
              className="rounded-xs text-[#152A4E] focus:ring-[#152A4E]"
            />
            <span className="font-semibold text-gray-800">Fragile (Glass/Electronics)</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 bg-white cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={formData.specialHandling.perishable}
              onChange={(e) =>
                updateFormData({
                  specialHandling: { ...formData.specialHandling, perishable: e.target.checked },
                })
              }
              className="rounded-xs text-[#152A4E] focus:ring-[#152A4E]"
            />
            <span className="font-semibold text-gray-800">Perishable Foodstuff</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 bg-white cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={formData.specialHandling.highValue}
              onChange={(e) =>
                updateFormData({
                  specialHandling: { ...formData.specialHandling, highValue: e.target.checked },
                })
              }
              className="rounded-xs text-[#152A4E] focus:ring-[#152A4E]"
            />
            <span className="font-semibold text-gray-800">High-Value Cargo</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 bg-white cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={formData.specialHandling.refrigerated}
              onChange={(e) =>
                updateFormData({
                  specialHandling: { ...formData.specialHandling, refrigerated: e.target.checked },
                })
              }
              className="rounded-xs text-[#152A4E] focus:ring-[#152A4E]"
            />
            <span className="font-semibold text-gray-800">Requires Refrigeration</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 bg-white cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={formData.specialHandling.hazardous}
              onChange={(e) =>
                updateFormData({
                  specialHandling: { ...formData.specialHandling, hazardous: e.target.checked },
                })
              }
              className="rounded-xs text-[#152A4E] focus:ring-[#152A4E]"
            />
            <span className="font-semibold text-gray-800">Hazardous Materials</span>
          </label>
        </div>

        {/* Warning Note for Hazardous Materials */}
        {formData.specialHandling.hazardous && (
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 text-xs text-amber-900 flex items-start gap-2.5 animate-in fade-in">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">⚠️ Hazardous Cargo SDS Required</span>
              <p className="mt-0.5 text-amber-800">
                Hazardous materials (batteries, chemicals, pressurized containers) require safety data sheet (SDS) declaration and FAA/NIMASA export approval before loading. Our team will contact you for documentation.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
        <span className="text-xs text-gray-500 font-medium hidden sm:inline">
          Step 1 of 3: Cargo specifications
        </span>

        <button
          type="button"
          disabled={!isFormValid}
          onClick={onNext}
          className={`px-8 py-3 rounded-xl font-heading font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
            isFormValid
              ? 'bg-[#152A4E] hover:bg-[#1D4F91] text-white active:scale-98'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Next Step: Sender & Receiver</span>
          <ArrowRightLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>

    </div>
  );
};
